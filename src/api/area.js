import request from '@/utils/request'

const api = {
  areaTree: '/authorization/common/area/tree',
  saveArea: '/authorization/common/area/save',
  updateArea: '/authorization/common/area/update',
  deleteArea: '/authorization/common/area/delete',
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
