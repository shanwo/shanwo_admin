import HttpRequest from '@/libs/axios'
import config from '@/config'

var axios = new HttpRequest(config.baseUrl.dev)
if (window.location.hostname === 'chillman.cc') {
  axios = new HttpRequest(config.baseUrl.pro)
}
export default axios
