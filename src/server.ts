/* eslint-disable no-console */
import app from './app';
import config from './config';
import dataSource from './db/dataSource';
import successMessage from './utils/successMessage';

(async () => {
  try {
    app.listen(config.port);
    console.log(successMessage.LISTENING, config.port);

    await dataSource.initialize();
  } catch (err) {
    console.log(err);
  }
})();
