/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import type { User } from '../../db/entities/User';
import db from '../../db/index';
import { generateAccessToken } from '../../utils/generateToken';

type ParamsType = Record<string, never>;
type ResponseType = { user: User; token: string };
type BodyType = {
  email: string;
  password: string;
};
type QueryType = Record<string, never>;

type HandlerType = RequestHandler<
  ParamsType,
  ResponseType,
  BodyType,
  QueryType
>;

export const login: HandlerType = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findOneBy({ email });
    if (!user) {
      return res.sendStatus(404);
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.sendStatus(404);
    }

    const token = generateAccessToken(user.id);
    return res.json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};
