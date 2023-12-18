import { gatewayServer, http } from '@/utils/http'

/**
 * 公用从网关获取数据
 * @param code
 * @param searchForm
 * @param commonPrefix
 * @returns {*}
 */
export const commonGatewayApi = (code, searchForm = {}, commonPrefix = '/share-api/data/admin') => http({
  method: 'get',
  params: searchForm,
  url: `${gatewayServer}${commonPrefix}/${code || ''}`
})
