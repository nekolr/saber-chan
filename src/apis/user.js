import request from '@/plugins/axios'

// 当前用户的信息 URI
const CURRENT_USER_INFO_URI = '/auth/info'

export const userApi = {
  // 获取当前用户信息
  getCurrentUserInfo() {
    return request({
      url: CURRENT_USER_INFO_URI,
      
      method: 'get'
    })
  }
}