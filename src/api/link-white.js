import axios from '@/libs/api.request'

export const getLinkWhiteList = (params) => {
  return axios.request({
    url: '/sw/link/lists',
    params: params,
    method: 'get'
  })
}

export const getSortList = (params) => {
  return axios.request({
    url: '/sw/sort/lists',
    params: params,
    method: 'get'
  })
}

export const getLinkInfo = (params) => {
  return axios.request({
    url: '/sw/link/info',
    params: params,
    method: 'get'
  })
}
export const addLink = (params) => {
  return axios.request({
    url: '/sw/link/add',
    data: params,
    method: 'post'
  })
}
export const updateLink = (params) => {
  return axios.request({
    url: '/sw/link/edit',
    data: params,
    method: 'post'
  })
}
export const statusLink = (params) => {
  return axios.request({
    url: '/sw/link/status',
    data: params,
    method: 'post'
  })
}
