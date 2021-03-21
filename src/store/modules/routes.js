/**
 * @author zhouxinlei
 * @description 路由拦截状态管理
 */
import { asyncRoutes, constantRoutes } from '@/router'
import { userRouters } from '@/api/login'
import {
  convertRouter,
  buildRouterJson,
  filterAsyncRoutes,
} from '@/utils/handleRoutes'
import { getRealmInfo } from '@/utils/storageUtils'
const state = () => ({
  routes: [],
  partialRoutes: [],
})
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes,
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setAllRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes)
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = constantRoutes.concat(routes)
  },
}

const actions = {
  async setRoutes({ commit }, permissions) {
    const finallyAsyncRoutes = await filterAsyncRoutes(
      [...asyncRoutes],
      permissions
    )
    commit('setRoutes', finallyAsyncRoutes)
    return finallyAsyncRoutes
  },
  async setAllRoutes({ commit }) {
    let parameter = {}
    const realmInfo = getRealmInfo()
    if (realmInfo !== null && realmInfo.realm !== undefined) {
      if (
        realmInfo.realmStatus !== undefined &&
        realmInfo.realmStatus === true
      ) {
        parameter = {
          realmCode: realmInfo.realm,
        }
      }
    }
    let { data } = await userRouters(parameter)
    const routeData = []
    routeData.push({
      path: '/',
      component: 'Layout',
      redirect: 'index',
      children: [
        {
          path: 'index',
          name: 'Index',
          component: '@/views/index/index',
          meta: {
            title: '首页',
            icon: 'icon-home',
            affix: true,
            useVabIcon: true,
          },
        },
      ],
    })
    routeData.push({
      path: '/realm/pool',
      name: 'RealmPool',
      component: '@/views/realm/pool',
      meta: {
        title: '领域池控制台',
      },
      hidden: true,
    })
    const routJsonData = buildRouterJson(data)
    routJsonData.forEach((routeJson) => {
      routeData.push(routeJson)
    })
    routeData.push({ path: '*', redirect: '/404', hidden: true })
    let accessRoutes = convertRouter(routeData)
    commit('setAllRoutes', accessRoutes)
    return accessRoutes
  },
  async clearRoutes({ commit }) {
    commit('setAllRoutes', '')
  },
  setPartialRoutes({ commit }, accessRoutes) {
    commit('setPartialRoutes', accessRoutes)
    return accessRoutes
  },
}
export default { state, getters, mutations, actions }
