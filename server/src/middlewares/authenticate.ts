import { Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { CustomError, CustomRequest } from '../common'

export const authenticateMiddleware: any = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_KEY || '', (err: any, user: any) => {
    if (err) {
      throw new CustomError(403, 'Forbidden')
    }

    req.user = user

    next()
  })
}
