import axios from '@/libs/api.request'

export const getPageList = (params) => {
  return axios.request({
    url: '/page/lists',
    params: params,
    method: 'get'
  })
}

export const getPageInfo = (params) => {
  return axios.request({
    url: '/page/info',
    params: params,
    method: 'get'
  })
}

export const setSortConfig = (params) => {
  return axios.request({
    url: '/page/sort',
    data: params,
    method: 'post'
  })
}
export const statusShanPage = (params) => {
  return axios.request({
    url: '/page/status',
    data: params,
    method: 'post'
  })
}
