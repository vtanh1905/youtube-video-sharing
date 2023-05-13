import { checkSchema } from 'express-validator'
import { checkSchemaErrorMiddleware } from './checkSchemaError'

export const postVideoValidator: any = [
  checkSchema({
    url: {
      in: ['body'],
      matches: {
        options: /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/watch\?v=[0-9a-zA-Z_-]+$/
      }
    }
  }),
  checkSchemaErrorMiddleware
]
