import axios from '@/libs/api.request'

export const getAvatarPendantList = (params) => {
  return axios.request({
    url: '/sw/decoration/lists',
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

export const getDecorationInfo = (params) => {
  return axios.request({
    url: '/sw/decoration/info',
    params: params,
    method: 'get'
  })
}
export const addDecoration = (params) => {
  return axios.request({
    url: '/sw/decoration/add',
    data: params,
    method: 'post'
  })
}
export const updateDecoration = (params) => {
  return axios.request({
    url: '/sw/decoration/edit',
    data: params,
    method: 'post'
  })
}
export const statusDecoration = (params) => {
  return axios.request({
    url: '/sw/decoration/status',
    data: params,
    method: 'post'
  })
}
