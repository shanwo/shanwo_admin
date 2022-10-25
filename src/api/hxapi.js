import axios from '@/libs/api.request'

export const ajaxBaseSecret = (params) => {
  var url = 'https://api.shanwo.cc/base/secret'
  if (process.env.NODE_ENV !== 'production') {
    url = '//api.shanwo.vip//base/secret'
  }
  return axios.request({
    url: url,
    params: params,
    method: 'get'
  })
}
