import { checkSchema } from 'express-validator'
import { checkSchemaErrorMiddleware } from './checkSchemaError'

export const accountValidator: any = [
  checkSchema({
    email: {
      in: ['body'],
      isString: true
    },
    password: {
      in: ['body'],
      isString: true
    }
  }),
  checkSchemaErrorMiddleware
]
