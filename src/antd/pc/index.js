import Vue from 'vue'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'

import App from './index.vue'
import 'normalize.css'
import 'ant-design-vue/dist/antd.css'
import './assets/css/utils.css'

import { get, post } from '@/common/service'

import './mock'

Vue.prototype.$get = get
Vue.prototype.$post = post

Vue.use(Antd)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
