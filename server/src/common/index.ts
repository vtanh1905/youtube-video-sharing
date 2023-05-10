export class CustomError {
  status: number
  error: any

  constructor(status: number, error: any) {
    this.status = status
    this.error = error
  }
}
