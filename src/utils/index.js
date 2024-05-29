import dayjs from 'dayjs'

export const getEnvByUa = () => {
  let tempEnv = sessionStorage.getItem('curUaEnv')
  if (!tempEnv) {
    const ua = window.navigator.userAgent.toLowerCase()
    const isTaurusApp = ua.match(/TaurusApp/i) !== null
    
    tempEnv = isTaurusApp ? 'isTaurusApp' : 'h5'
    sessionStorage.setItem('curUaEnv', tempEnv)
  }
  return tempEnv
}

const imgRecords = import.meta.glob(['../views/modules/*/img/*', '../views/common/img/*'], { query: '?url', import: 'default', eager: true })
export const getImgUrlFn = (base) => {
  return (name, extName = '.webp') => imgRecords[`${base}/${name}${extName}`]
}

/**
 * 构建树形结构
 * @param nodes
 * @param parentId
 * @param idKey
 * @param pidKey
 * @returns {*[]}
 */
export const buildTree = (nodes, parentId, idKey = 'id', pidKey = 'pid') => {
  const tree = []
  
  nodes.forEach(node => {
    if (node[pidKey] === parentId) {
      const children = buildTree(nodes, node[idKey], idKey, pidKey)
      if (children.length) {
        node.children = children
      }
      tree.push(node)
    }
  })
  
  return tree
}

export const formatDate = (data, fmt = '') => {
  let _data = null
  if (data instanceof Date) {
    _data = data
  } else {
    _data = new Date(data)
  }
  var o = {
    'M+': _data.getMonth() + 1, //月份
    'd+': _data.getDate(), //日
    'h+': _data.getHours(), //小时
    'm+': _data.getMinutes(), //分
    's+': _data.getSeconds(), //秒
    'q+': Math.floor((_data.getMonth() + 3) / 3), //季度
    S: _data.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) {
    // eslint-disable-next-line no-param-reassign
    fmt = fmt.replace(RegExp.$1, (_data.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      // eslint-disable-next-line no-param-reassign
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}
/**
 * 获取本周的起始日期
 * @param formatStr
 * @returns {[string,string]}
 */

export const getCurWeek = (formatStr = 'YYYY-MM-DD') => [
  dayjs()
    .startOf('week')
    .format(formatStr),
  dayjs()
    .endOf('week')
    .format(formatStr)
]


export const TOKEN_KEY = 'vital-h5'
