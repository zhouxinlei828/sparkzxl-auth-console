import request from '@/utils/request'

const api = {
  orgTree: '/authorization/org/tree',
  saveOrg: '/authorization/org/save',
  updateOrg: '/authorization/org/update',
  deleteOrg: '/authorization/org/org/batch',
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
