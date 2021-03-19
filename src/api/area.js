import request from '@/utils/request'

const api = {
  areaTree: '/auth/common/area/tree',
  saveArea: '/auth/common/area/save',
  updateArea: '/auth/common/area/update',
  deleteArea: '/auth/common/area/delete',
}

export function getAreaTree() {
  return request({
    url: api.areaTree,
    method: 'get',
  })
}

export function saveArea(parameter) {
  return request({
    url: api.saveArea,
    method: 'post',
    data: parameter,
  })
}

export function updateArea(parameter) {
  return request({
    url: api.updateArea,
    method: 'put',
    data: parameter,
  })
}

export function deleteArea(parameter) {
  return request({
    url: api.deleteArea.concat('?ids[]=').concat(parameter),
    method: 'delete',
  })
}
