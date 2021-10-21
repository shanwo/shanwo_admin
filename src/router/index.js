import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { toLogin } from '@/api/user'
import { setToken, getToken, canTurnTo, setTitle, urlQuery } from '@/libs/util'
import config from '@/config'
const { homeName } = config
const userToLogin = () => {
  toLogin().then(res => {
    if (res.data) {
      window.location.href = res.data.redirect_url;
    }
  })
}
Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'
const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token) {
    //! 需要处理token失效的情况清除token
    let query = urlQuery(window.location.search)
    if (query.code && query.state) {
      // 换取token
      store.dispatch('getUserInfo', query).then(res => {
        next({path: '/home'})
      }).catch(res => {
        userToLogin();
      })

    } else {
      userToLogin()
    }
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    next()
  }
})
router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
