import jwt from 'jsonwebtoken';

import config from '../config';

export const generateAccessToken = (id: number) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, config.token.secretKey, { expiresIn: '1h' });
};
