import axios from '@/libs/api.request'

export const getVenueList = (params) => {
  return axios.request({
    url: '/hy/venue/lists',
    params: params,
    method: 'get'
  })
}
export const getVenueInfo = (params) => {
  return axios.request({
    url: '/hy/venue/info',
    params: params,
    method: 'get'
  })
}
export const venueAdd = (params) => {
  return axios.request({
    url: '/hy/venue/add',
    params,
    method: 'post'
  })
}
export const venueEdit = (params) => {
  return axios.request({
    url: '/hy/venue/edit',
    params,
    method: 'post'
  })
}
export const venueStatus = (params) => {
  return axios.request({
    url: '/hy/venue/status',
    data: params,
    method: 'post'
  })
}
export const vacheCache = (params) => {
  return axios.request({
    url: '/hy/venue/cache',
    data: params,
    method: 'post'
  })
}
// 图片上报
export const ajaxUploadImg = (params) => {
  return axios.request({
    url: '/hy/upload/report',
    data: params,
    method: 'post'
  })
}
// 图片列表
export const ajaxUploadLists = (params) => {
  return axios.request({
    url: '/hy/upload/lists',
    params: params,
    method: 'get'
  })
}
// 图片清理
export const ajaxUploadClean = () => {
  return axios.request({
    url: '/hy/upload/clean',
    method: 'get'
  })
}
