/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type User from '../../db/entities/User';

type BodyType = Record<string, never>;
type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;
type ResponseType = { user: User };
type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getUser: HandlerType = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ user: req.user });
  } catch (err) {
    next(err);
  }
};
