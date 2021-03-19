import { isUrl } from '@/utils/util'

export function buildRouterJson(routeData, parent) {
  return routeData.map((item) => {
    const { label, redirect, component, componentName, icon, noKeepAlive } =
      item || {}
    const currentRouter = {
      // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
      path: item.path || `${(parent && parent.path) || ''}/${item.key}`,
      name: componentName,
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: label,
        noKeepAlive: noKeepAlive,
      },
    }
    if (label !== undefined && label !== '') {
      currentRouter.meta.title = label
      currentRouter.name = label
    } else if (item.name !== undefined) {
      currentRouter.meta.title = item.name
      currentRouter.name = item.name
    }
    if (icon !== null && icon !== '') {
      currentRouter.meta.icon = icon
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    if (isUrl(currentRouter.path)) {
      currentRouter.meta.target = '_blank'
    }
    currentRouter.component = component
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      currentRouter.children = buildRouterJson(item.children, currentRouter)
      currentRouter.alwaysShow = true
      currentRouter.redirect = redirect !== null ? item.redirect : 'noRedirect'
    }
    return currentRouter
  })
}

export function convertRouter(asyncRoutes) {
  return asyncRoutes.map((route) => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = (resolve) => require(['@/layouts'], resolve)
      } else if (route.component === 'EmptyLayout') {
        route.component = (resolve) =>
          require(['@/layouts/EmptyLayout'], resolve)
      } else {
        const index = route.component.indexOf('views')
        const path =
          index > 0 ? route.component.slice(index) : `views/${route.component}`
        route.component = (resolve) => require([`@/${path}`], resolve)
      }
    }
    if (route.children && route.children.length)
      route.children = convertRouter(route.children)
    if (route.children && route.children.length === 0) delete route.children
    return route
  })
}

function hasPermission(permissions, route) {
  if (route.meta && route.meta.permissions) {
    return permissions.some((role) => route.meta.permissions.includes(role))
  } else {
    return true
  }
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description intelligence模式根据permissions数组拦截路由
 * @param routes
 * @param permissions
 * @returns {[]}
 */
export function filterAsyncRoutes(routes, permissions) {
  const finallyRoutes = []
  routes.forEach((route) => {
    const item = { ...route }
    if (hasPermission(permissions, item)) {
      if (item.children) {
        item.children = filterAsyncRoutes(item.children, permissions)
      }
      finallyRoutes.push(item)
    }
  })
  return finallyRoutes
}
