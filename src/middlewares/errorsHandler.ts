import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import CustomError from '../utils/cunstomErrors';
import config from '../config';

const errorsHandler: ErrorRequestHandler = (err, _, res, _next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message,
      error: err.payload,
    });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: config.server.internalErrorMessage,
  });
};

export default errorsHandler;
