/* eslint-disable no-console */
import type { Handler } from 'express';

import db from '../../db/index';
import hashedPassword from '../../utils/hashedPassword';
import { generateAccessToken } from '../../utils/generateToken';
import { StatusCodes } from 'http-status-codes';
import successMessage from '../../utils/successMessage';
import errorsMessage from '../../utils/errorsMessage';

export const login: Handler = async (req, res, next) => {
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
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: errorsMessage.WRONG_PASS });
    }

    const token = generateAccessToken(existingUser.id);

    const userData = {
      id: existingUser.id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      dateOfBirth: existingUser.dateOfBirth,
    };

    return res
      .status(StatusCodes.OK)
      .json({ userData, token, message: successMessage.LOGIN_SUCCESS });
  } catch (err) {
    next(err);
  }
};
