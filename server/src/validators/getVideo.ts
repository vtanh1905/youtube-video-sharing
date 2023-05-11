import { checkSchema } from 'express-validator'
import { checkSchemaErrorMiddleware } from './checkSchemaError'

export const getVideoValidator: any = [
  checkSchema({
    limit: {
      in: ['query'],
      default: {
        options: 5
      },
      isInt: true
    },
    offset: {
      in: ['query'],
      default: {
        options: 0
      },
      isInt: true
    }
  }),
  checkSchemaErrorMiddleware
]
