/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db';
import CustomError from '../../utils/customErrors';
import successMessages from '../../utils/successMessages';
import errorsMessages from '../../utils/errorsMessages';

type ParamsType = Record<string, never>;
type BodyType = Record<string, never>;
type QueryType = Record<string, never>;
type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const deleteUser: HandlerType = async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
      throw new CustomError(StatusCodes.FORBIDDEN, errorsMessages.USER_NOT_FOUND);
    }

    await db.user.remove(req.user);

    res.status(StatusCodes.OK).json({ message: successMessages.DELETED_USER });
  } catch (err) {
    next(err);
  }
};
