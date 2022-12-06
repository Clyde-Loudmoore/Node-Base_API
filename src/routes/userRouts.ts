import express from 'express';

import controller from '../controllers/index';

const routes = express.Router();

routes.get('/', controller.getUsers);
routes.post('/', controller.addUser);

export default routes;
