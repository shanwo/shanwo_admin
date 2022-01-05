import axios from '@/libs/api.request'

export const menuInfo = (params) => {
  return axios.request({
    url: '/official/menu/info',
    params: params,
    method: 'get'
  })
}

export const setMenu = (params) => {
  return axios.request({
    url: '/official/menu/update',
    data: params,
    method: 'post'
  })
}
export const getMediaList = (params) => {
  return axios.request({
    url: '/official/material/media',
    params: params,
    method: 'get'
  })
}
export const getArticleList = (params) => {
  return axios.request({
    url: '/official/material/article',
    params: params,
    method: 'get'
  })
}

export const getReplyList = (params) => {
  return axios.request({
    url: '/official/reply/lists',
    params: params,
    method: 'get'
  })
}
export const getReplyInfo = (params) => {
  return axios.request({
    url: '/official/reply/info',
    params: params,
    method: 'get'
  })
}

export const addReply = (params) => {
  return axios.request({
    url: '/official/reply/add',
    data: params,
    method: 'post'
  })
}
export const updateReply = (params) => {
  return axios.request({
    url: '/official/reply/edit',
    data: params,
    method: 'post'
  })
}
export const statusReply = (params) => {
  return axios.request({
    url: '/official/reply/status',
    data: params,
    method: 'post'
  })
}
