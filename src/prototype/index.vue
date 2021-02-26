<template>
  <div>
    <img
      class="banner"
      :src="sunrise"
    >
    <div class="wrapper">
      {{ msg }}
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
  }
}
</script>
