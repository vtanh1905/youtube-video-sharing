/// <reference types="@types/jest" />;
import { authenticateMiddleware } from '../../../src/middlewares'

describe('Unit Test - authenticateMiddleware', () => {
  test('should be returned next', () => {
    process.env.JWT_KEY = 'test'
    const req: any = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZ0YW5oMTkwNUBnbWFpbC5jb20iLCJpYXQiOjE2ODQwNTM2OTd9.EbuA5gb0SreQNQ6qqiyRfIRfAj6gGT66BDU_5gPlGaw'
      }
    }
    const res: any = {}
    const next: any = jest.fn()

    authenticateMiddleware(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  test('should be throw error', () => {
    process.env.JWT_KEY = 'no-key'
    const req: any = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZ0YW5oMTkwNUBnbWFpbC5jb20iLCJpYXQiOjE2ODQwNTM2OTd9.EbuA5gb0SreQNQ6qqiyRfIRfAj6gGT66BDU_5gPlGaw'
      }
    }
    const res: any = {}
    const next: any = jest.fn()
    let err
    try {
      authenticateMiddleware(req, res, next)
    } catch (error) {
      err = error
    }
    expect(err).toBeDefined()
  })

  test('should send statusCode 401', () => {
    const req: any = {
      headers: {
        authorization: null
      }
    }
    const res: any = {
      sendStatus: jest.fn()
    }
    const next: any = jest.fn()

    authenticateMiddleware(req, res, next)
    expect(res.sendStatus).toHaveBeenCalled()
  })
})
