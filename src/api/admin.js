import axios from '@/libs/api.request'

export const toLogin = () => {
  var thisurl = window.location.hostname;
  var url = '//api.shanwo.vip/user/signIn'
  if(thisurl === 'shanwo.cc'){
    var url = 'https://api.shanwo.cc/user/signIn'
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
  var thisurl = window.location.hostname;
  var url = '//api.shanwo.vip/user/signOut'
  if(thisurl === 'shanwo.cc'){
    var url = 'https://api.shanwo.cc/user/signOut'
  }
  return axios.request({
    url,
    method: 'get'
  })
}
export const getUserToken = ({ code, state }) => {
  var thisurl = window.location.hostname;
  var url = '//api.shanwo.vip/user/wechat'
  if(thisurl === 'shanwo.cc'){
    var url = 'https://api.shanwo.cc/user/wechat'
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
export const getAreaList = (params) => {
  return axios.request({
    url: '/area/lists',
    params,
    method: 'get'
  })
}
