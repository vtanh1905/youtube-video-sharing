import { Router, Request, Response, NextFunction } from 'express'

import { accountValidator } from '../validators';

const accountController: Router = Router()

accountController.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

accountController.post('/registry', accountValidator, (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: 'Registry Successfully'
    })
  } catch (error) {
    next(error)
  }
})

accountController.post('/login', (req: Request, res: Response) => {
  res.send('login')
})

export { accountController }
