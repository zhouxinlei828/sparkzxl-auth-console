import request from '@/utils/request'

const api = {
  menuTree: '/auth/menu/tree',
  menuList: '/auth/menu/list',
  menuResource: '/auth/resource/list',
  saveMenu: '/auth/menu/save',
  updateMenu: '/auth/menu/update',
  deleteMenu: '/auth/menu/delete',
  saveResource: '/auth/resource/save',
  updateResource: '/auth/resource/update',
  deleteResource: '/auth/resource/delete',
}

export default api

export function getMenuTree(parameter) {
  return request({
    url: api.menuTree,
    method: 'get',
    params: parameter,
  })
}

export function getMenuList(parameter) {
  return request({
    url: api.menuList,
    method: 'post',
    data: parameter,
  })
}

export function getMenuResource(parameter) {
  return request({
    url: api.menuResource,
    method: 'post',
    data: parameter,
  })
}

export function saveMenu(parameter) {
  return request({
    url: api.saveMenu,
    method: 'post',
    data: parameter,
  })
}

export function updateMenu(parameter) {
  return request({
    url: api.updateMenu,
    method: 'put',
    data: parameter,
  })
}

export function deleteMenu(parameter) {
  return request({
    url: api.deleteMenu,
    method: 'delete',
    data: parameter,
  })
}

export function saveResource(parameter) {
  return request({
    url: api.saveResource,
    method: 'post',
    data: parameter,
  })
}

export function updateResource(parameter) {
  return request({
    url: api.updateResource,
    method: 'put',
    data: parameter,
  })
}

export function deleteResource(parameter) {
  return request({
    url: api.deleteResource,
    method: 'delete',
    data: parameter,
  })
}
