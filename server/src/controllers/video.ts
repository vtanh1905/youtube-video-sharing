import { Router, Request, Response } from 'express'
import { authenticateMiddleware } from '../middlewares'

const videoController: Router = Router()

videoController.get('/', authenticateMiddleware, (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

export { videoController }
