import axios from '@/libs/api.request'

export const getUserList = (params) => {
  return axios.request({
    url: '/base/user/lists',
    params: params,
    method: 'get'
  })
}

export const getUserInfo = (params) => {
  return axios.request({
    url: '/base/user/info',
    params: params,
    method: 'get'
  })
}

export const editUserStatus = (params) => {
  return axios.request({
    url: '/base/user/status',
    data: params,
    method: 'post'
  })
}
export const getUserAttention = (params) => {
  return axios.request({
    url: '/base/user/attention',
    params,
    method: 'get'
  })
}
export const getUserBrowse = (params) => {
  return axios.request({
    url: '/base/user/browse',
    params,
    method: 'get'
  })
}
