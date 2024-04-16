import axios from "axios"

import config from "@/const/env"

const request = axios.create({
  baseURL: config.baseURL,
  timeout: 1000,
})

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 配置响应拦截器
request.interceptors.response.use(
  (res) => {
    return Promise.resolve(res.data) // 这里直接返回data, 即接口返回的所有数据
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default request
