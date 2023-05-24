import axios from 'axios'
const baseURL = `${process.env.OPENAI_API_BASE_URL}/v1`
const http = axios.create({
  baseURL,
})

http.interceptors.request.use(
  (config) => {
    globalThis.console.log(config)
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

export function userDoLogin(params: { phone: string; code: string; inviteCode?: string }) {
  globalThis.console.log('/user/doLogin', params)
  return http.post('/user/doLogin', params)
}

export function userRegisterAccount(params: { phone: string; code: string; name: string }) {
  return http.post('/user/registerAccount', params)
}
