
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { logger } from '../utils/logger';

/**
 * Middleware factory to create a validation middleware for request bodies.
 * It uses a provided Zod schema to parse and validate the request body.
 *
 * @param schema The Zod schema to validate against.
 * @returns An Express middleware function.
 */
export const validateBody = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const traceId = (req as any).traceId;
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error: any) {
      logger.warn('request_validation_failed', {
        traceId,
        path: req.path,
        errors: error.issues,
      });
      return res.status(400).json({ message: 'Invalid request body', errors: error.issues });
    }
  };
};
