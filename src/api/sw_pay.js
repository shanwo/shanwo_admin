import axios from '@/libs/api.request'

export const getPayChannelList = (params) => {
  return axios.request({
    url: '/sw/pay/lists',
    params: params,
    method: 'get'
  })
}

export const getPayInfo = (params) => {
  return axios.request({
    url: '/sw/pay/info',
    params: params,
    method: 'get'
  })
}
export const addPay = (params) => {
  return axios.request({
    url: '/sw/pay/add',
    data: params,
    method: 'post'
  })
}
export const updatePay = (params) => {
  return axios.request({
    url: '/sw/pay/edit',
    data: params,
    method: 'post'
  })
}
export const statusPay = (params) => {
  return axios.request({
    url: '/sw/pay/status',
    data: params,
    method: 'post'
  })
}
