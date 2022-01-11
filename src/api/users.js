import axios from '@/libs/api.request'

export const getUserList = (params) => {
  return axios.request({
    url: '/user/lists',
    params: params,
    method: 'get'
  })
}

export const getUserInfo = (params) => {
  return axios.request({
    url: '/user/info',
    params: params,
    method: 'get'
  })
}

export const editUserStatus = (params) => {
  return axios.request({
    url: '/user/status',
    data: params,
    method: 'post'
  })
}
export const getUserAttention = (params) => {
  return axios.request({
    url: '/user/attention',
    params,
    method: 'get'
  })
}
export const getUserBrowse = (params) => {
  return axios.request({
    url: '/user/browse',
    params,
    method: 'get'
  })
}
