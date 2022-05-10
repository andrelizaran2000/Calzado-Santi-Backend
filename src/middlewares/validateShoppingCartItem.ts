// Modules
import { NextFunction, Request, Response } from 'express';

export default function validateShoppingCartItem (req:Request, res:Response, next:NextFunction) {
  next();  
}
