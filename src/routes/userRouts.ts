import express from 'express';

import controller from '../controllers/index';

const routes = express.Router();

routes.get('/', controller.getUsers);
routes.post('/', controller.addUser);
routes.patch('/:userId', controller.editUser);
routes.delete('/:userId', controller.deleteUser);

export default routes;
