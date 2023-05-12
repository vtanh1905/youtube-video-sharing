import axios, { AxiosInstance } from 'axios'

import { cookies } from '../utils/cookies'

export const axiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.API_URL
  })

  const token = cookies.get('token')
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  return instance
}
