export const getEnvByUa = () => {
  let tempEnv = sessionStorage.getItem('curUaEnv')
  if (!tempEnv) {
    const ua = window.navigator.userAgent.toLowerCase()
    const isDingTalk = ua.match(/DingTalk/i) !== null
    const isTaurusApp = ua.match(/TaurusApp/i) !== null
    
    tempEnv = isDingTalk ? 'isDingTalk' : isTaurusApp ? 'isTaurusApp' : 'h5'
    sessionStorage.setItem('curUaEnv', tempEnv)
  }
  return tempEnv
}

const imgRecords = import.meta.glob(['../views/modules/*/img/*', '../views/common/img/*'], { as: 'url', eager: true })
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
