import axios from '@/libs/api.request'

export const toLogin = () => {
  var url = 'https://api.shanwo.cc/user/signIn'
  if (process.env.NODE_ENV !== 'production') {
    url = '//api.shanwo.vip/user/signIn'
  }
  return axios.request({
    url,
    params: {
      type: 'wechat'
    },
    method: 'get'
  })
}
export const toLogout = () => {
  var url = 'https://api.shanwo.cc/user/signOut'
  if (process.env.NODE_ENV !== 'production') {
    url = '//api.shanwo.vip/user/signOut'
  }
  return axios.request({
    url,
    method: 'get'
  })
}
export const getUserToken = ({ code, state }) => {
  var url = 'https://api.shanwo.cc/user/wechat'
  if (process.env.NODE_ENV !== 'production') {
    url = '//api.shanwo.vip/user/wechat'
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
