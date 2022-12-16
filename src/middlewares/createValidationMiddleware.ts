import { Handler } from 'express';
import * as yup from 'yup';

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
      Object.entries(schema).forEach(([key, value]) => {

        rootShape[key] = yup.object().shape(value);
      });
      const yupSchema = yup.object().shape(rootShape);

      await yupSchema.validate(req, { abortEarly: false })

      next();
    } catch (err) {
      next(err)
    }
  }
  return validationMiddleware;
}

export default createValidationMiddleware;
