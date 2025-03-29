import { getEnvByUa, TOKEN_KEY } from '@/utils'

import { http, backEndServer } from '@/utils/http'

/**
 * 切换站点Token
 * @param dataForm
 * @returns {*}
 */
export const switchSiteToken = (dataForm = {}) =>
  http({
    method: 'get',
    params: dataForm,
    url: `${backEndServer}/oauth/tc/project_token`
  })

/**
 * 获取用户信息
 * @returns {Promise<never>|Promise<unknown>}
 */
export const getUserDataHandler = () => {
  const tempEnv = getEnvByUa()
  if (tempEnv !== 'h5') {
    const otherSubSiteToken = sessionStorage.getItem('accessToken')
    return new Promise((resolve, reject) => {
      if (otherSubSiteToken) {
        switchSiteToken({
          projectId: '6',
          access_token: otherSubSiteToken
        }).then(accessToken => {
          sessionStorage.setItem(TOKEN_KEY, accessToken.toString())
          resolve()
        }).catch(() => {
          reject(new Error('获取目标站点Token失败'))
        })
      } else {
        reject(new Error('获取目标站点Token失败'))
      }
    })
  } else {
    return Promise.reject(new Error('环境错误'))
  }
}
