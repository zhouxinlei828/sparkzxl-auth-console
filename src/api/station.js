import request from '@/utils/request'

const api = {
  stationList: '/authorization/station/list',
  stationPageList: '/authorization/station/page',
  saveStation: '/authorization/station/save',
  updateStation: '/authorization/station/update',
  deleteStation: '/authorization/station/delete',
  importStationData: '/authorization/station/import',
  exportStationData: '/authorization/station/export',
}

export default api

export function getStationList(parameter) {
  return request({
    url: api.stationList,
    method: 'post',
    data: parameter,
  })
}

export function getStationPageList(parameter) {
  return request({
    url: api.stationPageList,
    method: 'post',
    data: parameter,
  })
}

export function saveStation(parameter) {
  return request({
    url: api.saveStation,
    method: 'post',
    data: parameter,
  })
}

export function updateStation(parameter) {
  return request({
    url: api.updateStation,
    method: 'put',
    data: parameter,
  })
}

export function deleteStation(parameter) {
  return request({
    url: api.deleteStation,
    method: 'delete',
    data: parameter,
  })
}

export function importStationData(parameter) {
  return request({
    url: api.importStationData,
    method: 'post',
    data: parameter,
  })
}

export function exportStationExcelData(parameter) {
  return request({
    url: api.exportStationData,
    method: 'post',
    responseType: 'blob',
    data: parameter,
  })
}
