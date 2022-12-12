/* eslint-disable no-console */
import type { RequestHandler } from 'express';

import type User from '../../db/entities/User';
import db from '../../db/index';

type ResponseType = User[];
type HandlerType = RequestHandler<ResponseType>;

export const getUser: HandlerType = async (req, res) => {
  try {
    const users = await db.user.findOne({ where: { id: req.user.id } });

    return res.json(users);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};
