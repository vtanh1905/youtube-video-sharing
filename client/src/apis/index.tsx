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

export const getVideosApi = async (limit: number, offset: number) => {
  const { data } = await axiosInstance().get(`/video?limit=${limit}&offset=${offset}`)
  return data
}

export const postVideosApi = async (url: string) => {
  const { data } = await axiosInstance().post(`/video`, {
    url
  })
  return data
}
