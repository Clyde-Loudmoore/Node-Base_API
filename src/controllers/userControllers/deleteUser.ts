/* eslint-disable no-console */
import type { RequestHandler } from 'express';

import type { User } from '../../db/entities/User';
import db from '../../db/index';

type ParamsType = Record<string, never>;
type ResponseType = User;
type BodyType = {
  id: number;
};
type QueryType = Record<string, never>;

type HandlerType = RequestHandler<
  ParamsType,
  ResponseType,
  BodyType,
  QueryType
>;

export const deleteUser: HandlerType = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await db.user.findOneBy({ id });
    console.log(user);

    await db.user.remove(user);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};
