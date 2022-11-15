import axios from '@/libs/api.request'

export const getAjaxBaseSecret = (params) => {
  return axios.request({
    url: '/upload/secret',
    params: params,
    method: 'get'
  })
}
