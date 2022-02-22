/**
 * @description 导出默认网路配置
 **/
const network = {
  //配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 15000,
  //操作正常code，支持String、Array、int多种类型
  successCode: [200],
  //token过期
  tokenExpiredCode: 2001,
  //无权限code
  noAuthorizedCode: 401,
  //禁止访问
  noForbiddenCode: 403,
  jwtValidCode: 2002,
}
module.exports = network
