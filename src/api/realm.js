import request from '@/utils/request'

const api = {
  realmPageList: '/auth/realm/pool/page',
  saveRealm: '/auth/realm/pool/save',
  updateRealm: '/auth/realm/pool/update',
  deleteRealm: '/auth/realm/pool/delete',
}
export function getRealmPageList(parameter) {
  return request({
    url: api.realmPageList,
    method: 'post',
    data: parameter,
  })
}

export function saveRealm(parameter) {
  return request({
    url: api.saveRealm,
    method: 'post',
    data: parameter,
  })
}

export function updateRealm(parameter) {
  return request({
    url: api.updateRealm,
    method: 'put',
    data: parameter,
  })
}

export function deleteRealm(parameter) {
  return request({
    url: api.deleteRealm,
    method: 'delete',
    data: parameter,
  })
}
