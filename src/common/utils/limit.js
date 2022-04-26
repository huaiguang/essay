// // 基础版
// function debounce(fn, delay) {
//   let timer = null
//   return function() {
//     // 防抖函数的代码使用这两行代码来获取 this 和 参数，是为了让 debounce 函数最终返回的函数 this 指向不变以及依旧能接受到 e 参数。
//     let context = this
//     let args = arguments

//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(function() {
//       fn.apply(context, args)
//     }, delay)
//   }
// }

// function throttle(fn, delay) {
//   let previous = 0
//   return function() {
//     let context = this
//     let args = arguments
//     let now = Date.now()
//     if (now - previous > delay) {
//       fn.apply(context, args)
//       previous = now
//     }
//   }
// }

// 添加立即执行选项
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(fn, delay = 300, immediate = false) {
  let timer = null

  return function() {
    let context = this,
      args = arguments

    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      const callNow = !timer

      timer = setTimeout(function() {
        timer = null
      }, delay)
      if (callNow) {
        fn.apply(context, args)
      }
    } else {
      timer = setTimeout(function() {
        fn.apply(context, args)
      }, delay)
    }
  }
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
function throttle(fn, delay, type) {
  let previous,
    timer = null

  if (type === 1) {
    previous = 0
  }
  return function() {
    let context = this,
      args = arguments

    if (type === 1) {
      let now = Date.now()

      if (now - previous > delay) {
        fn.apply(context, args)
        previous = now
      }
    } else if (type === 2) {
      if (!timer) {
        timer = setTimeout(function() {
          timer = null
          fn.apply(context, args)
        }, delay)
      }
    }
  }
}

export { debounce, throttle }
