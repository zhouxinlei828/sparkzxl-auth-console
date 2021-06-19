import request from '@/utils/request'

const api = {
  tenantPageList: '/auth/tenant/pool/page',
  saveTenant: '/auth/tenant/pool/save',
  updateTenant: '/auth/tenant/pool/update',
  deleteTenant: '/auth/tenant/pool/delete',
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
