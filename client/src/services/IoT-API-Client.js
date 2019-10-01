import axios from 'axios'
import config from '@/config'

export default {
  init () {
    let api = axios.create({
      baseURL: config.baseURL
    })
    return api.get('init')
  },
  publish (params) {
    let api = axios.create({
      baseURL: config.baseURL
    })
    return api.get('publish', { params: params })
  }
}
