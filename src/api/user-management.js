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
