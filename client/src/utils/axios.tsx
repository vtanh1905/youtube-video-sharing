import axios, { AxiosInstance } from 'axios'

import { cookies } from './cookies'

export const axiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: 'http://localhost:3000'
  })

  const token = cookies.get('token')
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  return instance
}
