import { axiosInstance } from './axios'

export const loginApi = async (email: string, password: string) => {
  const { data } = await axiosInstance().post('/account/login', {
    email,
    password
  })
  return data
}

export const registryApi = async (email: string, password: string) => {
  const { data } = await axiosInstance().post('/account/registry', {
    email,
    password
  })
  return data
}

export const getAccountInfoApi = async (token: string) => {
  const { data } = await axiosInstance().post('/account/info', {
    token
  })
  return data
}
