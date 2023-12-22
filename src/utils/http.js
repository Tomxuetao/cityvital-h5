import axios from 'axios'
import { showFailToast } from 'vant'

export function createHttp() {
  const http = axios.create({
    timeout: 1000 * 60,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  /**
   * 请求拦截
   */
  http.interceptors.request.use((config) => {
      config.headers = Object.assign({}, { ...config.headers }, {
        'Access-Token': sessionStorage.getItem('accessToken')
      })
      return config
    },
    (error) => Promise.reject(error)
  )
  
  /**
   * 响应拦截
   */
  http.interceptors.response.use((response) => {
      const { data: responseData } = response
      const { status, msg, success, message } = responseData
      if (status === 200 || success) {
        return responseData.data
      } else {
        showFailToast(msg || message)
        return Promise.reject(new Error(msg || message))
      }
    },
    (error) => Promise.reject(error))
  
  return http
}

export const http = createHttp()

// 指标数据统一前缀
export const gatewayServer = '/gateway-web/cv_data/api/v1'

export const oauth2Server = '/oauth2'

