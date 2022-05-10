// Modules
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default function generateToken(id:number) {
  return jwt.sign({ id }, process.env.JWT_PASS as string);
}
