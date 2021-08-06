<template>
  <div>
    <router-view :key="routerkey"></router-view>
  </div>
</template>

<script>
export default {
  name: 'DataDisplay',
  data() {
    return {
      routerkey: 'dataDisplay'
    }
  }
}
</script>
