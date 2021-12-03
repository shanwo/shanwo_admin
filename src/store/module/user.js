import { setUser, removeUser } from '@/libs/util'
import { getUserToken } from '../../api/user'

export default {
  state: {
    userName: '',
    userId: 0,
    avatarImgPath: '',
    token: '',
    access: '',
    userInfo: {}
  },
  mutations: {
    setUserInfo (state, user) {
      state.userId = user.id
      state.userName = user.nickname
      state.avatarImgPath = user.avatar
      state.token = user.api_token
      state.userInfo = user
      setUser(user)
    }
  },
  actions: {
    // 获取用户相关信息
    userInfo ({ state, commit }, param) {
      return new Promise((resolve, reject) => {
        try {
          getUserToken(param).then(res => {
            const data = res.data
            commit('setUserInfo', data)
            resolve()
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 退出登录
    handleLogOut () {
      return new Promise((resolve) => {
        removeUser()
        resolve()
      })
    }
  }
}
