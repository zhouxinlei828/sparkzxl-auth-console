import request from '@/utils/request'

const userApi = {
  Login: '/oauth/authentication/token',
  userRegister: '/oauth/authentication/register',
  authorizeCodeBack: '/oauth/oauth/callBack',
  userInfo: '/oauth/user/userinfo',
  logout: '/oauth/logout',
  authorizeUrl: '/logout/oauth/getAuthorizeUrl',
  userRouters: '/auth/user/routers',
  loginLogPage: '/auth/login/log/page',
  deleteLoginLog: '/auth/login/log/delete',
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

export function userRouters() {
  return request({
    url: userApi.userRouters,
    method: 'get',
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

export function loginLogPage(parameter) {
  return request({
    url: userApi.loginLogPage,
    method: 'post',
    data: parameter,
  })
}

export function deleteLoginLog(parameter) {
  return request({
    url: userApi.deleteLoginLog,
    method: 'delete',
    data: parameter,
  })
}
