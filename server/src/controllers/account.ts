import { Router, Request, Response, NextFunction } from 'express'

import { accountValidator } from '../validators'
import { AccountService } from '../services'

const accountController: Router = Router()

accountController.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

accountController.post('/registry', accountValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    await AccountService.getInstance().insert(email, password)

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
