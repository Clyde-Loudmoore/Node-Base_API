import express from 'express';
import cors from 'cors';

import { errorsHandler } from './middlewares/errorsHandler';

import routes from './routes';
import config from './config';
import './types/express/index';

const app = express();

app.use(
  cors({
    origin: [config.currentUrl],
  })
);
app.use(express.json());
app.use('/api', routes);
app.use(errorsHandler);

export default app;
