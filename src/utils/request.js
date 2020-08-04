import axios from 'axios'
import router from '../router'

const service = axios.create({ //'http://123.56.20.26:3000'
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

service.interceptors.request.use(config => {
  config.headers.common['authorization'] = localStorage.getItem('token')
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(res => {
  let status = res.data.status
  if (status === 401) {
    router.push('/login')
  }
  return res
})

export default service;