import Vue from 'vue'

import './static/sass/index.scss'
import App from './index.vue'

const NODE_ENV = process.env.NODE_ENV

console.log('prototype index', NODE_ENV, typeof NODE_ENV)

new Vue({
  'el': '#root',
  'render': h => h(App)
})
