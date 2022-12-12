/* eslint-disable no-console */
import type { RequestHandler } from 'express';

import type UserType from '../../db/entities/User';
import db from '../../db/index';

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;
type ResponseType = {
  message: string;
  enteredData?: BodyType;
  userInfo?: UserType;
};
type BodyType = {
  fullName: string;
  email: string;
  dateOfBirth: Date;
};

type HandlerType = RequestHandler<
  ParamsType,
  ResponseType,
  BodyType,
  QueryType
>;

export const editUser: HandlerType = async (req, res, next) => {
  try {
    const { fullName, email, dateOfBirth } = req.body;
    const user = await db.user.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', enteredData: req.body });
    }

    user.fullName = fullName;
    user.email = email;
    user.dateOfBirth = dateOfBirth;

    await db.user.save(user);
    return res.status(200).json({ message: 'data succesfully updated' });
  } catch (err) {
    next(err);
  }
};
