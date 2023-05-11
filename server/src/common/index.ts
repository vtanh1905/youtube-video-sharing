import { Request } from 'express'

export class CustomError {
  status: number
  error: any

  constructor(status: number, error: any) {
    this.status = status
    this.error = error
  }
}

export interface User {
  email: string
}

export interface CustomRequest extends Request {
  user: User
}
