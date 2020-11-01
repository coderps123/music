import axios from "axios"
import config from "./config"

const instance = axios.create({
  timeout: 5000,
  baseURL: config.base_url,
  withCredentials: true // 允许跨域
})

// 设置请求拦截器
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 设置响应拦截器
instance.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {

  }
)

export default instance
