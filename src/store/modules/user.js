import Vue from 'vue'
import { getAuthorizeUrl, userInfo, login, logout } from '@/api/login'
import {
  getAccessToken,
  removeAccessToken,
  removeTokenType,
  setAccessToken,
  setTokenType,
  setRealm,
  getRealm,
  getTokenType,
  getRealmStatus,
  setRealmStatus,
  removeRealm,
} from '@/utils/storageUtils'
import { resetRouter } from '@/router'
import { title } from '@/config'
import { timeFix } from '@/utils/util'

const state = () => ({
  username: '',
  avatar: '',
  roles: [],
  permissions: [],
  info: {},
})
const getters = {
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
  roles: (state) => state.roles,
  info: (state) => state.info,
}
const mutations = {
  setUsername(state, username) {
    state.username = username
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setRoles: (state, roles) => {
    state.roles = roles
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
  setInfo: (state, info) => {
    state.info = info
  },
}
const actions = {
  async login({ commit }, userInfo) {
    const { data } = await login(userInfo)
    const accessToken = data['accessToken']
    const tokenType = data['tokenType']
    const realm = data['realm']
    const realmStatus = data['realmStatus']
    if (accessToken) {
      setAccessToken(accessToken)
      setTokenType(tokenType)
      setRealmStatus(realmStatus)
      if (realm !== null) {
        setRealm(realm)
      }
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
    const tokenType = tokenData['tokenType']
    const realm = tokenData['realm']
    const realmStatus = data['realmStatus']
    if (accessToken) {
      setAccessToken(accessToken)
      setTokenType(tokenType)
      setRealmStatus(realmStatus)
      if (realm !== null) {
        setRealm(realm)
      }
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
    commit('setUsername', name)
    commit('setAvatar', avatar)
    commit('setRoles', roleBasicInfos)
    commit('setInfo', data)
    return true
  },
  async logout({ dispatch }) {
    await logout(state.accessToken)
    await dispatch('resetAccessToken')
    await resetRouter()
  },

  async resetAccessToken({ commit }) {
    commit('setUsername', '')
    commit('setAvatar', '')
    commit('setRoles', [])
    commit('setInfo', {})
    removeAccessToken()
    removeTokenType()
    removeRealm()
  },
  async clearUserInfo({ commit }) {
    commit('setUsername', '')
    commit('setAvatar', '')
    commit('setRoles', [])
    commit('setInfo', {})
  },
}
export default { state, getters, mutations, actions }
