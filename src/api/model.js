import request from '@/utils/request'

const api = {
  modelList: '/workflow/modeler/page',
  createModel: '/workflow/modeler/save',
  deleteModel: '/workflow/modeler/delete',
  publishProcess: '/workflow/modeler/publish',
  revokePublish: '/workflow/modeler/backout',
  processDetailList: '/workflow/process/detail/list',
  processAction: '/workflow/process/rule/action',
  saveProcessTaskRule: '/workflow/process/rule/save',
  getProcessTaskRule: '/workflow/process/rule/get',
  deleteProcessTaskRule: '/workflow/process/rule/delete',
}

export default api

export function getModelList(parameter) {
  return request({
    url: api.modelList,
    method: 'get',
    params: parameter,
  })
}

export function createModel(parameter) {
  return request({
    url: api.createModel,
    method: 'post',
    data: parameter,
  })
}

export function deleteModel(parameter) {
  return request({
    url: api.deleteModel,
    method: 'delete',
    data: parameter,
  })
}

export function publishProcess(parameter) {
  return request({
    url: api.publishProcess,
    method: 'patch',
    params: parameter,
  })
}

export function revokePublish(parameter) {
  return request({
    url: api.revokePublish,
    method: 'delete',
    params: parameter,
  })
}

export function getProcessDetailList(parameter) {
  return request({
    url: api.processDetailList,
    method: 'get',
    params: parameter,
  })
}

export function getProcessAction() {
  return request({
    url: api.processAction,
    method: 'get',
  })
}

export function saveProcessTaskRule(parameter) {
  return request({
    url: api.saveProcessTaskRule,
    method: 'post',
    data: parameter,
  })
}

export function getProcessTaskRule(parameter) {
  return request({
    url: api.getProcessTaskRule,
    method: 'get',
    params: parameter,
  })
}

export function deleteProcessTaskRule(parameter) {
  return request({
    url: api.deleteProcessTaskRule,
    method: 'delete',
    params: parameter,
  })
}
