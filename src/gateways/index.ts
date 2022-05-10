// Modules
import { Pool } from 'mysql2';

// Queries
import { 
  getAllShoesQuery,
  getAllShopsQuery, 
  getShoeByIdQuery, 
  getShoesByCategoryQuery, 
  getUserByEmailQuery, 
  getUserShoppingCartQuery, 
  insertNewShoppingCartItemQuery, 
  insertNewUserQuery, 
  removeItemFromShoppingCart
} from '../queries';

export function getShoesByCategoryPromise (category:1 | 2 | 3, pool:Pool) {
  return new Promise((resolve, reject) => {
    pool.query(getShoesByCategoryQuery(category), (err, result) => {
      if (err) reject(err);
      if (result) resolve(result);
    })
  })
}

export function getAllShoesPromise (pool:Pool) {
  return new Promise((resolve, reject) => {
    pool.query(getAllShoesQuery, (err, result) => {
      if (err) reject(err);
      if (result) resolve(result);
    })
  })
} 

export function getShoeByIdPromise (idProduct:number, pool:Pool) {
  return new Promise((resolve, reject) => {
    pool.query(getShoeByIdQuery(idProduct), (err, result) => {
      if (err) reject(err);
      if (result) resolve(result);
    })
  })
} 

export function getShopsLocationPromise (pool:Pool) {
  return new Promise((resolve, reject) => {
    pool.query(getAllShopsQuery, (err, result) => {
      if (err) reject(err);
      if (result) resolve(result);
    })
  })
}

export function getUserByEmailPromise (email:string, pool:Pool) {
  return new Promise((resolve, reject) => {
    pool.query(getUserByEmailQuery(email), (err, result) => {
      if (err) reject(err);
      if (result) resolve(result);
    });
  });
}

export function insertNewUserPromise (email:string, password:string, pool:Pool) {
  return new Promise ((resolve, reject) => {
    pool.query(insertNewUserQuery(email, password), (err, result) => {
      if (err) reject(err);
      if (result) resolve(result);
    });
  });
}

export function insertNewShoppingCartItemPromise (idUser:number, idProduct:number, pieces:number, pool:Pool) {
  return new Promise ((resolve, reject) => {
    pool.query(insertNewShoppingCartItemQuery(idUser, idProduct, pieces), (err, result) => {
      if (err) reject(err);
      if (result) resolve(result);
    });
  });
}

export function getUserShoppingCartPromise (idUser:number, pool:Pool) {
  return new Promise ((resolve, reject) => {
    pool.query(getUserShoppingCartQuery(idUser), (err, result) => {
      if (err) reject(err);
      if (result) resolve(result);
    });
  });
}

export function removeShoppingCartPromise (idItem:number, pool:Pool) {
  return new Promise ((resolve, reject) => {
    pool.query(removeItemFromShoppingCart(idItem), (err, result) => {
      if (err) reject(err);
      if (result) resolve(result);
    });
  });
}