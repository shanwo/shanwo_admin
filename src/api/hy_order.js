import axios from '@/libs/api.request'

export const getOrderList = (params) => {
  return axios.request({
    url: '/hy/order/lists',
    params: params,
    method: 'get'
  })
}
export const getOrderRefund = (params) => {
  return axios.request({
    url: '/hy/order/refund',
    params: params,
    method: 'post'
  })
}
