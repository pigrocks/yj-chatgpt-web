import http from './http'

export function get(...args: any[]): any {
  return http.get(...args).then(res => res.data)
}

export function post(...args: any[]): any {
  return http.post(...args)
}

export function orderDetail(params: { orderNo: string; accessKey: string }) {
  return get('/orderDetail', { params })
}

export function orderList(params: { accessKey: string; pageNo: number; pageSize: number; payWay?: number }) {
  return get('/orderList', { params })
}

export function accountInfo(params: { accessKey: string }) {
  return get('/accountInfo', { params, headers: { Authorization: params.accessKey } })
}

export function wechatPay(params: { accessKey: string; osType: number; payAmount: number }) {
  return post('/wechatPay', params)
}

export function userCheckPhone(params: { phone: string }) {
  return post('/user/checkPhone', params)
}

export function userDoGetInfo(params: { accessToken: string }) {
  const headers = { Authorization: params.accessToken }
  console.log(headers)
  return get('/user/doGetInfo', { headers })
}

export function userDoUpdateInfo(params: { accessKey: string; nickname: string; avatar: string }) {
  return post('/user/doUpdateInfo', params)
}

export function userDoLogout(params: { accessKey: string }) {
  return post('/user/doLogout', params)
}

export function userDoLogin(params: { phone: string; code: string; inviteCode?: string }) {
  return post('/user/doLogin', params)
}

export function userDoRegisterCode(params: { phone: string }) {
  return post('/user/doRegisterCode', params)
}

export function userDoSendCode(params: { phone: string }) {
  return post('/user/doSendCode', params)
}

export function userRegisterAccount(params: { phone: string; code: string; name: string }) {
  return post('/user/registerAccount', params)
}

export function chatCompletions(params) {
  return post('/chat/completions', params)
}

/*
 "data": [
    {
      "completionTokens": 0,
      "createDate": "string",
      "promptTokens": 0,
      "totalTokens": 0
    }
*/

export function listBill(params: { accessKey: string; STime: string; ETime: string }) {
  return get('/listBill', { params })
}
