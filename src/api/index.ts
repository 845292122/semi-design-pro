import { Notification } from '@douyinfe/semi-ui'
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { authJotai } from '~/store'
import { getDefaultStore } from 'jotai'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API
  // timeout: 5000,
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    const store = getDefaultStore()
    const token = store.get(authJotai.tokenAtom)

    if (token) {
      request.headers['Authorization'] = 'Bearer ' + token
    }

    return request
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 文件对象直接返回
    if (
      response.request.responseType === 'blob' ||
      response.request.responseType === 'arraybuffer'
    ) {
      return response.data
    }

    return Promise.resolve(response.data)
  },
  (error: AxiosError) => {
    let message = error.response?.data ?? '请求失败,请联系管理员~'
    Notification.error({
      title: '请求失败~',
      content: message,
      duration: 5
    })
    return Promise.reject(error)
  }
)

// TODO: 通用下载方法

export default service

/**
 * 导出api模块
 */
export * from './auth.api'
export * from './tenant.api'
export * from './user.api'
