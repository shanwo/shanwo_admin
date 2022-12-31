import axios from '@/libs/api.request'

export const getTutorialsManagementList = (params) => {
  return axios.request({
    url: '/sw/tutorials/lists',
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

export const getTutorialsInfo = (params) => {
  return axios.request({
    url: '/sw/tutorials/info',
    params: params,
    method: 'get'
  })
}
export const addTutorials = (params) => {
  return axios.request({
    url: '/sw/tutorials/add',
    data: params,
    method: 'post'
  })
}
export const updateTutorials = (params) => {
  return axios.request({
    url: '/sw/tutorials/edit',
    data: params,
    method: 'post'
  })
}
export const statusTutorials = (params) => {
  return axios.request({
    url: '/sw/tutorials/status',
    data: params,
    method: 'post'
  })
}
