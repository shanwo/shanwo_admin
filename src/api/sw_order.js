import axios from '@/libs/api.request'

export const getOrderList = (params) => {
  return axios.request({
    url: '/sw/order/lists',
    params: params,
    method: 'get'
  })
}
export const orderRefund = (params) => {
  return axios.request({
    url: '/sw/order/refund',
    data: params,
    method: 'post'
  })
}
