import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import errorMessage from '../utils/errorsMessage';

export const errorsHandler: ErrorRequestHandler = (err, _, res) => {
  if ('localData' in err) {
    return res.status(err.localData.status).json(err.localData);
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(errorMessage.SERVER_ERROR);
};
