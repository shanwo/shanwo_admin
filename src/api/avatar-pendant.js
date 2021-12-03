import axios from '@/libs/api.request'

export const getAvatarPendantList = (params) => {
  return axios.request({
    url: '/decoration/lists',
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

export const getDecorationInfo = (params) => {
  return axios.request({
    url: '/decoration/info',
    params: params,
    method: 'get'
  })
}
export const addDecoration = (params) => {
  return axios.request({
    url: '/decoration/add',
    data: params,
    method: 'post'
  })
}
export const updateDecoration = (params) => {
  return axios.request({
    url: '/decoration/edit',
    data: params,
    method: 'post'
  })
}
export const deleteDecoration = (params) => {
  return axios.request({
    url: '/decoration/del',
    data: params,
    method: 'post'
  })
}
