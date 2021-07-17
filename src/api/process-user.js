import request from '@/utils/request'

const api = {
  userPage: '/workflow/process/user/page',
  userList: '/workflow/process/user/list',
  exportExcelUser: '/workflow/process/user/export',
  saveUser: '/workflow/process/user/save',
  updateUser: '/workflow/process/user/update',
  deleteUser: '/workflow/process/user/delete',
}
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
