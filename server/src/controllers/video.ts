import { Router, Request, Response, NextFunction } from 'express'

import { authenticateMiddleware } from '../middlewares'
import { VideoService } from '../services'
import { CustomRequest } from '../common'
import { postVideoValidator, getVideoValidator } from '../validators'

const videoController: Router = Router()

export const videoGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, offset } = req.query

    res.json({
      message: 'Get Video Successfully',
      data: await VideoService.getInstance().select(Number(limit), Number(offset))
    })
  } catch (error) {
    next(error)
  }
}

export const videoPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body
    const { email } = (req as CustomRequest).user

    await VideoService.getInstance().insert(url, email)

    res.json({
      message: 'Share Video Successfully'
    })
  } catch (error) {
    next(error)
  }
}

videoController.get('/', getVideoValidator, videoGet)
videoController.post('/', authenticateMiddleware, postVideoValidator, videoPost)

export default videoController
