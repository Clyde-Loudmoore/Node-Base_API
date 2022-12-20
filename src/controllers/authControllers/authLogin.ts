/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type User from '../../db/entities/User';
import db from '../../db';
import hashedPassword from '../../utils/hashedPassword';
import generateToken from '../../utils/generateToken';
import successMessage from '../../utils/successMessages';
import errorsMessage from '../../utils/errorsMessages';
import CustomError from '../../utils/customErrors';

type BodyType = User;

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type ResponseType = {
  user: User;
  token: string;
  message: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const login: HandlerType = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new CustomError(StatusCodes.NOT_FOUND, `${errorsMessage.USER_NOT_FOUND}: ${errorsMessage.INCORRECT_DATA}`);
    }
    const matchPassword = await hashedPassword.comparePass(password, user.password);

    if (!matchPassword) {
      throw new CustomError(StatusCodes.BAD_REQUEST, errorsMessage.WRONG_PASS);
    }

    const token = generateToken.generateAccessToken(user.id);

    delete user.password;

    res.status(StatusCodes.CREATED).json({ user, token, message: successMessage.LOGIN_SUCCESS });
  } catch (err) {
    next(err);
  }
};
