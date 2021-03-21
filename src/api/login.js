import request from '@/utils/request'

const userApi = {
  Login: '/auth/authentication/token',
  userRegister: '/auth/authentication/register',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  getCaptcha: '/auth/oauth/captcha',
  authorizeCodeBack: '/auth/oauth/callBack',
  userInfo: '/auth/user/userinfo',
  logout: '/auth/logout',
  authorizeUrl: '/auth/oauth/getAuthorizeUrl',
  userRouters: '/auth/user/routers',
}

export function login(parameter) {
  const data = { ...parameter }
  data.grantType = 'password'
  data.clientId = 'sparkzxl'
  return request({
    url: userApi.Login,
    method: 'post',
    data: data,
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

export function userRouters(parameter) {
  return request({
    url: userApi.userRouters,
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

export function userRegister(parameter) {
  return request({
    url: userApi.userRegister,
    method: 'post',
    data: parameter,
  })
}
