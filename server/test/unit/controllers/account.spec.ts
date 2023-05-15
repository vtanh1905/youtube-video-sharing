/// <reference types="@types/jest" />;
import { accountGetInfo, accountRegistry, accountLogin } from '../../../src/controllers/account'

jest.mock('../../../src/services', () => ({
  AccountService: {
    getInstance: jest.fn(() => ({
      getUserByEmail: jest.fn(() => ({
        email: 'admin@gmail.com'
      })),
      registry: jest.fn(),
      login: jest.fn(() => 'token-unit-test')
    }))
  }
}))

describe('Unit Test - Account Controller', () => {
  describe('accountGetInfo function', () => {
    it('should return data', async () => {
      let req: any = {
        user: {
          email: 'admin@gmail.com'
        }
      }
      let res: any = {
        json: jest.fn()
      }
      let next = () => {}

      await accountGetInfo(req, res, next)
      expect(res.json).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith({
        message: 'Get Info Successfully',
        data: {
          email: 'admin@gmail.com'
        }
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
        await accountGetInfo(req, res, next)
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })

  describe('accountRegistry function', () => {
    it('should return data', async () => {
      let req: any = {
        body: {
          email: 'admin@gmail.com',
          password: 'password'
        }
      }
      let res: any = {
        json: jest.fn()
      }
      let next = () => {}

      await accountRegistry(req, res, next)
      expect(res.json).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith({
        message: 'Registry Successfully'
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
        await accountRegistry(req, res, next)
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })

  describe('accountLogin function', () => {
    it('should return data', async () => {
      let req: any = {
        body: {
          email: 'admin@gmail.com',
          password: 'password'
        }
      }
      let res: any = {
        json: jest.fn()
      }
      let next = () => {}

      await accountLogin(req, res, next)
      expect(res.json).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login Successfully',
        data: {
          token: 'token-unit-test'
        }
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
        await accountLogin(req, res, next)
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })
})
