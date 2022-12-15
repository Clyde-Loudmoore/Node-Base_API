/* eslint-disable no-console */
import dotenv from 'dotenv';
import fs from 'fs';

const defaultConfig = dotenv.parse(fs.readFileSync('default.env'));
const localConfig = dotenv.parse(fs.readFileSync('.env'));

const mainConfig = {
  ...defaultConfig,
  ...localConfig,
};

const config = {
  postgresDb: {
    host: mainConfig.POSTGRES_DB_HOST,
    port: Number(mainConfig.POSTGRES_DB_PORT),
    user: mainConfig.POSTGRES_DB_USER,
    password: mainConfig.POSTGRES_DB_PASSWORD,
    database: mainConfig.POSTGRES_DB_NAME,
    logging: mainConfig.POSTGRES_DB_LOGGING === 'true',
  },
  port: mainConfig.SERVER_PORT,
  currentUrl: mainConfig.CURRENT_URL,
  token: {
    secretKey: mainConfig.TOKEN_SECRET,
    expiresIn: mainConfig.TOKEN_AUTH_EXPIRATION,
  },
  password: {
    salt: mainConfig.PASSWORD_HASH_SALT,
    type: mainConfig.PASSWORD_HASH_TYPE,
  },
  server: {
    internalErrorMessage: mainConfig.SERVER_INTERNAL_ERROR_MESSAGE,
  },
};

export default config;
