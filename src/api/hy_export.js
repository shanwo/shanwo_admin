import axios from '@/libs/api.request'

export const getOrderList = (params) => {
  return axios.request({
    url: '/hy/export/lists',
    params: params,
    method: 'get'
  })
}