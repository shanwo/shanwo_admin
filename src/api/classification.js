import axios from '@/libs/api.request'

export const addClassification = (params) => {
  return axios.request({
    url: '/sw/sort/add',
    data: params,
    method: 'post'
  })
}

export const getClassificationList = (params) => {
  return axios.request({
    url: '/sw/sort/lists',
    params: params,
    method: 'get'
  })
}

export const getClassificationInfo = (params) => {
  return axios.request({
    url: '/sw/sort/info',
    params: params,
    method: 'get'
  })
}

export const updateClassification = (params) => {
  return axios.request({
    url: '/sw/sort/edit',
    data: params,
    method: 'post'
  })
}

export const delClassification = (params) => {
  return axios.request({
    url: '/sw/sort/del',
    data: params,
    method: 'post'
  })
}
