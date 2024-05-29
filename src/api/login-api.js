import { getEnvByUa, TOKEN_KEY } from '@/utils'

import { http, backEndServer, openApiServer } from '@/utils/http'

/**
 * 根据三中心Token换取用户Token
 * @param dataForm
 * @returns {*}
 */
export const getUserTokenApi = (dataForm = {}) =>
  http({
    method: 'get',
    params: dataForm,
    url: `${backEndServer}/oauth/tc/project_token`
  })


export const switchSiteToken = (dataForm = {}) =>
  http({
    method: 'get',
    params: dataForm,
    headers: {
      accessToken: sessionStorage.getItem('accessToken')
    },
    url: `${openApiServer}/api/v5/auth/switchSiteToken`
  })

/**
 * 获取用户信息
 * @returns {Promise<never>|Promise<unknown>}
 */
export const getUserDataHandler = () => {
  const tempEnv = getEnvByUa()
  if (tempEnv !== 'h5') {
    const centerToken = sessionStorage.getItem('accessToken')
    return new Promise((resolve, reject) => {
      if (centerToken) {
        switchSiteToken({
          siteId: '6'
        }).then(data => {
          sessionStorage.setItem(TOKEN_KEY, data.accessToken)
          resolve()
        })
      } else {
        reject(new Error('获取三中心Token失败'))
      }
    })
  } else {
    return Promise.reject(new Error('环境错误'))
  }
}
