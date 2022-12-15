/* eslint-disable no-console */
import app from './app';
import config from './config';
import successMessage from './utils/successMessages';
import connectToDb from './db/connectToDb';

(async () => {
  try {
    connectToDb();
    app.listen(config.port);

    console.log(successMessage.LISTENING, config.port);
  } catch (err) {
    console.log(err);
  }
})();
