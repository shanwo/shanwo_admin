import axios from 'axios'
import Vue from 'vue'
import { getToken } from '@/libs/util'
console.log('12')
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors (instance, url) {
    console.log('url', url)
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      // console.log("twourl",url)
      let arr = ['/hy/upload/report']
      if (arr.includes(url)) {
        return { data: data, status }
      } else if (data.code === 200) {
        return { data: data.data, msg:data.msg,status }
      } else if (data.code === 300) {
        localStorage.clear()
        window.location.href = '/'
      } else if (data.code === 400) {
        let arr = ['/hy/upload/report']
        if (arr.includes(url)) {
          return { data: data, status }
        } else {
          Vue.prototype.$Message.error(data.msg)
        }
      } else {
        Vue.prototype.$Message.error(data.msg)
        return Promise.reject(data)
      }
    }, error => {
      Vue.prototype.$Message.error('服务器开小差了，请尝试刷新')
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      // addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    let token = getToken()
    if (token) {
      options.headers.Authorization = `Bearer ${token}`
    }
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
