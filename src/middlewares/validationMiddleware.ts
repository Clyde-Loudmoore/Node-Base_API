import { Handler } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import errorsMessage from '../utils/errorsMessages';
import CustomError from '../utils/customErrors';

type ShapeFieldType = {
  [key: string]:
  yup.StringSchema | yup.NumberSchema | yup.BooleanSchema | yup.DateSchema;
};

type SchemaType = {
  body?: ShapeFieldType;
  query?: ShapeFieldType;
  params?: ShapeFieldType;
};

const createValidationMiddleware = (schema: SchemaType) => {
  const validationMiddleware: Handler = async (req, _res, next) => {

    try {

      const rootShape: Record<string, yup.AnyObjectSchema> = {};

      const schemaKeys = [
        ...Object.keys(schema.body ? schema.body : {}),
        ...Object.keys(schema.params ? schema.params : {}),
        ...Object.keys(schema.query ? schema.query : {}),
      ];

      const requestKeys = [
        ...Object.keys(req.body),
        ...Object.keys(req.params),
        ...Object.keys(req.query),
      ];

      const compareKeys = (schemaKeys: string[], requestKeys: string[]) => {
        return schemaKeys.filter(elem => !requestKeys.includes(elem))
          .concat(requestKeys.filter(elem => !schemaKeys.includes(elem)))
      };

      const invalidFields = compareKeys(schemaKeys, requestKeys)

      if (invalidFields.length) {
        throw new CustomError(StatusCodes.BAD_REQUEST, errorsMessage.ETRA_FIELDS = `Extra fields found ${invalidFields}`);
      }


      Object.entries(schema).forEach(([key, value]) => {
        rootShape[key] = yup.object().shape(value);
      });

      const yupSchema = yup.object().shape(rootShape);

      try {
        await yupSchema.validate(req, { abortEarly: false });
      } catch (err) {
        errorsMessage.ERRORS_STR = err.errors.toString();
        throw new CustomError(
          StatusCodes.CONFLICT,
          errorsMessage.ERRORS_STR,
        );
      }


      await yupSchema.validate(req, { abortEarly: false })

      next();
    } catch (err) {
      next(err)
    }
  }
  return validationMiddleware;
}

export default createValidationMiddleware;
