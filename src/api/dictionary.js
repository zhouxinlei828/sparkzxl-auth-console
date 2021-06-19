import request from '@/utils/request'

const api = {
  dictionaryItemList: '/auth/base/dictionaryItem/list',
  dictionaryPage: '/auth/base/dictionary/page',
  dictionaryItemPage: '/auth/base/dictionaryItem/page',
  saveDictionary: '/auth/base/dictionary/save',
  updateDictionary: '/auth/base/dictionary/update',
  deleteDictionary: '/auth/base/dictionary/delete',
  saveDictionaryItem: '/auth/base/dictionaryItem/save',
  updateDictionaryItem: '/auth/base/dictionaryItem/update',
  deleteDictionaryItem: '/auth/base/dictionaryItem/delete',
}

export function getDictionaryItemList(parameter) {
  return request({
    url: api.dictionaryItemList,
    method: 'post',
    data: parameter,
  })
}

export function getDictionaryPage(parameter) {
  return request({
    url: api.dictionaryPage,
    method: 'post',
    data: parameter,
  })
}

export function getDictionaryItemPage(parameter) {
  return request({
    url: api.dictionaryItemPage,
    method: 'post',
    data: parameter,
  })
}

export function saveDictionary(parameter) {
  return request({
    url: api.saveDictionary,
    method: 'post',
    data: parameter,
  })
}

export function updateDictionary(parameter) {
  return request({
    url: api.updateDictionary,
    method: 'put',
    data: parameter,
  })
}

export function deleteDictionary(parameter) {
  return request({
    url: api.deleteDictionary,
    method: 'delete',
    data: parameter,
  })
}

export function saveDictionaryItem(parameter) {
  return request({
    url: api.saveDictionaryItem,
    method: 'post',
    data: parameter,
  })
}

export function updateDictionaryItem(parameter) {
  return request({
    url: api.updateDictionaryItem,
    method: 'put',
    data: parameter,
  })
}

export function deleteDictionaryItem(parameter) {
  return request({
    url: api.deleteDictionaryItem,
    method: 'delete',
    data: parameter,
  })
}
