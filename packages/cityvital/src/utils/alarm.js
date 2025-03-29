// 报警列表中文关系映射（由于数据库存的是旧版本的名字 所以得做映射转换一下）
export const reflectionTypeFun = {
	'市容景观': (params) => {
    const secondType = { '城市照明': '开关箱' }
    const thirdType = { '其他户外广告': '户外广告', '功能照明': '道路照明' }
    if(!params.secondType) return
    if(params.thirdType === '户外电子屏') {
        params.secondType = '户外电子屏'
    }
    secondType[params.secondType] && ( params.secondType = secondType[params.secondType] )
    thirdType[params.thirdType] && ( params.thirdType = thirdType[params.thirdType] )
    return params
	}
}