/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../../db/entities/User';
import db from '../../db';
import generateToken from '../../utils/generateToken';
import hashedPassword from '../../utils/hashedPassword';
import errorsMessage from '../../utils/errorsMessages';
import successMessage from '../../utils/successMessages';
import CustomError from '../../utils/customErrors';

type ParamsType = Record<string, never>;
type BodyType = User;
type QueryType = Record<string, never>;
type ResponseType = { message?: string; newUser?: User; token?: string };

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const register: HandlerType = async (req, res, next) => {
  try {
    const exitingUser = await db.user.findOne({ where: { email: req.body.email } });

    if (exitingUser) {
      throw new CustomError(StatusCodes.BAD_REQUEST, errorsMessage.EMAIL_USED);
    }

    const hashPassword = await hashedPassword.hashedPass(req.body.password);

    const user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = hashPassword;
    user.dateOfBirth = new Date(req.body.dateOfBirth);

    const newUser = await db.user.save(user);
    delete newUser.password;

    const token = generateToken.generateAccessToken(user.id);

    res.status(StatusCodes.CREATED)
      .json({ newUser, token, message: successMessage.REGISTRATION_SUCCESS });
  } catch (err) {
    next(err);
  }
};
