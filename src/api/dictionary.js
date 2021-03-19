import request from '@/utils/request'

const api = {
  dictionaryItemList: '/auth/common/dictionaryItem/list',
  dictionaryPage: '/auth/common/dictionary/page',
  dictionaryItemPage: '/auth/common/dictionaryItem/page',
  saveDictionary: '/auth/common/dictionary/save',
  updateDictionary: '/auth/common/dictionary/update',
  deleteDictionary: '/auth/common/dictionary/delete',
  saveDictionaryItem: '/auth/common/dictionaryItem/save',
  updateDictionaryItem: '/auth/common/dictionaryItem/update',
  deleteDictionaryItem: '/auth/common/dictionaryItem/delete',
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
    url: api.deleteDictionary.concat('?ids[]=').concat(parameter),
    method: 'delete',
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
    url: api.deleteDictionaryItem.concat('?ids[]=').concat(parameter),
    method: 'delete',
  })
}
