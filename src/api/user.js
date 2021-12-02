import axios from '@/libs/api.request'

export const toLogin = () => {
  var url = 'https://api.shanwo.cc/user/signIn'
  if (process.env.NODE_ENV !== 'production') {
    url = 'http://test.shanwo.cc/api/user/signIn'
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
    url = 'http://test.shanwo.cc/api/callback/wechat'
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
export const getUserInfo = (token) => {
  return axios.request({
    url: '/user/info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
