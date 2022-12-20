/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type User from '../../db/entities/User';
import db from '../../db';
import CustomError from '../../utils/customErrors';
import successMessages from '../../utils/successMessages';
import errorsMessages from '../../utils/errorsMessages';

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;
type ResponseType = {
  message: string;
  updatedUser?: User;
};
type BodyType = {
  fullName: string;
  email: string;
  dateOfBirth: Date;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const editUser: HandlerType = async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
      throw new CustomError(StatusCodes.FORBIDDEN, errorsMessages.INCORRECT_DATA);
    }

    req.user.fullName = req.body.fullName;
    req.user.email = req.body.email;
    req.user.dateOfBirth = req.body.dateOfBirth;

    await db.user.save(req.user);

    res.status(StatusCodes.OK)
      .json({ message: successMessages.UPDATE_USER, updatedUser: req.user });
  } catch (err) {
    if (err) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: errorsMessages.EMAIL_USED });
    }
    next();
  }
};
