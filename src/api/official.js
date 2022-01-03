import axios from '@/libs/api.request'

export const menuInfo = (params) => {
  return axios.request({
    url: '/reply/menu',
    params: params,
    method: 'get'
  })
}

export const setMenu = (params) => {
  return axios.request({
    url: '/reply/setMenu',
    data: params,
    method: 'post'
  })
}

export const getReplyList = (params) => {
  return axios.request({
    url: '/reply/lists',
    params: params,
    method: 'get'
  })
}
export const getReplyInfo = (params) => {
  return axios.request({
    url: '/reply/info',
    params: params,
    method: 'get'
  })
}

export const addReply = (params) => {
  return axios.request({
    url: '/reply/add',
    data: params,
    method: 'post'
  })
}
export const updateReply = (params) => {
  return axios.request({
    url: '/reply/edit',
    data: params,
    method: 'post'
  })
}
export const statusReply = (params) => {
  return axios.request({
    url: '/reply/status',
    data: params,
    method: 'post'
  })
}
