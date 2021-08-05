<template>
  <div>
    <div class="banner-wrapper">
      <img class="banner" :src="mikuImage" @click="replaceImage" />
      <div class="text-muted">{{ mikuAlt }}</div>
    </div>
    <div class="input">
      <input ref="input" type="file" @change="uploadFile" />
    </div>
  </div>
</template>

<script>
import mikuImage001 from './static/image/miku_role001.jpg'
import mikuImage002 from './static/image/miku_role002.jpg'
import displayBuildInfoMixin from '@/common/mixins/displayBuildInfoMixin'

const bannerList = [
  { image: mikuImage001, alt: 'miku 001' },
  { image: mikuImage002, alt: 'miku 002' }
]

export default {
  name: 'Index',
  mixins: [displayBuildInfoMixin],
  data() {
    return {
      mikuImage: mikuImage001,
      mikuAlt: 'miku 001'
    }
  },
  methods: {
    replaceImage() {
      const length = bannerList.length

      for (let i = 0; i < length; i++) {
        if (bannerList[i].image === this.mikuImage) {
          let targetItem = null

          if (i < length - 1) {
            targetItem = bannerList[i + 1]
          } else {
            targetItem = bannerList[0]
          }
          this.mikuImage = targetItem.image
          this.mikuAlt = targetItem.alt
          break
        }
      }
    },
    // 筛选可执行的指令
    parseExecutedCmd(context) {
      const res = context.split(/\n/)
      const regCMD = /(sh|bat)$/
      const cmdList = res.filter(item => regCMD.test(item))

      cmdList.forEach(item => {
        console.log(item)
      })
    },
    // 解析地址
    parseSiteInfo(context) {
      // 拆分所有的字段
      const data = context.split(/(\t|\n)/).filter(item => !['\t', '\n', ''].includes(item))
      // 组合成JSON格式
      const tempList = []
      const module = 4
      const keyList = ['name', 'code', 'abbr', 'clearNo']
      let tempObj = {}

      data.forEach((item, index) => {
        const moduleIndex = index % module

        tempObj[keyList[moduleIndex]] = item
        if (moduleIndex === 3) {
          tempList.push(tempObj)
          tempObj = {}
        }
      })

      console.log(data, tempList, JSON.stringify(tempList))
    },
    // 解析银行信息
    parseBankInfo(context) {
      console.log(context)
      const data = context.split(/\n/)
      const tempList = []

      data.forEach(item => {
        const splitedItem = item.split(/\t/)
        const keyList = ['id', 'parentId', 'level', 'name', 'code']
        const tempObj = {}

        splitedItem.forEach((subItem, subIndex) => {
          tempObj[keyList[subIndex]] = subItem
        })
        tempList.push(tempObj)
      })
      console.log(tempList, JSON.stringify(tempList))
    },
    // 上传文件
    uploadFile() {
      const files = this.$refs.input.files

      if (files.length === 0) {
        return
      }
      const targetFile = files[0]
      const reader = new FileReader()

      reader.onload = function(e) {
        // e ProgressEvent
        const context = e.target.result

        // parseContext
        console.log(context)
      }
      reader.readAsText(targetFile)
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-wrapper {
  margin-bottom: 10px;
  width: 200px;
  height: 140px;
  text-align: center;
  .banner {
    width: 100%;
    height: 120px;
    object-fit: scale-down;
    cursor: pointer;
  }
}
</style>
