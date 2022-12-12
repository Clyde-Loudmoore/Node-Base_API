/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import type UserType from '../../db/entities/User';
import db from '../../db/index';
import hashedPassword from '../../utils/hashedPassword';

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;
type ResponseType = {
  message: string;
  enteredData?: BodyType;
};
type BodyType = UserType;

type HandlerType = RequestHandler<
  ParamsType,
  ResponseType,
  BodyType,
  QueryType
>;

export const editUserPass: HandlerType = async (req, res) => {
  try {
    const existingUser = await db.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('email = :email', { email: req.body.email })
      .getOne();

    const matchPassword = await hashedPassword.comparePass(
      req.body.password,
      existingUser.password
    );

    if (!matchPassword) {
      const newPassword = hashedPassword.hashedPass(req.body.password);
      existingUser.password = (await newPassword).toString();
    } else {
      return res.status(400).json({ message: 'Enter a new password' });
    }
    await db.user.save(existingUser);

    if (!existingUser) {
      return res.status(404).json({
        message: 'The user`s password cannot be updated',
      });
    }

    res
      .status(200)
      .json({ message: 'The user`s password has been successfully updated' });
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};
