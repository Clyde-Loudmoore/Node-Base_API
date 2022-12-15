/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db/index';
import CustomError from '../../utils/cunstomErrors';

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
    if (req.user.id !== +req.params.userId) {
      throw new CustomError(
        StatusCodes.FORBIDDEN,
        'Invalid request, please check entered data'
      );
    }

    await db.user.remove(req.user);

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};
