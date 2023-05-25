import axios from 'axios'

const baseURL = import.meta.env.VITE_YINGJIN_API_URL
const service = axios.create({
  baseURL,
})

service.interceptors.request.use(
  (config) => {
    // const token = useAuthStore().token
    const token = localStorage.getItem('accessToken')
    // const accessKey = localStorage.getItem('accessKey')
    if (token)
      // config.headers.Authorization = `Bearer ${token}`
      config.headers.Authorization = `${token}`
      // config.headers.Authorization = `${token}`

    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

export default service
