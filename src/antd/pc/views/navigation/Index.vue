<template>
  <div>
    <router-view :key="routerkey"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      routerkey: 'navigation'
    }
  }
}
</script>
