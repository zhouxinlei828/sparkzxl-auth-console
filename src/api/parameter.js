import request from '@/utils/request'

const api = {
  parameterList: '/auth/base/parameter/page',
  saveParameter: '/auth/base/parameter/save',
  updateParameter: '/auth/base/parameter/update',
  deleteParameter: '/auth/base/parameter/delete',
  getSysParameterByCode: '/auth/base/parameter/getByCode',
}

export default api

export function getParameterList(data) {
  return request({
    url: api.parameterList,
    method: 'post',
    data: data,
  })
}

export function saveParameter(data) {
  return request({
    url: api.saveParameter,
    method: 'post',
    data: data,
  })
}

export function updateParameter(data) {
  return request({
    url: api.updateParameter,
    method: 'put',
    data: data,
  })
}

export function deleteParameter(data) {
  return request({
    url: api.deleteParameter,
    method: 'delete',
    data: data,
  })
}

export function getParameter(data) {
  return request({
    url: api.getSysParameterByCode,
    method: 'get',
    params: data,
  })
}
