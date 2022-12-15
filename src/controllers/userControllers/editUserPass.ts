/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import db from '../../db/index';
import hashedPassword from '../../utils/hashedPassword';
import CustomError from '../../utils/cunstomErrors';
import errorsMessage from '../../utils/errorsMessages';
import successMessage from '../../utils/successMessages';

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;
type ResponseType = {
  message: string;
};
type BodyType = {
  password: string;
  newPassword: string;
};

type HandlerType = RequestHandler<
  ParamsType,
  ResponseType,
  BodyType,
  QueryType
>;

export const editUserPass: HandlerType = async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
      throw new CustomError(
        StatusCodes.FORBIDDEN,
        errorsMessage.INCORRECT_DATA
      );
    }

    const { password, newPassword } = req.body;

    const existingUser = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('email = :email', { email: req.user.email })
      .getOne();

    const matchPassword = await hashedPassword.comparePass(
      password,
      existingUser.password
    );

    if (!matchPassword) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        errorsMessage.INCORRECT_DATA
      );
    }

    console.log(newPassword);
    existingUser.password = await hashedPassword.hashedPass(newPassword);
    await db.user.save(existingUser);


    res
      .status(StatusCodes.OK)
      .json({ message: successMessage.UPDATE_USER_PASSWORD });
  } catch (err) {
    next(err);
  }
};
