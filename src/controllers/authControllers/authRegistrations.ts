/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import User from '../../db/entities/User';
import type UserType from '../../db/entities/User';
import db from '../../db/index';
import { generateAccessToken } from '../../utils/generateToken';
import config from '../../config';
import hashedPassword from '../../utils/hashedPassword';

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
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
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

    res.status(200).json({
      user: newUser,
      token,
    });
  } catch (err) {
    next(err);
  }
};
