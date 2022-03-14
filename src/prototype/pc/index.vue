<template>
  <div>
    <div class="banner-wrapper">
      <img class="banner" :src="mikuImage" @click="replaceImage" />
      <div class="text-muted">{{ mikuAlt }}</div>
    </div>
    <div class="input">
      <select v-model="encoding">
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
import { parseAPIFields, parseEnum, parseCodeFields } from './static/js/parseFile'

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
    // 上传文件
    uploadFile() {
      const files = this.$refs.file.files

      if (files.length === 0) {
        return
      }
      const targetFile = files[0]
      const fileName = targetFile.name
      const reader = new FileReader()

      reader.onload = function(e) {
        // e ProgressEvent
        const context = e.target.result

        const result = parseCodeFields(context)
        console.group()
        console.log('origin: ')
        console.log(context)
        console.log('result: ')
        console.log(result)
        console.groupEnd()
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
