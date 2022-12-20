import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import CustomError from '../utils/customErrors';
import config from '../config';

const errorsHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof CustomError) {
    res.status(err.status).json({ message: err.message, error: err.payload });
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: config.server.internalErrorMessage });
};

export default errorsHandler;
