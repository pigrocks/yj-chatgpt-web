import axios from 'axios'

const baseURL = import.meta.env.VITE_YINGJIN_API_URL
const service = axios.create({
  baseURL,
})

service.interceptors.request.use(
  (config) => {
    const accessKey = localStorage.getItem('accessKey')
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      config.headers.Authorization = `${token}`
      config.headers.accessKey = `${accessKey}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

export default service
