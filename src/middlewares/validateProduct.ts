// Modules
import { NextFunction, Request, Response } from 'express';

export default function validateProduct (req:Request, res:Response, next:NextFunction) {
  next();
}
