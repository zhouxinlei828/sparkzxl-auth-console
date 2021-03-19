import { storage, tokenKeyName, tokenTypeKeyName } from '@/config'

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

export function setTokenType(tokenType) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem(tokenTypeKeyName, tokenType)
    } else if ('sessionStorage' === storage) {
      return localStorage.setItem(tokenTypeKeyName, tokenType)
    } else {
      return localStorage.setItem(tokenTypeKeyName, tokenType)
    }
  } else {
    return localStorage.setItem(tokenTypeKeyName, tokenType)
  }
}

export function getTokenType() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem(tokenTypeKeyName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem(tokenTypeKeyName)
    } else {
      return localStorage.getItem(tokenTypeKeyName)
    }
  } else {
    return localStorage.getItem(tokenTypeKeyName)
  }
}

export function removeTokenType() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem(tokenTypeKeyName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else {
      return localStorage.removeItem(tokenTypeKeyName)
    }
  } else {
    return localStorage.removeItem(tokenTypeKeyName)
  }
}

export function setTenant(tenant) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem('tenant', tenant)
    } else if ('sessionStorage' === storage) {
      return localStorage.setItem('tenant', tenant)
    } else {
      return localStorage.setItem('tenant', tenant)
    }
  } else {
    return localStorage.setItem('tenant', tenant)
  }
}

export function getTenant() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem('tenant')
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem('tenant')
    } else {
      return localStorage.getItem('tenant')
    }
  } else {
    return localStorage.getItem('tenant')
  }
}

export function setRefreshToken(refreshToken) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem('refreshToken', refreshToken)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.setItem('refreshToken', refreshToken)
    } else {
      return localStorage.setItem('refreshToken', refreshToken)
    }
  } else {
    return localStorage.setItem('refreshToken', refreshToken)
  }
}

export function getRefreshToken() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem('refreshToken')
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem('refreshToken')
    } else {
      return localStorage.getItem('refreshToken')
    }
  } else {
    return localStorage.getItem('refreshToken')
  }
}

export function removeRefreshToken() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem('refreshToken')
    } else if ('sessionStorage' === storage) {
      return sessionStorage.removeItem('refreshToken')
    } else {
      return localStorage.removeItem('refreshToken')
    }
  } else {
    return localStorage.removeItem('refreshToken')
  }
}
