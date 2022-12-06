import type { RequestHandler } from 'express';

import { User } from '../db/entities/User';
import db from '../db/index';

type ParamsType = Record<string, never>;
type ResponseType = User;
type BodyType = {
  id: number;
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

export const editUser: HandlerType = async (req, res) => {
  try {
    const { id, fullName, email, password, dateOfBirth } = req.body;
    const user = await db.user.findOneBy({ id: id });
    user.fullName = fullName;
    user.email = email;
    user.password = password;
    user.dateOfBirth = dateOfBirth;

    await db.user.save(user);
    return res.json(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};
