/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type User from '../../db/entities/User';
import db from '../../db/index';
import { customError } from '../../utils/createCustomError';
import errorsMessage from '../../utils/errorsMessage';

type ResponseType = User[];
type HandlerType = RequestHandler<ResponseType>;

export const getUser: HandlerType = async (req, res, next) => {
  try {
    const user = await db.user.findOne({ where: { id: req.user.id } });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.USER_NOT_FOUND);
    }

    return res.json(user);
  } catch (err) {
    next(err);
  }
};
