/// <reference types="@types/jest" />;
import { errorHandlerMiddleware } from '../../../src/middlewares'

describe('Unit Test - errorHandlerMiddleware', () => {
  test('should be returned next', () => {
    const err: any = {}
    const req: any = {}
    const res: any = {
      headersSent: true
    }
    const next: any = jest.fn()

    errorHandlerMiddleware(err, req, res, next)
    expect(next).toHaveBeenCalled()
  })

  test('should be class res.end()', () => {
    const err: any = {}
    const req: any = {}
    const res: any = {
      headersSent: false,
      status: () => ({
        json: jest.fn()
      }),
      end: jest.fn()
    }
    const next: any = jest.fn()

    errorHandlerMiddleware(err, req, res, next)
    expect(res.end).toHaveBeenCalled()
  })
})
