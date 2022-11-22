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
// 图片清理
export const uploadClean = () => {
  return axios.request({
    url: '/hy/upload/clean',
    method: 'get'
  })
}
