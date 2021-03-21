import { storage, tokenKeyName } from '@/config'

export function setAccessToken(accessToken) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem(tokenKeyName, accessToken)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.setItem(tokenKeyName, accessToken)
    } else {
      return localStorage.setItem(tokenKeyName, accessToken)
    }
  } else {
    return localStorage.setItem(tokenKeyName, accessToken)
  }
}

export function getAccessToken() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem(tokenKeyName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem(tokenKeyName)
    } else {
      return localStorage.getItem(tokenKeyName)
    }
  } else {
    return localStorage.getItem(tokenKeyName)
  }
}

export function removeAccessToken() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem(tokenKeyName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else {
      return localStorage.removeItem(tokenKeyName)
    }
  } else {
    return localStorage.removeItem(tokenKeyName)
  }
}

export function setRealmInfo(realmInfo) {
  const jsonStrInfo = JSON.stringify(realmInfo)
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem('realmInfo', jsonStrInfo)
    } else if ('sessionStorage' === storage) {
      return localStorage.setItem('realmInfo', jsonStrInfo)
    } else {
      return localStorage.setItem('realmInfo', jsonStrInfo)
    }
  } else {
    return localStorage.setItem('realmInfo', jsonStrInfo)
  }
}

export function getRealmInfo() {
  let jsonStrInfo
  if (storage) {
    if ('localStorage' === storage) {
      jsonStrInfo = localStorage.getItem('realmInfo')
    } else if ('sessionStorage' === storage) {
      jsonStrInfo = sessionStorage.getItem('realmInfo')
    } else {
      jsonStrInfo = localStorage.getItem('realmInfo')
    }
  } else {
    jsonStrInfo = localStorage.getItem('realmInfo')
  }
  if (jsonStrInfo !== null) {
    return JSON.parse(jsonStrInfo)
  }
  return null
}

export function removeRealmInfo() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem('realmInfo')
    } else if ('sessionStorage' === storage) {
      return sessionStorage.removeItem('realmInfo')
    } else {
      return localStorage.removeItem('realmInfo')
    }
  } else {
    return localStorage.removeItem('realmInfo')
  }
}

export function setUserInfo(userInfo) {
  const jsonStrInfo = JSON.stringify(userInfo)
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem('userInfo', jsonStrInfo)
    } else if ('sessionStorage' === storage) {
      return localStorage.setItem('userInfo', jsonStrInfo)
    } else {
      return localStorage.setItem('userInfo', jsonStrInfo)
    }
  } else {
    return localStorage.setItem('userInfo', jsonStrInfo)
  }
}

export function getUserInfo() {
  let jsonStrInfo
  if (storage) {
    if ('localStorage' === storage) {
      jsonStrInfo = localStorage.getItem('userInfo')
    } else if ('sessionStorage' === storage) {
      jsonStrInfo = sessionStorage.getItem('userInfo')
    } else {
      jsonStrInfo = localStorage.getItem('userInfo')
    }
  } else {
    jsonStrInfo = localStorage.getItem('userInfo')
  }
  if (jsonStrInfo !== null) {
    return JSON.parse(jsonStrInfo)
  }
  return null
}

export function removeUserInfo() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem('userInfo')
    } else if ('sessionStorage' === storage) {
      return sessionStorage.removeItem('userInfo')
    } else {
      return localStorage.removeItem('userInfo')
    }
  } else {
    return localStorage.removeItem('userInfo')
  }
}
