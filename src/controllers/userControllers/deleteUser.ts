/* eslint-disable no-console */
import type { RequestHandler } from 'express';

import db from '../../db/index';

type ParamsType = Record<string, never>;
type BodyType = Record<string, never>;
type QueryType = Record<string, never>;
type ResponseType = {
  message: string;
};

type HandlerType = RequestHandler<
  ParamsType,
  ResponseType,
  BodyType,
  QueryType
>;

export const deleteUser: HandlerType = async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await db.user.remove(user);
    res.status(204).json({ message: 'The user has been deleted' });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: 'try the request later' });
  }
};
