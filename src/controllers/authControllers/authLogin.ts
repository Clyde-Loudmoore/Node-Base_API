/* eslint-disable no-console */
import type { Handler } from 'express';

import db from '../../db/index';
import { generateAccessToken } from '../../utils/generateToken';
import hashedPassword from '../../utils/hashedPassword';

export const login: Handler = async (req, res, next) => {
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
      return res.sendStatus(404);
    }

    const token = generateAccessToken(existingUser.id);

    const userData = {
      id: existingUser.id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      dateOfBirth: existingUser.dateOfBirth,
    };

    return res.status(200).json({ userData, token });
  } catch (err) {
    next(err);
  }
};
