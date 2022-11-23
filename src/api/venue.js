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
    data: params,
    method: 'post'
  })
}
export const venueEdit = (params) => {
  return axios.request({
    url: '/hy/venue/edit',
    data: params,
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
