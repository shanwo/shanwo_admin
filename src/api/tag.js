import axios from '@/libs/api.request'

export const getTaglList = (params) => {
  return axios.request({
    url: '/tag/lists',
    params: params,
    method: 'get'
  })
}

export const getTagInfo = (params) => {
  return axios.request({
    url: '/tag/info',
    params: params,
    method: 'get'
  })
}
export const addTag = (params) => {
  return axios.request({
    url: '/tag/add',
    data: params,
    method: 'post'
  })
}
export const updateTag = (params) => {
  return axios.request({
    url: '/tag/edit',
    data: params,
    method: 'post'
  })
}
export const statusTag = (params) => {
  return axios.request({
    url: '/tag/status',
    data: params,
    method: 'post'
  })
}
