/**
 * 防抖
 * @param {function} fn 代执行的函数
 * @param {number} delay 延迟时间
 * @param {boolean} immediate 是否立即执行
 * @returns function
 */
function debounce(fn, delay = 300, immediate = false) {
  console.log('debounce', this, arguments)
  let timer = null

  return function(...moreArgs) {
    const context = this
    const args = arguments

    console.log('this', this)
    console.log('arguments', arguments)
    console.log('moreArgs', moreArgs)

    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      const callNow = !timer

      timer = setTimeout(() => {
        timer = null
      }, delay)
      if (callNow) {
        fn.apply(context, args)
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }
}

export { debounce }
