<template>
  <div>
    <img class="banner" :src="sunrise" />
    <div class="wrapper">
      {{ msg }}
    </div>
    <div class="input">
      <input ref="input" type="file" @change="uploadFile" />
      <small class="text-muted">校验文件</small>
    </div>
  </div>
</template>

<script>
import sunrise from './static/image/sunrise.jpeg'

export default {
  name: 'Index',
  data() {
    return {
      sunrise,
      msg: 'hello world!'
    }
  },
  methods: {
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
        const res = context.split(/\n/)
        const regCMD = /(sh|bat)$/
        const cmdList = res.filter(item => regCMD.test(item))

        cmdList.forEach(item => {
          console.log(item)
        })
      }
      reader.readAsText(targetFile)
    }
  }
}
</script>
