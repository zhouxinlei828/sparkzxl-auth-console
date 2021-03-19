import Vue from 'vue'
import { getAuthorizeUrl, userInfo, login, logout } from '@/api/login'
import {
  getAccessToken,
  removeAccessToken,
  setRefreshToken,
  removeRefreshToken,
  removeTokenType,
  setAccessToken,
  setTokenType,
  setTenant,
  getTenant,
  getTokenType,
} from '@/utils/accessToken'
import { resetRouter } from '@/router'
import { title } from '@/config'
import { timeFix } from '@/utils/util'

const state = () => ({
  tokenType: getTokenType(),
  accessToken: getAccessToken(),
  tenant: getTenant(),
  username: '',
  avatar: '',
  roles: [],
  permissions: [],
})
const getters = {
  tokenType: (state) => state.tokenType,
  accessToken: (state) => state.accessToken,
  tenant: (state) => state.tenant,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
  roles: (state) => state.roles,
}
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setTokenType(state, tokenType) {
    state.tokenType = tokenType
    setTokenType(tokenType)
  },
  setTenant(state, tenant) {
    state.tenant = tenant
    setTenant(tenant)
  },
  setUsername(state, username) {
    state.username = username
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}
const actions = {
  async login({ commit }, userInfo) {
    const { data } = await login(userInfo)
    const accessToken = data['access_token']
    const refreshToken = data['refresh_token']
    const tokenType = data['token_type']
    const tenant = data['tenant']
    if (accessToken) {
      commit('setAccessToken', accessToken)
      setRefreshToken(refreshToken)
      commit('setTokenType', tokenType)
      commit('setTenant', tenant)
      const thisTime = timeFix()
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      Vue.prototype.$baseMessage(`登录接口异常，未正确返回token...`, 'error')
    }
  },
  async authorizationLogin({ commit }, tokenData) {
    const accessToken = tokenData['accessToken']
    const refreshToken = tokenData['refreshToken']
    const tokenType = tokenData['tokenType']
    const tenant = tokenData['tenant']
    if (accessToken) {
      commit('setAccessToken', accessToken)
      setRefreshToken(refreshToken)
      commit('setTokenType', tokenType)
      commit('setTenant', tenant)
      const thisTime = timeFix()
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
      return true
    }
    return false
  },
  async getUserInfo({ commit }) {
    const { data } = await userInfo()
    if (!data) {
      Vue.prototype.$baseMessage('获取用户信息失败，请重新登录...', 'error')
      return false
    }
    let { name, avatar, roleBasicInfos } = data
    commit('SET_INFO', data)
    commit('setUsername', name)
    commit('setAvatar', avatar)
    commit('SET_ROLES', roleBasicInfos)
    return true
  },
  async logout({ dispatch }, frontUrl) {
    const response = await logout()
    const responseData = response.data
    if (responseData === true) {
      await dispatch('resetAccessToken')
      await resetRouter()
      let url = ''
      if (frontUrl !== undefined) {
        url = frontUrl
      }
      const { data } = await getAuthorizeUrl({ frontUrl: url })
      if (!data) {
        Vue.prototype.$baseMessage('获取授权登录地址，请重新获取...', 'error')
        return false
      } else {
      }
      window.location.href = data
    }
  },

  async resetAccessToken({ commit }) {
    commit('SET_INFO', '')
    commit('setUsername', '')
    commit('setAvatar', '')
    commit('SET_ROLES', '')
    commit('setAccessToken', '')
    removeAccessToken()
    removeTokenType()
    removeRefreshToken()
  },

  async refreshToken({ commit }) {
    const response = await refreshToken()
    const responseData = response.data
    const accessToken = responseData['access_token']
    const refreshToken = responseData['refresh_token']
    const tokenType = responseData['token_type']
    const tenant = responseData['tenant']
    if (accessToken) {
      commit('setAccessToken', accessToken)
      setRefreshToken(refreshToken)
      commit('setTokenType', tokenType)
      commit('setTenant', tenant)
      return true
    }
    return false
  },
}
export default { state, getters, mutations, actions }
