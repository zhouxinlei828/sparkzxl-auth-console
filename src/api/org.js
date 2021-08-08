import request from '@/utils/request'

const api = {
  orgTree: '/auth/org/tree',
  saveOrg: '/auth/org/save',
  updateOrg: '/auth/org/update',
  deleteOrg: '/auth/org/delete',
  saveOrgUser: '/auth/org/users',
}

export default api

export function getOrgList(parameter) {
  return request({
    url: api.orgTree,
    method: 'get',
    params: parameter,
  })
}

export function saveOrg(parameter) {
  return request({
    url: api.saveOrg,
    method: 'post',
    data: parameter,
  })
}

export function updateOrg(parameter) {
  return request({
    url: api.updateOrg,
    method: 'put',
    data: parameter,
  })
}
export function deleteOrg(parameter) {
  return request({
    url: api.deleteOrg,
    method: 'delete',
    data: parameter,
  })
}

export function saveOrgUser(parameter) {
  return request({
    url: api.saveOrgUser,
    method: 'post',
    data: parameter,
  })
}
