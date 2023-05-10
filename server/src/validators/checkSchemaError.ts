import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import { CustomError } from '../common';

export const checkSchemaErrorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new CustomError(400, errors)
  }
  next()
}
