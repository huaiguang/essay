<template>
  <div>
    <router-view :key="routerkey"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Feedback',
  data() {
    return {
      routerkey: 'feedback'
    }
  }
}
</script>
