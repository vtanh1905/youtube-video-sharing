import { Request, Response, NextFunction } from 'express'

export const errorHandlerMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error)
  }
  res.status(error.status || 500).json(error)
  res.end()
}
