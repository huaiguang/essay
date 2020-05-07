import Vue from 'vue'
import App from './index.vue'

// new Vue({
//   el: '#root',
//   components: {
//     App
//   },
//   template: '<App/>'
// })

new Vue({
  el: '#root',
  render: h => h(App)
})