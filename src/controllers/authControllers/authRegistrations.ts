/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../../db/entities/User';
import db from '../../db/index';

type ParamsType = Record<string, never>;
type ResponseType = User;
type BodyType = {
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
};
type QueryType = Record<string, never>;

type HandlerType = RequestHandler<
  ParamsType,
  ResponseType,
  BodyType,
  QueryType
>;

export const register: HandlerType = async (req, res) => {
  try {
    const { fullName, email, password, dateOfBirth } = req.body;

    const candidate = await db.user.findOneBy({ fullName });
    if (candidate) {
      return res.sendStatus(400);
    }

    const hashPassword = bcrypt.hashSync(password, 8);
    const user = new User();
    user.fullName = fullName;
    user.email = email;
    user.password = hashPassword;
    user.dateOfBirth = dateOfBirth;
    await db.user.save(user);

    res.json(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
