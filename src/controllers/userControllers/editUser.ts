/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type UserType from '../../db/entities/User';
import db from '../../db/index';
import { customError } from '../../utils/createCustomError';
import errorsMessage from '../../utils/errorsMessage';
import successMessage from '../../utils/successMessage';

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;
type ResponseType = {
  message: string;
  enteredData?: BodyType;
  userInfo?: UserType;
};
type BodyType = {
  fullName: string;
  email: string;
  dateOfBirth: Date;
};

type HandlerType = RequestHandler<
  ParamsType,
  ResponseType,
  BodyType,
  QueryType
>;

export const editUser: HandlerType = async (req, res, next) => {
  try {
    const { fullName, email, dateOfBirth } = req.body;
    const user = await db.user.findOne({ where: { id: req.user.id } });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.USER_NOT_FOUND);
    }

    user.fullName = fullName;
    user.email = email;
    user.dateOfBirth = dateOfBirth;

    await db.user.save(user);
    return res.json({ message: successMessage.UPDATE_USER });
  } catch (err) {
    next(err);
  }
};
