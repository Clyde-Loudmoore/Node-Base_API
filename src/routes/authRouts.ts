/* eslint-disable @typescript-eslint/comma-dangle */
import express from 'express';
import { body, validationResult } from 'express-validator';

import authController from '../controllers/authControllers/index';

const routes = express.Router();

routes.post(
  '/registration',

  body('fullName', 'Enter your name').notEmpty(),
  body('password', 'The password must be between 4 and 16 characters').isLength(
    { min: 4, max: 16 }
  ),
  (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  },
  authController.register
);
routes.post(
  '/login',
  body('fullName').isEmail(),
  body('password').isLength({ min: 4, max: 16 }),
  (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  },
  authController.login
);

export default routes;
