/* eslint-disable no-console */
import type { Handler } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import CustomError from '../utils/customErrors';
import errorsMessage from '../utils/errorsMessages';

type ShapeFieldType = {
  [key: string]: yup.StringSchema | yup.NumberSchema | yup.BooleanSchema | yup.DateSchema;
};

type SchemaType = {
  body?: ShapeFieldType;
  query?: ShapeFieldType;
  params?: ShapeFieldType;
};

type ParamsType = {
  errors?: string[];
  path?: string;
  params?: {
    [key: string]: string;
  };
};

type ErrorType = {
  inner?: ParamsType[];
  errors?: string[];
};

const createValidationMiddleware = (schema: SchemaType) => {
  const validationMiddleware: Handler = async (req, _res, next) => {
    try {
      const errors: Array<{
        path: string;
        message?: string;
        key?: string;
      }> = [];

      const rootShape: Record<string, yup.AnyObjectSchema> = {};

      const requestKeys = {
        body: Object.keys(req.body),
        params: Object.keys(req.params),
        query: Object.keys(req.query),
      };

      const compareKeys = (schemaKeys: string[], requestKeys: string[]) => {
        return schemaKeys.filter((elem) => !requestKeys.includes(elem))
          .concat(requestKeys.filter((elem) => !schemaKeys.includes(elem)));
      };

      Object.entries(schema).forEach(([key, value]) => {
        const arr = requestKeys[key as keyof typeof requestKeys];
        const invalidFields = compareKeys(arr, Object.keys(value));
        if (invalidFields.length) {
          invalidFields.forEach((item) => {
            errors.push({
              key: item,
              path: key,
              message: errorsMessage.EXTRA_FIELDS,
            });
          });
        }
        rootShape[key] = yup.object().shape(value);
      });

      const yupSchema = yup.object(rootShape);

      await yupSchema.validate(req, { abortEarly: false })
        .catch((err: ErrorType) => {
          err.inner.forEach((item) => {
            const [path, key] = item.path.split('.');
            errors.push({
              key,
              path,
              message: item.errors.join(),
            });
          });
        });

      if (errors.length) {
        throw new CustomError(StatusCodes.BAD_REQUEST, errorsMessage.USER_ERRORS, errors);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
  return validationMiddleware;
};

export default createValidationMiddleware;
