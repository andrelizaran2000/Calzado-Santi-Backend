// Modules
import { NextFunction, Request, Response } from 'express';

// Gateways
import { getUserByEmailPromise } from '../gateways';

// Utils
import dbPool from '../utils';

export default async function getUserByEmail (req:Request, res:Response, next:NextFunction) {
  try {
    const { email } = req.body;
    const emailAsString = email as string;
    const emailRefined = emailAsString.toLocaleLowerCase().trim();
    const result = await getUserByEmailPromise(emailRefined, dbPool);
    req.body.savedUsers = result;
    next();
  } catch (err:any) {
    res.status(500).json({ msg:'Server error', err });
  }
}
