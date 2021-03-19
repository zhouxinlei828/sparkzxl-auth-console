/**
 * @author zhouxinlei
 * @description 路由拦截状态管理
 */
import { asyncRoutes, constantRoutes } from '@/router'
import { serRouters } from '@/api/login'
import {
  convertRouter,
  buildRouterJson,
  filterAsyncRoutes,
} from '@/utils/handleRoutes'

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
const rootRouter = {
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
    let { data } = await serRouters()
    const routeData = []
    routeData.push(rootRouter)
    const routJsonData = buildRouterJson(data)
    routJsonData.forEach((routeJson) => {
      routeData.push(routeJson)
    })
    routeData.push({ path: '*', redirect: '/404', hidden: true })
    let accessRoutes = convertRouter(routeData)
    commit('setAllRoutes', accessRoutes)
    return accessRoutes
  },
  setPartialRoutes({ commit }, accessRoutes) {
    commit('setPartialRoutes', accessRoutes)
    return accessRoutes
  },
}
export default { state, getters, mutations, actions }
