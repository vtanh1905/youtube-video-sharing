/// <reference types="@types/jest" />;
import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'

import { AccountService } from '../../../src/services'
import { DBConnection } from '../../../src/utils'

dotenv.config({ path: `${__dirname}/../../../../.env` })

describe('Integration Test - AccountService', () => {
  describe('login function', () => {
    test('should be successful', async () => {
      const email = 'admin@gmail.com'
      const password = '123123'
      const token = await AccountService.getInstance().login(email, password)
      expect((jwt.verify(token, process.env.JWT_KEY || 'null') as any).email).toEqual(email)
    })

    test('should be fail because of wrong password', async () => {
      const email = 'admin@gmail.com'
      const password = 'wrong-password'
      let err
      try {
        await AccountService.getInstance().login(email, password)
      } catch (error) {
        err = error
      }
      expect(err).toBeDefined()
    })
  })

  describe('registry function', () => {
    const email = `${new Date().getTime()}@gmail.com`
    test('should be successful', async () => {
      const password = '123123'
      await AccountService.getInstance().registry(email, password)
    })

    test('should be fail because the email exists', async () => {
      const password = '123123'
      let err
      try {
        await AccountService.getInstance().registry(email, password)
      } catch (error) {
        err = error
      }
      expect(err).toBeDefined()
    })
  })

  describe('getUserByEmail function', () => {
    test('should be successful', async () => {
      const email = 'admin@gmail.com'
      expect(await AccountService.getInstance().getUserByEmail(email)).toEqual({ email })
    })

    test('should be fail because the email doest not exist', async () => {
      const email = 'notexist@gmail.com'
      let err
      try {
        await AccountService.getInstance().getUserByEmail(email)
      } catch (error) {
        err = error
      }
      expect(err).toBeDefined()
    })
  })

  afterAll(() => {
    DBConnection.getInstance().end()
  })
})
