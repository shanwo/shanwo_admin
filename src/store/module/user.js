import { setUserInfo, getUserInfo, removeUserInfo } from '@/libs/util'

export default {
  state: {
    userName: getUserInfo().nickname,
    userId: getUserInfo().id,
    avatarImgPath: getUserInfo().avatar,
    token: getUserInfo().api_token,
    access: '',
    userInfo: getUserInfo()
  },
  mutations: {
    setUserInfo (status) {
      setUserInfo(status)
    },
    removeUserInfo () {
      removeUserInfo()
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }) {
      return new Promise((resolve, reject) => {
        login().then(res => {
          const data = res.data
          commit('setUserInfo', data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut () {
      return new Promise(() => {
        commit('removeUserInfo')
        resolve()
      })
    }
  }
}
