import HttpRequest from '@/libs/axios'
import config from '@/config'

var thisurl = window.location.hostname;
const baseUrl = config.baseUrl.dev
if(thisurl === 'shanwo.cc'){
  const baseUrl = config.baseUrl.pro
}
const axios = new HttpRequest(baseUrl)
export default axios
