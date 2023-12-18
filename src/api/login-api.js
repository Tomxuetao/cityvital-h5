import { getEnvByUa } from '@/utils'

import ready from 'gdt-jsapi/ready'
import getAuthCode from 'gdt-jsapi/getAuthCode'

export const getUserDataAPi = () => {

}
export const getAuthCodeApi = (corpId) => {
  return new Promise((resolve, reject) => {
    try {
      ready(async () => {
        const { code } = await getAuthCode({ corpId }) || {}
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

export const getUserDataHandler = (corpId) => {
  const tempEnv = getEnvByUa()
  if (tempEnv !== 'h5') {
    return new Promise((resolve, reject) => {
      getAuthCodeApi(corpId).then((code) => {
      
      })
    })
  } else {
    return Promise.reject(new Error('环境错误'))
  }
}
