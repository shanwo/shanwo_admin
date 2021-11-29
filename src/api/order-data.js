import axios from '@/libs/api.request'

export const getOrderList = (params) => {
  return axios.request({
    url: '/order/lists',
    params: params,
    method: 'get'
  })
}
