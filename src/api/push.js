import axios from '@/libs/api.request'

export const getPushChannelList = (params) => {
  return axios.request({
    url: '/sw/push/lists',
    params: params,
    method: 'get'
  })
}

export const getPushInfo = (params) => {
  return axios.request({
    url: '/sw/push/info',
    params: params,
    method: 'get'
  })
}
export const addPush = (params) => {
  return axios.request({
    url: '/sw/push/add',
    data: params,
    method: 'post'
  })
}
export const updatePush = (params) => {
  return axios.request({
    url: '/sw/push/edit',
    data: params,
    method: 'post'
  })
}
export const statusPush = (params) => {
  return axios.request({
    url: '/sw/push/status',
    data: params,
    method: 'post'
  })
}
