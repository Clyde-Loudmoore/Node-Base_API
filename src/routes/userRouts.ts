import express from 'express';

import userController from '../controllers/userControllers/index';

const routes = express.Router();

routes.get('/', userController.getUsers);
routes.post('/', userController.addUser);
routes.patch('/:userId', userController.editUser);
routes.delete('/:userId', userController.deleteUser);

export default routes;
