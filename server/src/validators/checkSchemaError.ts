import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export class CustomError extends Error {
  status: number
  error: any

  constructor(status: number, error: any, message?: string) {
    super(message || '')
    this.status = status
    this.error = error
  }
}

export const checkSchemaErrorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new CustomError(400, errors)
  }
  next()
}
