<template>
  <div>
    <router-view :key="routerkey"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Other',
  data() {
    return {
      routerkey: 'other'
    }
  }
}
</script>
