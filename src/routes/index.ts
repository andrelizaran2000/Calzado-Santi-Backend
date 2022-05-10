// Modules
import { check } from 'express-validator';
import { Request, Response, Router } from 'express';

// Gateways
import { 
  getAllShoesPromise,
  getShoeByIdPromise,
  getShoesByCategoryPromise, 
  getShopsLocationPromise,
  getUserByEmailPromise,
  getUserShoppingCartPromise,
  insertNewShoppingCartItemPromise,
  insertNewUserPromise,
  removeShoppingCartPromise,  
} from '../gateways';

// Middlewares
import getUserByEmail from '../middlewares/getUserByEmail';
import getValidationResult from '../middlewares/getValidationResult';

// Utils
import dbPool from '../utils';

// Helpers
import saltPassword from '../helpers/saltPassword';
import generateToken from '../helpers/generateToken';
import validatePassword from '../helpers/validatePassword';
import validateProduct from '../middlewares/validateProduct';
import validateToken from '../middlewares/validateToken';
import validateShoppingCartItem from '../middlewares/validateShoppingCartItem';
import { removeItemFromShoppingCart } from '../queries';

const router = Router();

router.get('/shoes/:type', async (req:Request, res:Response) => {
  try {
    const { type } = req.params;
    if (type !== '1' && type !== '2' && type !== '3') return res.status(400).json({ msg:'Invalid shoe type' });
    const result = await getShoesByCategoryPromise(Number(type) as 1 | 2 | 3, dbPool);
    res.json(result);
  } catch (error:any) {
    res.status(500).json({ msg:'Server error' });
  }
});

router.get('/shoe/:idProduct', async (req:Request, res:Response) => {
  try {
    const { idProduct } = req.params;
    const result:any = await getShoeByIdPromise(Number(idProduct), dbPool);
    res.json(result);
  } catch (error:any) {
    res.status(500).json({ msg:'Server error' });
  }
})

router.get('/shoes', async (req:Request, res:Response) => {
  try {
    const result = await getAllShoesPromise(dbPool);
    res.json(result);
  } catch (error:any) {
    res.status(500).json({ msg:'Server error' });
  }
});

router.get('/shops', async (req:Request, res:Response) => {
  try {
    const result = await getShopsLocationPromise(dbPool);
    res.json(result);
  } catch (error:any) {
    res.status(500).json({ msg:'Server error' });
  }
});

router.post('/new-user', 
  [
    check('email').isEmail(),
    check('password').isString().isLength({ min:8 }),
    getValidationResult,
    getUserByEmail
  ],
  async (req:Request, res:Response) => {
    try {
      const { email, password } = req.body;
      const emailAsString = email as string;
      const emailRefined = emailAsString.toLocaleLowerCase().trim();
      if (req.body.savedUsers.length > 0) return res.status(400).json({ msg:'Email already in use' });
      await insertNewUserPromise(emailRefined, saltPassword(password), dbPool);
      const savedUsers = await getUserByEmailPromise(email, dbPool) as any;
      const newUser = savedUsers[0];
      const token = generateToken(newUser.ID_USER);
      res.json(token);
    } catch (error:any) {
      res.status(500).json({ msg:'Server error' });
    }
  }
);

router.post('/user',
  [
    check('email').isEmail(),
    check('password').isString().isLength({ min:8 }),
    getValidationResult,
    getUserByEmail,
  ],
  async (req:Request, res:Response) => {
    try {
      const { password } = req.body;
      if (req.body.savedUsers.length === 0) return res.status(400).json({ msg:'User doesnt exist' });
      const result = validatePassword(password, req.body.savedUsers[0].PASSWORD);
      if (!result) return res.status(400).json({ msg:'Wrong password' });
      const token = generateToken(req.body.savedUsers[0].ID_USER);
      res.json(token);
    } catch (error:any) {
      res.status(500).json({ msg:'Server error' });
    }
  }
);

router.post('/shopping-cart/:idProduct/:pieces', 
  [
    validateProduct,
    validateToken
  ],
  async (req:Request, res:Response) => {
    try {
      const { idProduct, pieces } = req.params;
      await insertNewShoppingCartItemPromise(req.body.userId, Number(idProduct), Number(pieces), dbPool);
      res.json({ msg:'Saved' });
    } catch (error:any) {
      res.status(500).json({ msg:'Server error' });
    }
  }
);

router.get('/shopping-cart', 
  [
    validateToken
  ],
  async (req:Request, res:Response) => {
    try {
      const result = await getUserShoppingCartPromise(req.body.userId, dbPool);
      res.json(result);
    } catch (error:any) {
      res.status(500).json({ msg:'Server error' });
    }
  }
);

router.get('/shopping-cart/:idItem', 
  [
    validateShoppingCartItem
  ],
  async (req:Request, res:Response) => {
    try {
      await removeShoppingCartPromise(Number(req.params.idItem), dbPool);
      res.send('ok');
    } catch (error:any) {
      res.status(500).json({ msg:'Server error' });
    }
  }
)

export default router;