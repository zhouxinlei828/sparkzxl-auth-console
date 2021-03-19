import request from '@/utils/request'

const userApi = {
  Login: '/authorization/oauth/token',
  Logout: '/authorization/logout',
  ForgePassword: '/authorization/forge-password',
  Register: '/authorization/register',
  getCaptcha: '/authorization/oauth/captcha',
  authorizeCodeBack: '/authorization/oauth/callBack',
  SendSmsErr: '/account/sms_err',
  userInfo: '/authorization/user/userinfo',
  logout: '/authorization/customLogout',
  authorizeUrl: '/authorization/oauth/getAuthorizeUrl',
  userRouters: '/authorization/user/routers',
}

export function login(parameter) {
  const data = { ...parameter }
  data.grantType = 'password'
  data.scope = 'all'
  delete data.tenant
  return request({
    url: userApi.Login,
    method: 'post',
    data: data,
    headers: {
      Authorization: 'Basic c3Bhcmt6eGw6MTIzNDU2',
      'Content-Type': 'application/json',
    },
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
