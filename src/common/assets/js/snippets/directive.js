const inputBaseFilter = Vue.directive('inputBaseFilter', {
  inserted: function (el, binding, vnode) {
    el.addEventListener('blur', function(e) {
      const target = e.target;
      if (target.nodeName === 'INPUT') {
        console.log('init')
        target.value = target.value.trim()
      }
    }, true)
    el.addEventListener('keyup', function(e) {
      const target = e.target;
      if (target.nodeName === 'INPUT') {
        target.value = target.value.replace(reg.regMoji,'')
      }
    }, true)
  }
})
