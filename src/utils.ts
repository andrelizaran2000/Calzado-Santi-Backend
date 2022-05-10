// Modules
import dotenv from 'dotenv';
import { createPool } from 'mysql2';

dotenv.config();

const dbPool = createPool({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  connectionLimit:10
});

export default dbPool;