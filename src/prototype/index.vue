<template>
  <div>
    <img class="banner" :src="sunrise">
    <div class="wrapper">{{ msg }}</div>
  </div>
</template>

<script>
import sunrise from './image/sunrise.jpeg'

export default {
  name: 'app',
  data() {
    return {
      sunrise,
      msg: 'hello world!'
    }
  }
}
</script>
