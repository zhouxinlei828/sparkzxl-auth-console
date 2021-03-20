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
  setRealm,
  getRealm,
  getTokenType,
  getRealmStatus,
  setRealmStatus,
} from '@/utils/storageUtils'
import { resetRouter } from '@/router'
import { title } from '@/config'
import { timeFix } from '@/utils/util'

const state = () => ({
  tokenType: getTokenType(),
  accessToken: getAccessToken(),
  realm: getRealm(),
  realmStatus: getRealmStatus(),
  username: '',
  avatar: '',
  roles: [],
  permissions: [],
})
const getters = {
  tokenType: (state) => state.tokenType,
  accessToken: (state) => state.accessToken,
  realm: (state) => state.realm,
  realmStatus: (state) => state.realmStatus,
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
  setRealm(state, realm) {
    state.realm = realm
    if (realm !== null) {
      setRealm(realm)
    }
  },
  setRealmStatus(state, realmStatus) {
    state.realmStatus = realmStatus
    setRealmStatus(realmStatus)
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
    const accessToken = data['accessToken']
    const refreshToken = data['refreshToken']
    const tokenType = data['tokenType']
    const realm = data['realm']
    const realmStatus = data['realmStatus']
    if (accessToken) {
      commit('setAccessToken', accessToken)
      setRefreshToken(refreshToken)
      commit('setTokenType', tokenType)
      commit('setRealm', realm)
      commit('setRealmStatus', realmStatus)
      return {
        loginStatus: true,
        realmStatus: realmStatus,
      }
    } else {
      Vue.prototype.$baseMessage(`登录接口异常，未正确返回token...`, 'error')
      return {
        loginStatus: false,
      }
    }
  },
  async authLogin({ commit }, tokenData) {
    const accessToken = tokenData['accessToken']
    const refreshToken = tokenData['refreshToken']
    const tokenType = tokenData['tokenType']
    const realm = tokenData['realm']
    if (accessToken) {
      commit('setAccessToken', accessToken)
      setRefreshToken(refreshToken)
      commit('setTokenType', tokenType)
      commit('setRealm', realm)
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
    await dispatch('resetAccessToken')
    await resetRouter()
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
    const realm = responseData['realm']
    if (accessToken) {
      commit('setAccessToken', accessToken)
      setRefreshToken(refreshToken)
      commit('setTokenType', tokenType)
      commit('setRealm', realm)
      return true
    }
    return false
  },
}
export default { state, getters, mutations, actions }
