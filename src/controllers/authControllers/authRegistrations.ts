/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../../db/entities/User';
import type UserType from '../../db/entities/User';
import db from '../../db/index';
import { generateAccessToken } from '../../utils/generateToken';
import hashedPassword from '../../utils/hashedPassword';
import errorsMessage from '../../utils/errorsMessage';
import { customError } from '../../utils/createCustomError';
import successMessage from '../../utils/successMessage';

type ParamsType = Record<string, never>;
type BodyType = UserType;
type QueryType = Record<string, never>;
type ResponseType = { message?: string; user?: UserType; token?: string };

type HandlerType = RequestHandler<
  ParamsType,
  ResponseType,
  BodyType,
  QueryType
>;

export const register: HandlerType = async (req, res, next) => {
  try {
    const candidate = await db.user.findOne({
      where: { email: req.body.email },
    });
    if (candidate) {
      throw customError(StatusCodes.BAD_REQUEST, errorsMessage.EMAIL_USED);
    }

    const hashPassword = await hashedPassword.hashedPass(req.body.password);

    const user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = hashPassword;
    user.dateOfBirth = new Date(req.body.dateOfBirth);

    const newUser = await db.user.save(user);
    delete newUser.password;

    const token = generateAccessToken(user.id);

    res.json({
      user: newUser,
      token,
      message: successMessage.REGISTRATION_SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};
