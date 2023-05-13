import { Router, Request, Response, NextFunction } from 'express'

import { accountValidator } from '../validators'
import { AccountService } from '../services'
import { authenticateMiddleware } from '../middlewares'
import { CustomRequest } from '../common'

const accountController: Router = Router()

accountController.post('/info', authenticateMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = (req as CustomRequest).user

    res.json({
      message: 'Get Info Successfully',
      data: await AccountService.getInstance().getUserByEmail(email)
    })
  } catch (error) {
    next(error)
  }
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
