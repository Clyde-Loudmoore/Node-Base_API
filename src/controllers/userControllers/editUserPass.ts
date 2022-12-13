/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type UserType from '../../db/entities/User';
import db from '../../db/index';
import hashedPassword from '../../utils/hashedPassword';
import errorsMessage from '../../utils/errorsMessage';
import successMessage from '../../utils/successMessage';

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;
type ResponseType = {
  message: string;
  enteredData?: BodyType;
};
type BodyType = UserType;

type HandlerType = RequestHandler<
  ParamsType,
  ResponseType,
  BodyType,
  QueryType
>;

export const editUserPass: HandlerType = async (req, res, next) => {
  try {
    const existingUser = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('email = :email', { email: req.body.email })
      .getOne();

    if (!existingUser) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: errorsMessage.USER_NOT_FOUND });
    }

    const matchPassword = await hashedPassword.comparePass(
      req.body.password,
      existingUser.password
    );

    if (!matchPassword) {
      const newPassword = hashedPassword.hashedPass(req.body.password);
      existingUser.password = (await newPassword).toString();
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: errorsMessage.WRONG_PASS });
    }
    await db.user.save(existingUser);

    res.json({ message: successMessage.UPDATE_USER_PASSWORD });
  } catch (err) {
    next(err);
  }
};
