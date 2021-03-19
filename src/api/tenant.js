import request from '@/utils/request'

const api = {
  tenantPageList: '/authorization/tenant/page',
  saveTenant: '/authorization/tenant/save',
  updateTenant: '/authorization/tenant/update',
  deleteTenant: '/authorization/tenant/delete',
}
export function getTenantPageList(parameter) {
  return request({
    url: api.tenantPageList,
    method: 'post',
    data: parameter,
  })
}

export function saveTenant(parameter) {
  return request({
    url: api.saveTenant,
    method: 'post',
    data: parameter,
  })
}

export function updateTenant(parameter) {
  return request({
    url: api.updateTenant,
    method: 'put',
    data: parameter,
  })
}

export function deleteTenant(parameter) {
  return request({
    url: api.deleteTenant,
    method: 'delete',
    data: parameter,
  })
}
