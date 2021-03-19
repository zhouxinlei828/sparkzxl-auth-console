import request from '@/utils/request'

const api = {
  dictionaryItemList: '/authorization/common/dictionaryItem/list',
  dictionaryPage: '/authorization/common/dictionary/page',
  dictionaryItemPage: '/authorization/common/dictionaryItem/page',
  saveDictionary: '/authorization/common/dictionary/save',
  updateDictionary: '/authorization/common/dictionary/update',
  deleteDictionary: '/authorization/common/dictionary/delete',
  saveDictionaryItem: '/authorization/common/dictionaryItem/save',
  updateDictionaryItem: '/authorization/common/dictionaryItem/update',
  deleteDictionaryItem: '/authorization/common/dictionaryItem/delete',
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
