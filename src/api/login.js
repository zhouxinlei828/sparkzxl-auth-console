import request from '@/utils/request'

const userApi = {
  Login: '/auth/sso/token',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  getCaptcha: '/auth/oauth/captcha',
  authorizeCodeBack: '/auth/oauth/callBack',
  SendSmsErr: '/account/sms_err',
  userInfo: '/auth/user/userinfo',
  logout: '/auth/customLogout',
  authorizeUrl: '/auth/oauth/getAuthorizeUrl',
  userRouters: '/auth/user/routers',
}

export function login(parameter) {
  const data = { ...parameter }
  data.grantType = 'password'
  return request({
    url: userApi.Login,
    method: 'post',
    data: data,
  })
}

export function refreshToken() {
  return request({
    url: userApi.logout,
    method: 'get',
  })
}

export function logout() {
  return request({
    url: userApi.logout,
    method: 'get',
  })
}

export function userInfo() {
  return request({
    url: userApi.userInfo,
    method: 'get',
  })
}

export function getAuthorizeUrl(parameter) {
  return request({
    url: userApi.authorizeUrl,
    method: 'get',
    params: parameter,
  })
}

export function serRouters() {
  return request({
    url: userApi.userRouters,
    method: 'get',
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function getCaptcha(parameter) {
  return request({
    url: userApi.getCaptcha,
    method: 'get',
    params: parameter,
  })
}

export function authorizeCodeBack(parameter) {
  return request({
    url: userApi.authorizeCodeBack,
    method: 'get',
    params: parameter,
  })
}
