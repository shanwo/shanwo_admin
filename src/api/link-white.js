import axios from '@/libs/api.request'

export const getLinkWhiteList = (params) => {
  return axios.request({
    url: '/link/lists',
    params: params,
    method: 'get'
  })
}

export const getSortList = (params) => {
  return axios.request({
    url: '/sort/lists',
    params: params,
    method: 'get'
  })
}

export const getLinkInfo = (params) => {
  return axios.request({
    url: '/link/info',
    params: params,
    method: 'get'
  })
}
export const addLink = (params) => {
  return axios.request({
    url: '/link/add',
    data: params,
    method: 'post'
  })
}
export const updateLink = (params) => {
  return axios.request({
    url: '/link/edit',
    data: params,
    method: 'post'
  })
}
export const deleteLink = (params) => {
  return axios.request({
    url: '/link/del',
    data: params,
    method: 'post'
  })
}
