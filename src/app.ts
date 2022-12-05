/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';

import dataSource from './db/dataSource';
// import routes from './routes';

const app = express();

app.use(express.json());
app.use('api/users', cors());

(async () => {
  try {
    await dataSource.initialize();
  } catch (err) {
    return console.log(err);
  }
})();

export default app;
