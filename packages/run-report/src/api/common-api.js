import { TOKEN_KEY } from '@/utils'
import { backEndServer, http } from '@/utils/http'

/**
 * 公用从后端服务获取数据
 * @param url
 * @param searchForm
 * @param method
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const commonBackEndApi = (url, searchForm = {}, method = 'get') =>
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
 * 换取站点token
 * @param dataForm
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const changeSiteToken = (dataForm) => http({
  method: 'get',
  params: dataForm,
  url: '/back-server/cv_data/oauth/tc/project_token'
})

export const getSiteToken = (token) => {
  return new Promise ((resolve, reject) => {
    const otherSubSiteToken = sessionStorage.getItem('accessToken') || token
    if (otherSubSiteToken) {
      sessionStorage.setItem('accessToken', otherSubSiteToken)
      changeSiteToken({
        projectId: '16',
        access_token: otherSubSiteToken
      }).then(accessToken => {
        sessionStorage.setItem(TOKEN_KEY, accessToken.toString())
        resolve()
      }).catch(err => {
        reject(err)
      })
    } else {
      reject('子站点Token不存在')
    }
  })
}