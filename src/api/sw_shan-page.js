import axios from '@/libs/api.request'

export const getPageList = (params) => {
  return axios.request({
    url: '/sw/page/lists',
    params: params,
    method: 'get'
  })
}

export const getPageInfo = (params) => {
  return axios.request({
    url: '/sw/page/info',
    params: params,
    method: 'get'
  })
}

export const setSortConfig = (params) => {
  return axios.request({
    url: '/sw/page/sort',
    data: params,
    method: 'post'
  })
}
export const statusShanPage = (params) => {
  return axios.request({
    url: '/sw/page/status',
    data: params,
    method: 'post'
  })
}
export const getShanPageAttention = (params) => {
  return axios.request({
    url: '/sw/page/attention',
    params,
    method: 'get'
  })
}
export const getShanPageBrowse = (params) => {
  return axios.request({
    url: '/sw/page/browse',
    params,
    method: 'get'
  })
}
