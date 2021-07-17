import request from '@/utils/request'

const api = {
  roleList: '/workflow/process/role/page',
  saveRole: '/workflow/process/role/save',
  updateRole: '/workflow/process/role/update',
  deleteRole: '/workflow/process/role/delete',
  roleUserList: '/workflow/process/role/user/list',
  saveAuthRoleUser: '/workflow/process/role/user/save',
}

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
