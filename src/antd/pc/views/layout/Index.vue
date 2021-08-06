<template>
  <div>
    <router-view :key="routerkey"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      routerkey: 'layout'
    }
  }
}
</script>
