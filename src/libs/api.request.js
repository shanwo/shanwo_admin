import HttpRequest from '@/libs/axios'
import config from '@/config'

var axios = new HttpRequest(config.baseUrl.dev)
if (window.location.hostname === 'shanwo.cc') {
  axios = new HttpRequest(config.baseUrl.pro)
}
export default axios
