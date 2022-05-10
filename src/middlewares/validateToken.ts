// Modules
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

export default function validateToken (req:Request, res:Response, next:NextFunction) {
  const { token } = req.headers;  
  const result = jwt.verify(token as string, process.env.JWT_PASS as string) as any;
  if (!result.id) return res.status(400).json({ msg:'Bad token' });
  req.body.userId = result.id;
  next();
}