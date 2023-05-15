/// <reference types="@types/jest" />;
import { videoGet, videoPost } from '../../../src/controllers/video'

jest.mock('../../../src/services', () => ({
  VideoService: {
    getInstance: jest.fn(() => ({
      select: jest.fn(() => []),
      insert: jest.fn()
    }))
  }
}))

describe('Unit Test - Account Controller', () => {
  describe('videoGet function', () => {
    it('should return data', async () => {
      let req: any = {
        query: {
          limit: 3,
          offset: 0
        }
      }
      let res: any = {
        json: jest.fn()
      }
      let next = () => {}

      await videoGet(req, res, next)
      expect(res.json).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith({
        message: 'Get Video Successfully',
        data: []
      })
    })

    it('should throw error', async () => {
      let req: any = {
        user: {
          email: 'admin@gmail.com'
        }
      }
      let res: any = {
        json: () => {
          throw new Error()
        }
      }
      let next = () => {}

      try {
        await videoGet(req, res, next)
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })

  describe('videoPost function', () => {
    it('should return data', async () => {
      let req: any = {
        body: {
          url: 'https://www.youtube.com/watch?v=Xu54Ex2kuVY'
        },
        user: {
          email: 'admin@gmail.com'
        }
      }
      let res: any = {
        json: jest.fn()
      }
      let next = () => {}

      await videoPost(req, res, next)
      expect(res.json).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith({
        message: 'Share Video Successfully'
      })
    })

    it('should throw error', async () => {
      let req: any = {}
      let res: any = {
        json: () => {
          throw new Error()
        }
      }
      let next = () => {}

      try {
        await videoPost(req, res, next)
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })
})
