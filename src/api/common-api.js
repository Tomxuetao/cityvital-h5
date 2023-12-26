import { backEndServer, gatewayServer, http } from '@/utils/http'

/**
 * 公用从后端服务获取数据
 * @param url
 * @param searchForm
 * @param method
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const commonBackEndApi = (url, searchForm, method = 'get') =>
  http(
    Object.assign(
      {
        method: method,
        url: `${backEndServer}/${url}`
      },
      method === 'get' ? { params: searchForm } : { data: searchForm }
    )
  )

/**
 * 公用从网关获取数据
 * @param code
 * @param searchForm
 * @param method
 * @returns {*}
 */
export const commonGatewayApi = (code, searchForm = {}, method = 'get') =>
  http({
    method: method,
    params: searchForm,
    url: `${gatewayServer}/share-api/data/admin/${code}`
  })

/**
 * 公用获取数据
 * @param url
 * @param searchForm
 * @param config
 */
export const commonApi = (url, searchForm, config) => {
  const { isIndexServer = false, method = 'get' } = config
  return isIndexServer
    ? commonGatewayApi(url, searchForm, method)
    : commonBackEndApi(url, searchForm, method)
}
