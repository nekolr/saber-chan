import axios from 'axios'
import store from '@/store'
import cookies from '@/utils/cookies'
import { message } from 'ant-design-vue'
import i18n from '@/i18n'

const TOKEN_PREFIX = 'Bearer '
const LOGIN_URI = '/auth/login'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.APP_SERVER_URL,
  timeout: 6000,
  withCredentials: true
})

// 注销操作
function logout() {
  store.dispatch('account/logout')
}

// 显示错误
function errorLog(error) {
  message.error(error.message, 2)
}

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 如果是登录请求，则不需要加上 Token
    if (config.url.substring(config.baseURL) !== LOGIN_URI) {
      // 在请求发送之前做一些处理
      const token = cookies.get('token')
      // 让每个请求携带 token-- ['Authorization'] 为自定义 key 请根据实际情况自行修改
      config.headers['Authorization'] = TOKEN_PREFIX + token
    }
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        ...{ '_t': new Date().getTime() }
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 401) {
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  error => {
    if (error && error.response) {
      if (error.response.status === 401) {
        logout()
        return
      } else {
        error.message = error.response.data.message
      }
    } else {
      error.message = i18n.global.t('networkError')
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service