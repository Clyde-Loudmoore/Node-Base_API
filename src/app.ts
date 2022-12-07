/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';

import dataSource from './db/dataSource';
import routes from './routes/index';
import config from './config';

const app = express();

app.use(
  cors({
    origin: config.currentUrl,
  })
);
app.use(express.json());
app.use('/api', routes);

(async () => {
  try {
    await dataSource.initialize();
  } catch (err) {
    return console.log(err);
  }
})();

export default app;
