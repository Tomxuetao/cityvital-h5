const devConfig = {
  outLinkMap: new Map([
    ['regular-command', 'https://zf.cgw.hangzhou.gov.cn:9443/wukong/index.html#/view?id=166e9fb6-e168-4b9d-8643-8689eaacf0fa&project=7b8b3e94-6ada-4f8e-aec6-3984eec4fd5a&token=']
  ])
}

const testConfig = {
  outLinkMap: new Map([
    ['regular-command', 'https://zf.cgw.hangzhou.gov.cn:9443/wukong/index.html#/view?id=166e9fb6-e168-4b9d-8643-8689eaacf0fa&project=7b8b3e94-6ada-4f8e-aec6-3984eec4fd5a&token=']
  ])
}

const prodConfig = {
  outLinkMap: new Map([
    ['regular-command', 'https://zf.cgw.hangzhou.gov.cn:9443/wukong/index.html#/view?id=166e9fb6-e168-4b9d-8643-8689eaacf0fa&project=7b8b3e94-6ada-4f8e-aec6-3984eec4fd5a&token=']
  ])
}
const configMap = new Map([
  ['dev', devConfig],
  ['test', testConfig],
  ['prod', prodConfig]
])

export default configMap.get(import.meta.env.MODE) || devConfig
