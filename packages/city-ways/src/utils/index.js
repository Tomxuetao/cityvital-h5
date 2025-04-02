const imgRecords = import.meta.glob(['../assets/img/*'], { query: '?url', import: 'default', eager: true })

export const getImgUrlFn = (base) => (name, extName = '.webp') => imgRecords[`${base}/${name}${extName}`]
