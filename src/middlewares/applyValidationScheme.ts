import type { Handler } from 'express';
import * as yup from 'yup';
import type { OptionalObjectSchema } from 'yup/lib/object';
import { StatusCodes } from 'http-status-codes';

import { customError } from '../utils/createCustomError';
import errorsMessage from '../utils/errorsMessage';

type UserSchemaType = OptionalObjectSchema<ValidationType>;
export type ShapeFieldType = {
  [key: string]:
    | yup.StringSchema
    | yup.NumberSchema
    | yup.DateSchema
    | yup.BooleanSchema;
};
export type ValidationType = {
  body?: OptionalObjectSchema<ShapeFieldType>;
  query?: OptionalObjectSchema<ShapeFieldType>;
  params?: OptionalObjectSchema<ShapeFieldType>;
};

export const createValidationMiddleware = (schema: UserSchemaType): Handler => {
  return async (req, _, next) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return next(
          customError(StatusCodes.BAD_REQUEST, errorsMessage.INCORRECT_DATA)
        );
      }
    }
  };
};

export default createValidationMiddleware;
