import request from '@/plugins/axios'

// 获取用户图片列表 URI
const GET_IMAGES_URI = '/api/images'

export const imageApi = {
  // 获取用户的图片列表
  getImages(params) {
    return request({
      url: GET_IMAGES_URI,
      method: 'get',
      params
    })
  }
}