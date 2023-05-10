import { checkSchema } from 'express-validator'
import { checkSchemaErrorMiddleware } from './checkSchemaError'

export const accountValidator: any = [
  checkSchema({
    email: {
      in: ['body'],
      isEmail: true
    },
    password: {
      in: ['body'],
      isLength: {
        errorMessage: 'Password should be at least 6 chars long and 15 maximum',
        options: { min: 6, max: 15 }
      }
    }
  }),
  checkSchemaErrorMiddleware
]
