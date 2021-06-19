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

export function setTenantInfo(tenantInfo) {
  const jsonStrInfo = JSON.stringify(tenantInfo)
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem('tenantInfo', jsonStrInfo)
    } else if ('sessionStorage' === storage) {
      return localStorage.setItem('tenantInfo', jsonStrInfo)
    } else {
      return localStorage.setItem('tenantInfo', jsonStrInfo)
    }
  } else {
    return localStorage.setItem('tenantInfo', jsonStrInfo)
  }
}

export function getTenantInfo() {
  let jsonStrInfo
  if (storage) {
    if ('localStorage' === storage) {
      jsonStrInfo = localStorage.getItem('tenantInfo')
    } else if ('sessionStorage' === storage) {
      jsonStrInfo = sessionStorage.getItem('tenantInfo')
    } else {
      jsonStrInfo = localStorage.getItem('tenantInfo')
    }
  } else {
    jsonStrInfo = localStorage.getItem('tenantInfo')
  }
  if (jsonStrInfo !== null) {
    return JSON.parse(jsonStrInfo)
  }
  return null
}

export function removeTenantInfo() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem('tenantInfo')
    } else if ('sessionStorage' === storage) {
      return sessionStorage.removeItem('tenantInfo')
    } else {
      return localStorage.removeItem('tenantInfo')
    }
  } else {
    return localStorage.removeItem('tenantInfo')
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
