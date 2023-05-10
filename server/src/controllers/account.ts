import { Router, Request, Response } from 'express'

const accountController: Router = Router()

accountController.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

accountController.get('/registry', (req: Request, res: Response) => {
  res.send('registry')
})

accountController.get('/login', (req: Request, res: Response) => {
  res.send('login')
})

export { accountController }
