import axios from '@/libs/api.request'

export const getUserFeedbackList = (params) => {
  return axios.request({
    url: '/feedback/lists',
    params: params,
    method: 'get'
  })
}

export const getFeedbackInfo = (params) => {
  return axios.request({
    url: '/feedback/info',
    params: params,
    method: 'get'
  })
}

export const uploadFeedbackInfo = (params) => {
  return axios.request({
    url: '/feedback/edit',
    data: params,
    method: 'post'
  })
}
