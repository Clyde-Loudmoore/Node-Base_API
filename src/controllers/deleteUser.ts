import type { RequestHandler } from 'express';

import { User } from '../db/entities/User';
import db from '../db/index';

type ResponseType = User;
type BodyType = {
  id: number;
};

type HandlerType = RequestHandler<ResponseType, BodyType>;

export const deleteUser: HandlerType = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await db.user.findOneBy({ id: id });
    await db.user.remove(user);

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};
