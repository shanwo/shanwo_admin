import axios from '@/libs/api.request'
// 图片上报
export const uploadImg = (params) => {
  return axios.request({
    url: '/hy/upload/report',
    data: params,
    method: 'post',
    two: true
  })
}
// 图片列表
export const uploadLists = (params) => {
  return axios.request({
    url: '/hy/upload/lists',
    params: params,
    method: 'get'
  })
}
// 图片删除
export const uploadDel = (params) => {
  return axios.request({
    url: '/hy/upload/del',
    data: params,
    method: 'post'
  })
}
// 图片下载
export const uploadDown = (params) => {
  return axios.request({
    url: '/hy/upload/download',
    params: params,
    method: 'get'
  })
}

export const ajaxBaseSecret = (params) => {
  return axios.request({
    url: '/upload/secret',
    params: params,
    method: 'get'
  })
}
