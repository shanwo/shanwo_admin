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
export const getVenueAdd = (params) => {
  return axios.request({
    url: '/hy/venue/add',
    params,
    method: 'post'
  })
}
export const getVenueEdit = (params) => {
  return axios.request({
    url: '/hy/venue/edit',
    params,
    method: 'post'
  })
}
export const editVenueStatus = (params) => {
  return axios.request({
    url: '/hy/venue/status',
    data: params,
    method: 'post'
  })
}
export const editCacheCache = (params) => {
  return axios.request({
    url: '/hy/venue/cache',
    data: params,
    method: 'post'
  })
}
