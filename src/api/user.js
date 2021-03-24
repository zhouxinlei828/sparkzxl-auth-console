import request from '@/utils/request'

const api = {
  userPage: '/auth/user/page',
  userList: '/auth/user/list',
  exportExcelUser: '/auth/user/export',
  saveUser: '/auth/user/save',
  updateUser: '/auth/user/update',
  deleteUser: '/auth/user/delete',
  importUserData: '/auth/user/importUserData',
}

export default api

export function getUserPage(parameter) {
  return request({
    url: api.userPage,
    method: 'post',
    data: parameter,
  })
}

export function getUserList(parameter) {
  return request({
    url: api.userList,
    method: 'post',
    data: parameter,
  })
}

export function exportExcelUserData(parameter) {
  return request({
    url: api.exportExcelUser,
    method: 'post',
    responseType: 'blob',
    data: parameter,
  })
}

export function saveUser(parameter) {
  return request({
    url: api.saveUser,
    method: 'post',
    data: parameter,
  })
}

export function updateUser(parameter) {
  return request({
    url: api.updateUser,
    method: 'put',
    data: parameter,
  })
}

export function deleteUser(parameter) {
  return request({
    url: api.deleteUser,
    method: 'delete',
    data: parameter,
  })
}

export function importUserData(parameter) {
  return request({
    url: api.importUserData,
    method: 'post',
    data: parameter,
  })
}
