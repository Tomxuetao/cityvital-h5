import { http, gatewayServer } from '@/utils/http'

/**
 * 获取城市体征指数
 * @param searchForm
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getSignNumApi = (searchForm = {}) => http({
  url: `${gatewayServer}/cityvital_sign/composite_score`,
  method: 'get',
  params: searchForm
})
