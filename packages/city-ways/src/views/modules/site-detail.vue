<script setup>
import { http } from '@/utils/http'
import { useCommonStore } from '@/store'
import { commonApi } from '@/api/common-api'

const route = useRoute()
const router  = useRouter()

const imgList = ref([])
const dataList = ref([])
const commonState = useCommonStore()

const dataForm = reactive({
  files: '',
  lng: undefined,
  lat: undefined,
  name: undefined,
  area: undefined,
  num: undefined,
  type: undefined,
  dist: undefined,
  intro: undefined,
  street: undefined,
  address: undefined,
  isShow: undefined,
  status: undefined,
  busHours: undefined
})

const getDataList = async () => {
  const tempList = await commonState.initDataAction() || []
  dataList.value = tempList.filter(item => item.area !== '杭州市')
  Object.assign(dataForm, dataList.value.find(item => item.id === route.params.id) || {})
  if (dataForm.files) {
    imgList.value = JSON.parse(dataForm.files || '[]').map((item) => {
      return {
        url: item.src,
        isImage: true,
        imgForm: item
      }
    })
  }
}

getDataList()

const uploadFile = async (item) => {
  const data = await http.postForm('/venus-api/city/site/upload', { file: item.file })
  Object.assign(item, { imgForm: data })
  console.log(data)
}

const onAfterRead = async (data) => {
  console.log(data)
  await uploadFile(data)
}

const onSubmit = async () => {
  const tempList = imgList.value.map((item) => item.imgForm)
  dataForm.files = JSON.stringify(tempList || '')
  await commonApi('/city/site/update', dataForm, {
    method: 'put'
  })


  commonState.updateDataById(Object.assign(dataForm, { imgList: tempList }))
  showSuccessToast('修改成功')

  await router.push({ name: 'site-list' })
}
</script>

<template>
  <div class="site-detail">
    <van-form @submit="onSubmit" input-align="right">
      <van-cell-group inset>
        <van-field
          v-model="dataForm.name"
          name="name"
          label="点位名称"
        />
        <van-field
          v-model="dataForm.area"
          name="area"
          label="所属城区"
        />
        <van-field
          v-model="dataForm.street"
          name="street"
          label="所属街道"
        />
        <van-field
          v-model="dataForm.address"
          name="address"
          label="详细地址"
        />
        <van-field
          v-model="dataForm.type"
          name="type"
          label="业态类型"
        />
        <van-field
          v-model="dataForm.dist"
          name="dist"
          label="业态分布"
        />
        <van-field
          v-model="dataForm.busHours"
          name="busHours"
          label="营业时间"
        />
        <van-field
          v-model="dataForm.intro"
          name="intro"
          label="点位介绍"
        />
        <van-field name="isShow" label="首页展示">
          <template #input>
            <van-switch v-model="dataForm.isShow" size="small" :active-value="1" :inactive-value="0"  />
          </template>
        </van-field>
        <van-field name="status" label="点位状态">
          <template #input>
            <van-switch v-model="dataForm.status" size="small" :active-value="1" :inactive-value="0" />
          </template>
        </van-field>
        <van-field name="uploader" label="文件上传">
          <template #input>
            <van-uploader
              v-model="imgList"
              accept="image/*"
              :after-read="onAfterRead"
            />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped lang="scss">
.site-detail {
  height: 100vh;
  background-color: #FFFFFF;
}
</style>
