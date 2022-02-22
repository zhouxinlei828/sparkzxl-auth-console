import Vue from 'vue'
import axios from 'axios'
import {
  contentType,
  debounce,
  tokenExpiredCode,
  noAuthorizedCode,
  jwtValidCode,
  noForbiddenCode,
  requestTimeout,
  successCode,
  tokenHeaderKey,
  loginInterception,
} from '@/config'
import store from '@/store'
import qs from 'qs'
import { getAccessToken } from '@/utils/storageUtils'
import { isArray } from '@/utils/validate'
import { getTenant } from './storageUtils'

let loadingInstance

const handleCode = (code, msg) => {
  switch (code) {
    case tokenExpiredCode:
      Vue.prototype.$baseNotify(msg, '错误', 'error')
      store.dispatch('user/resetAccessToken').catch(() => {})
      if (loginInterception) {
        location.reload()
      }
      break
    case noAuthorizedCode:
      store.dispatch('user/resetAccessToken').catch(() => {})
      if (loginInterception) {
        location.reload()
      }
      break
    case noForbiddenCode:
      Vue.prototype.$baseNotify(msg, '错误', 'error')
      break
    case jwtValidCode:
      Vue.prototype.$baseNotify(msg, '错误', 'error')
      store.dispatch('user/resetAccessToken').catch(() => {})
      if (loginInterception) {
        location.reload()
      }
      break
    default:
      Vue.prototype.$baseNotify(msg || `后端接口${code}异常`, '错误', 'error')
      break
  }
}

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken()
    if (
      accessToken !== undefined &&
      accessToken !== null &&
      accessToken !== ''
    ) {
      const token = 'Bearer '.concat(accessToken)
      if (config.url === '/auth/logout') {
        config.headers['token'] = token
      } else {
        config.headers[tokenHeaderKey] = token
      }
    }
    const tenantHeader = config.headers['tenantId']
    if (tenantHeader === undefined || tenantHeader === '') {
      const tenantId = getTenant()
      if (tenantId !== null && tenantId !== undefined) {
        config.headers['tenantId'] = tenantId
      }
    }
    //这里会过滤所有为空、0、false的key，如果不需要请自行注释
    if (config.data)
      config.data = Vue.prototype.$baseLodash.pickBy(
        config.data,
        Vue.prototype.$baseLodash.identity
      )
    if (
      config.data &&
      config.headers['Content-Type'] ===
        'application/x-www-form-urlencoded;charset=UTF-8'
    ) {
      config.data = qs.stringify(config.data)
    }

    if (debounce.some((item) => config.url.includes(item)))
      loadingInstance = Vue.prototype.$baseLoading()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (loadingInstance) loadingInstance.close()
    const contentType = response.headers['content-type']
    const contentTypeList = [
      'application/json; charset=UTF-8',
      'application/json',
      'application/json;charset=UTF-8',
    ]
    if (contentTypeList.includes(contentType)) {
      const { data, config } = response
      const { code, msg } = data
      // 操作正常Code数组
      const codeVerificationArray = isArray(successCode)
        ? [...successCode]
        : [...[successCode]]
      // 是否操作正常
      debugger
      if (codeVerificationArray.includes(code)) {
        return data
      } else {
        handleCode(code, msg)
        return Promise.reject(
          'vue-admin-beautiful请求异常拦截:' +
            JSON.stringify({ url: config.url, code, msg }) || 'Error'
        )
      }
    }
    return response
  },
  (error) => {
    if (loadingInstance) loadingInstance.close()
    let { response, message } = error
    if (error.response && error.response.data) {
      const { data } = response
      handleCode(data.code, data.msg || message)
      return Promise.reject(error)
    } else {
      let { message } = error
      if (message === 'Network Error') {
        message = '后端接口连接异常'
      }
      if (message.includes('timeout')) {
        message = '后端接口请求超时'
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3)
        message = '后端接口' + code + '异常'
      }
      Vue.prototype.$baseMessage(message || `后端接口未知异常`, 'error')
      return Promise.reject(error)
    }
  }
)

export default instance
