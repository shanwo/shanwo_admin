import axios from '@/libs/api.request'

export const getRevenueList = (params) => {
  return axios.request({
    url: '/hy/revenue/lists',
    params: params,
    method: 'get'
  })
}
