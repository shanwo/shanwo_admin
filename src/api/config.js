import axios from '@/libs/api.request'

export const getConfigList = (params) => {
  return axios.request({
    url: '/config/lists',
    params: params,
    method: 'get'
  })
}

export const getConfigInfo = (params) => {
  return axios.request({
    url: '/config/info',
    params: params,
    method: 'get'
  })
}
export const addConfig = (params) => {
  return axios.request({
    url: '/config/add',
    data: params,
    method: 'post'
  })
}
export const updateConfig = (params) => {
  return axios.request({
    url: '/config/edit',
    data: params,
    method: 'post'
  })
}
export const statusConfig = (params) => {
  return axios.request({
    url: '/config/status',
    data: params,
    method: 'post'
  })
}
