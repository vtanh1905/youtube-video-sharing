import { Router, Request, Response, NextFunction } from 'express'

import { authenticateMiddleware } from '../middlewares'
import { VideoService } from '../services';
import { CustomRequest } from '../common';
import { postVideoValidator } from '../validators';

const videoController: Router = Router()

videoController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: 'Get Video Successfully',
      data: []
    })
  } catch (error) {
    next(error)
  }
})

videoController.post('/', authenticateMiddleware, postVideoValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url } = req.body;
    const { email } = (req as CustomRequest).user;

    await VideoService.getInstance().insert(url, '', email)
    
    res.json({
      message: 'Share Video Successfully',
    })
  } catch (error) {
    next(error)
  }
})

export { videoController }
