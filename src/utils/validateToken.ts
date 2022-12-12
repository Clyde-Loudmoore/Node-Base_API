import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';
import db from '../db';

const verifyAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let verifiedToken;
    const token = req.headers.authorization.split(' ')[1];
    

    if (!token) {
      return res.status(403).json({ message: 'The user is unauthorized' });
    }
    try {
      verifiedToken = jwt.verify(token, config.token.secretKey) as {
        id: number;
      };
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    const user = await db.user.findOne({ where: { id: verifiedToken.id } });

    req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'The user is unauthorized' });
  }
};

export default verifyAuthorization;
