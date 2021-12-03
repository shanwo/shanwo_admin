import axios from '@/libs/api.request'
export const updateIcon = () => {
  return axios.request({
    url: '/link/add',
    data: params,
    method: 'post'
  })
}
export const addIcon = () => {
  return axios.request({
    url: '/link/edit',
    data: params,
    method: 'post'
  })
}
