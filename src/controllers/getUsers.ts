import type { RequestHandler } from 'express';

import { User } from '../db/entities/User';
import db from '../db/index';

type ResponseType = User[];
type HandlerType = RequestHandler<ResponseType>;

export const getUsers: HandlerType = async (_, res) => {
  try {
    const users = await db.user.find();

    return res.json(users);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};
