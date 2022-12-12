/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db/index';
import successMessage from '../../utils/successMessage';
import { customError } from '../../utils/createCustomError';
import errorsMessage from '../../utils/errorsMessage';

type ParamsType = Record<string, never>;
type BodyType = Record<string, never>;
type QueryType = Record<string, never>;
type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<
  ParamsType,
  ResponseType,
  BodyType,
  QueryType
>;

export const deleteUser: HandlerType = async (req, res, next) => {
  try {
    const user = await db.user.findOne({ where: { id: req.user.id } });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.USER_NOT_FOUND);
    }

    await db.user.remove(user);
    res.json({ message: successMessage.DELETED_USER });
  } catch (err) {
    next(err);
  }
};
