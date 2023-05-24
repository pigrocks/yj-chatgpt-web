import axios from 'axios'
import { useAuthStore } from '@/store'

const baseURL = import.meta.env.VITE_YINGJIN_API_URL
const service = axios.create({
  baseURL,
})

service.interceptors.request.use(
  (config) => {
    const token = useAuthStore().token
    if (token)
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)

export default service
