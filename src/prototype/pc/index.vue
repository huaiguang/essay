<template>
  <div>
    <div class="banner-wrapper">
      <img class="banner" :src="mikuImage" @click="replaceImage" />
      <div class="text-muted">{{ mikuAlt }}</div>
    </div>
    <div class="input">
      <select v-model="encoding" @chang="changeFileEncoding">
        <option v-for="item in encodingList" :value="item.value" :key="item.value">
          {{ item.label }}
        </option>
      </select>
      <input ref="file" type="file" @change="uploadFile" />
    </div>
  </div>
</template>

<script>
import mikuImage001 from './static/image/miku_role001.jpg'
import mikuImage002 from './static/image/miku_role002.jpg'
import displayBuildInfoMixin from '@/common/mixins/displayBuildInfoMixin'
import { saveAs } from '@/common/utils/download'

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
      mikuAlt: 'miku 001',
      encodingList: [
        { label: 'GB2312', value: 'GB2312' },
        { label: 'UTF-8', value: 'UTF-8' },
        { label: 'asni', value: 'asni' }
      ],
      encoding: 'UTF-8'
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
    changeFileEncoding(val) {
      console.log(val)
      this.$refs.file.$el.value = ''
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
    // 解析地址码
    parseAddrCode(context) {
      const data = context.split(/\n/).filter(item => item !== '\n')
      // data.splice(0, 2)
      data.shift()
      const res = []
      let children = []
      data.forEach(item => {
        let tempArray = item.split(/\t/).filter(subItem => subItem !== '\t')
        if (tempArray.length > 2) {
          tempArray = tempArray.slice(0, 2)
        } else if (tempArray.length < 2) {
          console.log(tempArray)
          return
        }

        const tempObj = {
          label: '',
          value: ''
        }
        if (tempArray[1].startsWith(' ')) {
          tempObj.label = tempArray[1].replace(/\s/g, '')
          tempObj.value = tempArray[0]
          children.push(tempObj)
        } else {
          children = []
          tempObj.label = tempArray[1]
          tempObj.value = tempArray[0]
          tempObj.children = children
          res.push(tempObj)
        }
      })
      return res
    },
    // 解析枚举
    parseEnum(context) {
      const data = context.split(/(\n|\t)/).filter(item => item !== '\n' && item !== '\t')
      const res = []
      let tempObj = {}
      data.forEach((item, index) => {
        if (index % 2 === 0) {
          tempObj.value = item
        } else {
          tempObj.label = item
          res.push(tempObj)
          tempObj = {}
        }
      })
      return res
    },
    // 上传文件
    uploadFile() {
      const files = this.$refs.file.files

      if (files.length === 0) {
        return
      }
      const targetFile = files[0]
      const fileName = targetFile.name
      const reader = new FileReader()
      const vm = this

      reader.onload = function(e) {
        // e ProgressEvent
        const context = e.target.result

        const result = vm.parseEnum(context)
        console.group()
        // console.log('result\n', result) \n // 占据了一个空格
        /* console.log('origin: ')
        console.log(context)
        console.log('result: ')
        console.log(result)
        console.groupEnd() */
        var blob = new Blob([JSON.stringify(result, null, 2)], {
          type: 'application/json,charset=utf-8;'
        })
        saveAs(blob, fileName + '.json')
      }
      reader.readAsText(targetFile, this.encoding)
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
