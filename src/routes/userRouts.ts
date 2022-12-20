import express from 'express';

import createValidationMiddleware from '../middlewares/validationMiddleware';
import user from '../validationSchemes/user';
import userControllers from '../controllers/userControllers';
import verifyAuthorization from '../middlewares/verifyToken';

const routes = express.Router();

routes.use(verifyAuthorization);

routes.get('/me', userControllers.getUser);

routes.patch('/:userId', createValidationMiddleware(user.editUser), userControllers.editUser);

routes.patch('/:userId/password', createValidationMiddleware(user.editUserPass), userControllers.editUserPass);

routes.delete('/:userId', createValidationMiddleware(user.deleteUser), userControllers.deleteUser);

export default routes;
