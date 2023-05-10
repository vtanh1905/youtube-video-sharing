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

    await AccountService.getInstance().registry(email, password)

    res.json({
      message: 'Registry Successfully'
    })
  } catch (error) {
    next(error)
  }
})

accountController.post('/login', accountValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    res.json({
      message: 'Login Successfully',
      data: {
        token: await AccountService.getInstance().login(email, password)
      }
    })
  } catch (error) {
    next(error)
  }
})

export { accountController }
