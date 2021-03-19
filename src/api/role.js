import request from '@/utils/request'

const api = {
  roleList: '/authorization/role/page',
  saveRole: '/authorization/role/save',
  updateRole: '/authorization/role/update',
  deleteRole: '/authorization/role/delete',
  roleUserList: '/authorization/role/user/list',
  saveAuthRoleUser: '/authorization/role/user/save',
  getResourceList: '/authorization/resource/list',
  getRoleResource: '/authorization/role/resource',
  saveRoleAuthority: '/authorization/role/authority/batch',
  refreshAuthority: '/authorization/role/authority/refresh',
}

export default api

export function getRoleList(parameter) {
  return request({
    url: api.roleList,
    method: 'post',
    data: parameter,
  })
}

export function saveRole(parameter) {
  return request({
    url: api.saveRole,
    method: 'post',
    data: parameter,
  })
}

export function updateRole(parameter) {
  return request({
    url: api.updateRole,
    method: 'put',
    data: parameter,
  })
}

export function deleteRole(parameter) {
  return request({
    url: api.deleteRole,
    method: 'delete',
    data: parameter,
  })
}

export function roleUserList(parameter) {
  return request({
    url: api.roleUserList,
    method: 'get',
    params: parameter,
  })
}

export function saveAuthRoleUser(parameter) {
  return request({
    url: api.saveAuthRoleUser,
    method: 'post',
    data: parameter,
  })
}

export function getRoleResource(parameter) {
  return request({
    url: `${api.getRoleResource}?roleId=${parameter}`,
    method: 'get',
  })
}

export function getResourceList(parameter) {
  return request({
    url: api.getResourceList,
    method: 'post',
    data: parameter,
  })
}

export function saveRoleAuthority(parameter) {
  return request({
    url: api.saveRoleAuthority,
    method: 'post',
    data: parameter,
  })
}

export function refreshAuthority() {
  return request({
    url: api.refreshAuthority,
    method: 'get',
  })
}
