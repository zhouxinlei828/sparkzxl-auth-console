import router from '@/router'
import store from '@/store'
import VabProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/pageTitle'

import {
  loginInterception,
  progressBar,
  recordRoute,
  routesWhiteList,
} from '@/config'

import { getAccessToken } from '@/utils/accessToken'

VabProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
})
router.beforeResolve(async (to, from, next) => {
  if (progressBar) VabProgress.start()
  let hasToken = getAccessToken()
  if (!loginInterception) hasToken = true
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      if (progressBar) VabProgress.done()
    }
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      const hasRoles = store.getters['user/roles']
      if (hasRoles.length > 0) {
        next()
      } else {
        try {
          let userInfo = store.dispatch('user/getUserInfo')
          if (userInfo) {
            const parameter = to.query
            debugger
            let accessRoutes = await store.dispatch(
              'routes/setAllRoutes',
              parameter
            )
            console.log(accessRoutes)
            router.addRoutes(accessRoutes)
            debugger
            next({ ...to, replace: true })
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          }
        } catch {
          await store.dispatch('user/resetAccessToken')
          if (progressBar) VabProgress.done()
        }
      }
    }
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (recordRoute) {
        next(`/login?redirect=${to.path}`)
      } else {
        next('/login')
      }
      if (progressBar) VabProgress.done()
    }
  }
  document.title = getPageTitle(to.meta.title)
})
router.afterEach(() => {
  if (progressBar) VabProgress.done()
})
