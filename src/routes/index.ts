import express from 'express';

import userRoutes from './userRouts';

const routes = express.Router();

routes.use('/users', userRoutes);

export default routes;
