import axios from '@/libs/api.request'

export const ajaxBaseSecret = (params) => {
  return axios.request({
    url: '/base/upload/secret',
    params: params,
    method: 'get'
  })
}
