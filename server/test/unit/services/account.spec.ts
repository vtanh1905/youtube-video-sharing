/// <reference types="@types/jest" />;
import { AccountService } from '../../../src/services/account'
import * as jwt from 'jsonwebtoken'

jest.mock('../../../src/utils', () => ({
  DBConnection: {
    getInstance: jest.fn(() => ({
      query: jest.fn((sql: string, arg: any) => {
        if (arg[0] === 'admin@gmail.com') {
          return {
            rowCount: 1,
            rows: [
              {
                email: 'admin@gmail.com',
                password: '$2a$10$KKE0mYuweXjfSMQBS8hERem9KjHUwBg3DMxdZsTH42875WItPcJDy' // === password
              }
            ]
          }
        }

        return {
          rowCount: 0,
          rows: []
        }
      })
    }))
  }
}))

describe('Unit Test - Account Service', () => {
  test('AccountService should be defined', async () => {
    const accountService = new AccountService()
    expect(accountService).toBeDefined()
  })

  test('getInstance function should be defined', async () => {
    expect(AccountService.getInstance()).toBeDefined()
  })

  describe('getUserByEmail function', () => {
    test('should return data', async () => {
      const email = 'admin@gmail.com'
      expect(await AccountService.getInstance().getUserByEmail(email)).toEqual({
        email: 'admin@gmail.com',
        password: '$2a$10$KKE0mYuweXjfSMQBS8hERem9KjHUwBg3DMxdZsTH42875WItPcJDy'
      })
    })

    test('should throw error because Email does not exists', async () => {
      const email = 'no-email@gmail.com'
      let err: any
      try {
        await AccountService.getInstance().getUserByEmail(email)
      } catch (error) {
        err = error
      }
      expect(err).toBeDefined()
    })
  })

  describe('registry function', () => {
    test('should return data', async () => {
      const email = 'admin@gmail.com'
      const password = 'password'
      expect(await AccountService.getInstance().registry(email, password)).toEqual(undefined)
    })

    test('should throw error because Email does not exists', async () => {
      const email = 'no-email@gmail.com'
      const password = 'password'
      let err: any
      try {
        await AccountService.getInstance().registry(email, password)
      } catch (error) {
        err = error
      }
      expect(err).toBeDefined()
    })
  })

  describe('login function', () => {
    test('should return data', async () => {
      const email = 'admin@gmail.com'
      const password = 'password'
      process.env.JWT_KEY = 'test'
      const token = await AccountService.getInstance().login(email, password)
      expect((jwt.verify(token, process.env.JWT_KEY) as any).email).toEqual(email)
    })

    test('should throw error because Email does not exists', async () => {
      const email = 'no-email@gmail.com'
      const password = 'password'
      let err: any
      try {
        await AccountService.getInstance().login(email, password)
      } catch (error) {
        err = error
      }
      expect(err).toBeDefined()
    })
  })
})
