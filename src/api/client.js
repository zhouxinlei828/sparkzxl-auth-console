import request from '@/utils/request'

const api = {
  applicationList: '/authorization/application/page',
  saveApplication: '/authorization/application/save',
  updateApplication: '/authorization/application/update',
  deleteApplication: '/authorization/application/delete',
}
export function getApplicationPageList(parameter) {
  return request({
    url: api.applicationList,
    method: 'post',
    data: parameter,
  })
}

export function saveApplication(parameter) {
  return request({
    url: api.saveApplication,
    method: 'post',
    data: parameter,
  })
}

export function updateApplication(parameter) {
  return request({
    url: api.updateApplication,
    method: 'put',
    data: parameter,
  })
}

export function deleteApplication(parameter) {
  return request({
    url: api.deleteApplication,
    method: 'delete',
    data: parameter,
  })
}
