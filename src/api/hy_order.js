import axios from '@/libs/api.request'

export const getOrderList = (params) => {
  return axios.request({
    url: '/hy/order/lists',
    params: params,
    method: 'get'
  })
}
export const orderRefund = (params) => {
  return axios.request({
    url: '/hy/order/refund',
    data: params,
    method: 'post'
  })
}
