import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import { toLogin } from '@/api/admin'
import { getToken, setTitle, urlQuery } from '@/libs/util'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const userToLogin = () => {
  toLogin().then(res => {
    if (res.data) {
      console.log(res.data)
      window.location.href = res.data.redirect_url
    }
  })
}
Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.name === 'index') {
    next()
  } else {
    if (!getToken()) {
      //! 需要处理token失效的情况清除token
      let query = urlQuery(window.location.search)
      if (query.code && query.state) {
        // 换取token
        store.dispatch('userInfo', query).then(res => {
          next({ path: '/home' })
        }).catch(res => {
          userToLogin()
        })
      } else {
        userToLogin()
      }
    } else {
      next()
    }
  }
})
router.afterEach(to => {
  setTitle(to, router.app)
  window.scrollTo(0, 0)
})

export default router
