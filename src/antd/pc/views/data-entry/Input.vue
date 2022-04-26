<template>
  <div>
    <a-input placeholder="origin" v-model="str00" />
    <a-input placeholder="decrypt" v-model="str10" />
    <a-button @click="encrypt">加密</a-button>
    <a-button @click="decrypt">解密</a-button>
  </div>
</template>

<script>
import { aesEncrypt, aesDecrypt } from '@/common/utils/encrypt/encrypt-aes'

export default {
  name: 'AutoComplete',
  data() {
    return {
      // encrypt
      secretKey: 'uq4hatu9a4gr8wsg',
      // 源字段
      str00: '',
      // 解密
      str10: '+E8L0BBe8QPya1xzdOWyvg=='
    }
  },
  methods: {
    // 加密
    encrypt() {
      this.str10 = aesEncrypt(this.str00, this.secretKey)
    },
    // 解密
    decrypt() {
      this.str00 = aesDecrypt(this.str10, this.secretKey)
      // this.str00 = aesDecrypt({
      //   data: this.str10,
      //   isObject: false,
      //   secretKey: this.secretKey
      // })
    }
  }
}
</script>

<style lang="scss" scoped></style>
