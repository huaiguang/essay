/**
 * 节流
 * @param {function} fn 代执行的函数
 * @param {number} delay 延迟的间隔
 * @param {number} type 类型，1 立即执行；2 延迟执行
 * @returns function
 */
function throttle(fn, delay, type) {
  console.log('outer', this, arguments)
  let previous
  let timer = null

  if (type === 1) {
    previous = 0
  }
  return function() {
    const context = this
    const args = arguments
    // 解决this指向，如果不处理将指向window，原始指向element

    console.log('this', this)
    // 解决event对象，如果不处理将为undefined，原始为MouseEvent
    console.log('args', arguments)

    if (type === 1) {
      const now = Date.now()

      if (now - previous > delay) {
        fn.apply(context, args)
        previous = now
      }
    } else if (type === 2) {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null
          fn.apply(context, args)
        }, delay)
      }
    }
  }
}

export { throttle }
