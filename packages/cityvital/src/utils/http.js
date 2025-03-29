import axios from 'axios'
import router from '../router'
import { showFailToast } from 'vant'
import { TOKEN_KEY } from './index'

export function createHttp() {
  const http = axios.create({
    timeout: 1000 * 20,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  /**
   * 请求拦截
   */
  http.interceptors.request.use(
    (config) => {
      config.headers = Object.assign(
        {},
        { ...config.headers },
        {
          'Access-Token': sessionStorage.getItem(TOKEN_KEY)
        }
      )
      return config
    },
    (error) => Promise.reject(error)
  )

  /**
   * 响应拦截
   */
  http.interceptors.response.use(
    async (response) => {
      const { data: responseData } = response
      const { status, msg, success, message, code } = responseData
      // 政通接口（后端转发）
      const isEgova = 'hasError' in responseData
      if (status === 200 || success || isEgova) {
        if (isEgova) {
          const { result, totalCount } = responseData
          return { total: totalCount || 0, list: result }
        } else {
          return responseData.data
        }
      } else {
        if ([1028, 401, 403].includes(code)) {
          await router.push({ name: 'no-access' })
        } else {
          showFailToast(msg || message)
          return Promise.reject(new Error(msg || message))
        }
      }
    },
    async (error) => {
      const { response } = error
      if ([1028, 401, 403].includes(response?.status)) {
        await router.push({ name: 'no-access' })
      } else {
        return Promise.reject(error)
      }
    }
  )

  return http
}

export const http = createHttp()

export const backEndServer = '/back-server/cv_data'

// 指标数据统一前缀
export const gatewayServer = '/gateway-server/cv_data/api/v1'
