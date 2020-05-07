<template>
  <div class="wrapper">{{ msg }}</div>
</template>

<script>
import './sass/index.scss'

export default {
  name: 'app',
  data() {
    return {
      msg: 'hello world!'
    }
  }
}
</script>
