import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../db';
import generateToken from '../utils/generateToken';
import errorsMessage from '../utils/errorsMessages';
import CustomError from '../utils/customErrors';

const verifyAuthorization = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new CustomError(StatusCodes.NOT_FOUND, errorsMessage.USER_NOT_FOUND);
    }

    const payload = generateToken.verifyAcccessToken(token);
    req.user = await db.user.findOne({ where: { id: payload.id } });

    if (!req.user) {
      throw new CustomError(StatusCodes.NOT_FOUND, errorsMessage.USER_NOT_FOUND);
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default verifyAuthorization;
