export default {
  install(Vue, options) {
    // 1. 添加全局方法或属性，如:  vue-custom-element
    Vue.myGlobalMethod = function() {
      // 逻辑...
    }

    // 2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch
    Vue.directive('my-directive', {
      bind(el, binding, vnode, oldVnode) {
        // 逻辑...
      },
      // 当绑定元素插入到 DOM 中
      inserted(el, binding, vnode, oldVnode) {

      }，
      update() {},
      componentUpdated() {},
      unbind() {}
    })

    // 3. 通过全局 mixin方法添加一些组件选项，如: vuex
    // 全局注册一个 mixins，其会影响到注册之后的每一个Vue实例
    Vue.mixin({
      created() {
        console.log('greeting')
      }
    })

    // 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现
    // 如果需要在组件的基础上编写插件，我们可以使用Vue.extend(Component)
    Vue.prototype.$myMethod = function(options) {
      // 逻辑...
    }
  }
}
