import http from './http'

export function orderDetail(params: { orderNo: string; accessKey: string }) {
  return http.get('/orderDetail', { params })
}

export function orderList(params: { accessKey: string; pageNo: number; pageSize: number; payWay: number }) {
  return http.get('/orderList', { params })
}

export function accountInfo(params: { accessKey: string }) {
  return http.get('/accountInfo', { params, headers: { Authorization: params.accessKey } })
}

export function wechatPay(params: { accessKey: string; osType: number; payAmount: number }) {
  return http.post('/wechatPay', params)
}

export function userCheckPhone(params: { phone: string }) {
  return http.post('/user/checkPhone', params)
}

export function userDoGetInfo(params: { accessKey: string }) {
  const headers = { Authorization: params.accessKey }
  console.log(headers)
  return http.get('/user/doGetInfo', { params, headers })
}

export function userDoUpdateInfo(params: { accessKey: string; nickname: string; avatar: string }) {
  return http.post('/user/doUpdateInfo', params)
}

export function userDoLogout(params: { accessKey: string }) {
  return http.post('/user/doLogout', params)
}

export function userDoLogin(params: { phone: string; code: string; inviteCode?: string }) {
  return http.post('/user/doLogin', params)
}

export function userDoRegisterCode(params: { phone: string }) {
  return http.post('/user/doRegisterCode', params)
}

export function userDoSendCode(params: { phone: string }) {
  return http.post('/user/doSendCode', params)
}

export function userRegisterAccount(params: { phone: string; code: string; name: string }) {
  return http.post('/user/registerAccount', params)
}

export function chatCompletions(params) {
  return http.post('/chat/completions', params)
}
