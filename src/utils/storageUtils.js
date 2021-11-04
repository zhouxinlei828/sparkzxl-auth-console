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

export function setTenant(tenantId) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem('tenantId', tenantId)
    } else if ('sessionStorage' === storage) {
      return localStorage.setItem('tenantId', tenantId)
    } else {
      return localStorage.setItem('tenantId', tenantId)
    }
  } else {
    return localStorage.setItem('tenantId', tenantId)
  }
}

export function getTenant() {
  let tenantId
  if (storage) {
    if ('localStorage' === storage) {
      tenantId = localStorage.getItem('tenantId')
    } else if ('sessionStorage' === storage) {
      tenantId = sessionStorage.getItem('tenantId')
    } else {
      tenantId = localStorage.getItem('tenantId')
    }
  } else {
    tenantId = localStorage.getItem('tenantId')
  }
  return tenantId
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
