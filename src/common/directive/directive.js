import Vue from 'vue'
import reg from './RegExpMap'
import { Message } from 'element-ui'

const filterBlankEmoticon = Vue.directive('filterBlankEmoticon', {
  update: function(el, { value, modifiers }, vnode) {
    let element = el.children[0]
    try {
      if (!element.value) {
        return false
      }
      element.onkeyup = function(e) {
        element.value = element.value.replace(reg.regMoji, '')
      }
      element.onblur = function(e) {
        element.value = element.value.trim()
      }
    } catch (e) {}
  }
})

const preventReClick = Vue.directive('preventReClick', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 2000)
      }
    })
  }
})

export default {
  filterBlankEmoticon,
  preventReClick
}
