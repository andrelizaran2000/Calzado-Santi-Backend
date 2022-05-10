// Modules
import bcryptjs from 'bcryptjs';

export default function validatePassword(password:string, hash:string) {
  return bcryptjs.compareSync(password, hash);
}
