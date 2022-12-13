import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import config from '../config';
import db from '../db';
import errorsMessage from '../utils/errorsMessage';

const verifyAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let verifiedToken;
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: errorsMessage.NOT_AUTHORIZED });
    }

    verifiedToken = jwt.verify(token, config.token.secretKey) as {
      id: number;
    };

    const user = await db.user.findOne({ where: { id: verifiedToken.id } });

    req.user = user;

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: errorsMessage.INVALID_TOKEN });
    }
    next(err);
  }
};

export default verifyAuthorization;
