import type { Handler } from 'express';
import type * as yup from 'yup';
import type { OptionalObjectSchema } from 'yup/lib/object';

type UserSchemaType = OptionalObjectSchema<ValidationType>;
export type ShapeFieldType = {
  [key: string]: yup.StringSchema | yup.NumberSchema | yup.DateSchema | yup.BooleanSchema;
};
export type ValidationType = {
  body?: OptionalObjectSchema<ShapeFieldType>;
  query?: OptionalObjectSchema<ShapeFieldType>;
  params?: OptionalObjectSchema<ShapeFieldType>;
};

export const createValidationMiddleware = (schema: UserSchemaType): Handler => {
  return async (req, res, next) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  };
};

export default createValidationMiddleware;
