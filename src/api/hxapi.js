import axios from '@/libs/api.request'

export const ajaxBaseSecret = (params) => {
  return axios.request({
    url: '/upload/secret',
    params: params,
    method: 'get'
  })
}
