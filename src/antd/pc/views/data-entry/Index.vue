<template>
  <div>
    <router-view :key="routerkey"></router-view>
  </div>
</template>

<script>
export default {
  name: 'DataEntry',
  data() {
    return {
      routerkey: 'dataEntry'
    }
  }
}
</script>
