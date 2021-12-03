import axios from '@/libs/api.request'

export const toLogin = () => {
  var url = 'https://api.shanwo.cc/user/signIn'
  if (process.env.NODE_ENV !== 'production') {
    url = '//test.shanwo.cc/api/user/signIn'
  }
  return axios.request({
    url,
    params: {
      type: 'wechat'
    },
    method: 'get'
  })
}
export const getUserToken = ({ code, state }) => {
  var url = 'https://api.shanwo.cc/callback/wechat'
  if (process.env.NODE_ENV !== 'production') {
    url = '//test.shanwo.cc/api/callback/wechat'
  }
  return axios.request({
    url,
    params: {
      code: code,
      state: state
    },
    method: 'get'
  })
}
