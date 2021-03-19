import request from '@/utils/request'

const api = {
  menuTree: '/authorization/menu/tree',
  menuList: '/authorization/menu/list',
  menuResource: '/authorization/resource/list',
  saveMenu: '/authorization/menu/save',
  updateMenu: '/authorization/menu/update',
  deleteMenu: '/authorization/menu/delete',
  saveResource: '/authorization/resource/save',
  updateResource: '/authorization/resource/update',
  deleteResource: '/authorization/resource/delete',
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
    params: parameter,
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
