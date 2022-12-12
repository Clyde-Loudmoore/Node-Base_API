import bcrypt from 'bcryptjs';

import config from '../config';

const hashedPass = async (password: string) => {
  return bcrypt.hash(password, +config.password.salt);
};

const comparePass = async (password: string, exPassword: string) => {
  return bcrypt.compareSync(password, exPassword);
};

export default { comparePass, hashedPass };
