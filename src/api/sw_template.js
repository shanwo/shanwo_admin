import axios from '@/libs/api.request'

export const getTemplateManagementList = (params) => {
  return axios.request({
    url: '/sw/template/lists',
    params: params,
    method: 'get'
  })
}

export const getSortList = (params) => {
  return axios.request({
    url: '/sw/sort/lists',
    params: params,
    method: 'get'
  })
}

export const getTemplateInfo = (params) => {
  return axios.request({
    url: '/sw/template/info',
    params: params,
    method: 'get'
  })
}
export const addTemplate = (params) => {
  return axios.request({
    url: '/sw/template/add',
    data: params,
    method: 'post'
  })
}
export const updateTemplate = (params) => {
  return axios.request({
    url: '/sw/template/edit',
    data: params,
    method: 'post'
  })
}
export const statusTemplate = (params) => {
  return axios.request({
    url: '/sw/template/status',
    data: params,
    method: 'post'
  })
}
