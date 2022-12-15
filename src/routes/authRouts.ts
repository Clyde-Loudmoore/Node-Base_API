/* eslint-disable @typescript-eslint/comma-dangle */
import express from 'express';

import authController from '../controllers/authControllers/index';
import createValidationMiddleware from '../middlewares/createValidationMiddleware';
import user from '../validationSchemes/user';

const routes = express.Router();

routes.post(
  '/register',
  createValidationMiddleware(user.registration),
  authController.register
);
routes.post('/login', createValidationMiddleware(user.login), authController.login);

export default routes;
