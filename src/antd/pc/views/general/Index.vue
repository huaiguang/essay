<template>
  <div>
    <router-view :key="routerkey"></router-view>
  </div>
</template>

<script>
export default {
  name: 'General',
  data() {
    return {
      routerkey: 'general'
    }
  }
}
</script>
