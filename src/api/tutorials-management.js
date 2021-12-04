import axios from '@/libs/api.request'

export const getTutorialsManagementList = (params) => {
  return axios.request({
    url: '/tutorials/lists',
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

export const getTutorialsInfo = (params) => {
  return axios.request({
    url: '/tutorials/info',
    params: params,
    method: 'get'
  })
}
export const addTutorials = (params) => {
  return axios.request({
    url: '/tutorials/add',
    data: params,
    method: 'post'
  })
}
export const updateTutorials = (params) => {
  return axios.request({
    url: '/tutorials/edit',
    data: params,
    method: 'post'
  })
}
export const deleteTutorials = (params) => {
  return axios.request({
    url: '/tutorials/del',
    data: params,
    method: 'post'
  })
}
