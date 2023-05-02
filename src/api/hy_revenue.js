import axios from '@/libs/api.request'

export const getRevenueList = (params) => {
  return axios.request({
    url: '/hy/revenue/lists',
    params: params,
    method: 'get'
  })
}
export const revenueInfo = (params) => {
  return axios.request({
    url: '/hy/revenue/info',
    params: params,
    method: 'get'
  })
}