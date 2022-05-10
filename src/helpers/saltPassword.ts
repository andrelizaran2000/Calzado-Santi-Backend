// Modules
import bcryptjs from 'bcryptjs';

export default function saltPassword(password:string) {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
}
