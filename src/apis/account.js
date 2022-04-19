import request from '@/plugins/axios'

// 用户登录 URI
const LOGIN_URI = '/auth/login'

export const accountApi = {
  // 用户登录
  login(data) {
    return request({
      url: LOGIN_URI,
      method: 'post',
      data
    })
  }
}