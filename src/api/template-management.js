import axios from '@/libs/api.request'

export const getTemplateManagementList = (params) => {
  return axios.request({
    url: '/template/lists',
    params: params,
    method: 'get'
  })
}

export const getSortList = (params) => {
  return axios.request({
    url: '/sort/lists',
    params: params,
    method: 'get'
  })
}

export const getTemplateInfo = (params) => {
  return axios.request({
    url: '/template/info',
    params: params,
    method: 'get'
  })
}
export const addTemplate = (params) => {
  return axios.request({
    url: '/template/add',
    data: params,
    method: 'post'
  })
}
export const updateTemplate = (params) => {
  return axios.request({
    url: '/template/edit',
    data: params,
    method: 'post'
  })
}
export const statusTemplate = (params) => {
  return axios.request({
    url: '/template/status',
    data: params,
    method: 'post'
  })
}
