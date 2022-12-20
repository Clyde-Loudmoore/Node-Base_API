import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import CustomError from './customErrors';
import config from '../config';
import errorsMessages from './errorsMessages';

const generateAccessToken = (id: number) => {
  const payload = { id };

  return jwt.sign(payload, config.token.secretKey, { expiresIn: config.token.expiresIn });
};

const verifyAcccessToken = (token: string) => {
  try {
    const payload = jwt.verify(token, config.token.secretKey) as { id: number };
    return payload;
  } catch {
    throw new CustomError(StatusCodes.FORBIDDEN, errorsMessages.NOT_AUTHORIZED);
  }
};

export default { generateAccessToken, verifyAcccessToken };
