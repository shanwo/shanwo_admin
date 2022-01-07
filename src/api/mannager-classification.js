import axios from '@/libs/api.request'

export const addClassification = (params) => {
  return axios.request({
    url: '/sort/add',
    data: params,
    method: 'post'
  })
}

export const getClassificationList = (params) => {
  return axios.request({
    url: '/sort/lists',
    params: params,
    method: 'get'
  })
}

export const getClassificationInfo = (params) => {
  return axios.request({
    url: '/sort/info',
    params: params,
    method: 'get'
  })
}

export const updateClassification = (params) => {
  return axios.request({
    url: '/sort/edit',
    data: params,
    method: 'post'
  })
}

export const delClassification = (params) => {
  return axios.request({
    url: '/sort/del',
    data: params,
    method: 'post'
  })
}
