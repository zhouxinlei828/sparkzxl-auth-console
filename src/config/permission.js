import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/pageTitle'

import {
  loginInterception,
  progressBar,
  recordRoute,
  routesWhiteList,
} from '@/config'

import { getAccessToken } from '@/utils/storageUtils'

NProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
})
router.beforeResolve(async (to, from, next) => {
  if (progressBar) NProgress.start()
  let hasToken = getAccessToken()
  if (!loginInterception) hasToken = true
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      if (progressBar) NProgress.done()
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
            let accessRoutes = await store.dispatch('routes/setAllRoutes')
            router.addRoutes(accessRoutes)
            // 请求带有 redirect 重定向时，登录自动重定向到该地址
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          }
        } catch (e) {
          console.log(e)
          await store.dispatch('user/resetAccessToken')
          if (progressBar) NProgress.done()
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
      if (progressBar) NProgress.done()
    }
  }
  document.title = getPageTitle(to.meta.title)
})
router.afterEach(() => {
  if (progressBar) NProgress.done()
})
