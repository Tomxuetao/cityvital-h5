import { getEnvByUa } from '@/utils'

import ready from 'gdt-jsapi/ready'
import getAuthCode from 'gdt-jsapi/getAuthCode'

import { http, backEndServer, oauth2Server } from '@/utils/http'

/**
 * 获取三中心Token通过浙政钉code
 * @param dataForm
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getCenterTokenApi = (dataForm = {}) =>
  http({
    method: 'get',
    params: dataForm,
    url: `${oauth2Server}/api/dingLogin`
  })

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

/**
 * 获取用户信息通过Token
 * @param dataForm
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getUserDataByTokenAPi = (dataForm = {}) =>
  http({
    method: 'get',
    params: dataForm,
    url: `${backEndServer}/login`
  })

/**
 * 获取code
 * @param corpId
 * @returns {Promise<unknown>}
 */
export const getAuthCodeApi = (corpId) => {
  return new Promise((resolve, reject) => {
    try {
      ready(async () => {
        const { code } = (await getAuthCode({ corpId })) || {}
        if (code) {
          resolve(code)
        } else {
          reject(new Error('获取登录授权码失败'))
        }
      })
    } catch (e) {
      reject(new Error('调用gdt-jsapi失败'))
    }
  })
}

/**
 * 获取用户信息
 * @param corpId
 * @returns {Promise<never>|Promise<unknown>}
 */
export const getUserDataHandler = (corpId) => {
  const tempEnv = getEnvByUa()
  if (tempEnv !== 'h5') {
    return new Promise((resolve, reject) => {
      getAuthCodeApi(corpId)
        .then(async (code) => {
          const { token } = await getCenterTokenApi({ authCode: code })
          alert(token)
          if (token) {
            const accessToken = await getUserTokenApi({
              access_token: token,
              projectId: 16
            })
            sessionStorage.setItem('accessToken', accessToken)
            getUserDataByTokenAPi()
              .then(() => {
                resolve()
              })
              .catch((e) => {
                reject(new Error('获取用户信息失败'))
              })
          } else {
            reject(new Error('获取三中心Token失败'))
          }
        })
        .catch((e) => {
          reject(new Error(e))
        })
    })
  } else {
    return Promise.reject(new Error('环境错误'))
  }
}
