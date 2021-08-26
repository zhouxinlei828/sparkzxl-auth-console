import request from '@/utils/request'

const api = {
  applicationList: '/oauth/application/page',
  saveApplication: '/oauth/application/save',
  updateApplication: '/oauth/application/update',
  deleteApplication: '/oauth/application/delete',
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
