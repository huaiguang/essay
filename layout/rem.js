// 一般的页面，设置的fontSize仅与水平长度相关
// 自执行
// 必须放置在head中，在body及其包裹的子元素还未被遍历前执行
// eslint-disable-next-line no-extra-semi
;(function(document, window) {
  const htmlElement = document.documentElement
  const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'

  // 设置初始值
  const currentWidth = window.innerWidth
  if (currentWidth <= 320) {
    htmlElement.style.fontSize = '50px'
  } else if (currentWidth >= 640) {
    htmlElement.style.fontSize = '100px'
  } else {
    htmlElement.style.fontSize = 100 * (currentWidth / 640) + 'px'
  }

  const reCalculate = () => {
    const clientWidth = window.innerWidth || htmlElement.clientWidth
    // 以给定的设计稿尺寸为准，当前为iPhoneX机型的尺寸
    htmlElement.style.fontSize = (clientWidth * 100) / 375 + 'px'
  }

  window.addEventListener(resizeEvent, reCalculate, false)
  // 绑定浏览器缩放与加载时间
  document.addEventListener('DOMContentLoaded', reCalculate, false)
})(document, window)

/**
 * 在REM方案下，设置移动端的rem大小
 * @param {Number} designWidth 设计稿的宽度，一版是640，750
 * @param {Number} maxWidth 允许的最大宽度
 */
export function setRem(designWidth, maxWidth = 750) {
  const doc = document
  const win = window
  const docEl = doc.documentElement
  let tid

  function refreshRem() {
    let width = docEl.getBoundingClientRect().width
    width > maxWidth && (width = maxWidth)
    const rem = (width * 100) / designWidth
    document.documentElement.style.fontSize = rem
  }

  //要等 viewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
  refreshRem()

  win.addEventListener(
    'resize',
    function() {
      clearTimeout(tid) //防止执行两次
      tid = setTimeout(refreshRem, 300)
    },
    false
  )
  win.addEventListener(
    'pageshow',
    function(e) {
      if (e.persisted) {
        // 浏览器后退的时候重新计算
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 300)
      }
    },
    false
  )
  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = '16px'
  } else {
    doc.addEventListener(
      'DOMContentLoaded',
      function() {
        doc.body.style.fontSize = '16px'
      },
      false
    )
  }
}

// 移动端rem布局刷新，网页瞬间缩小
// 方案一 媒体查询
// 详情见 ./rem.css

// 方案二 隐藏异常的过场
// 2.对body进行css处理；利用style=”visibility: hidden”先 设置隐藏；在js的方法在body之后添加，做到先加载网页文档；在js计算fontSize之后添加如下代码；
// setTimeout(showPage, 1)

// function showPage() {
//   document.body.style.visibility = 'visible'
// }

// 方案三 通过js设置html fontSize的初始值，效果等同于方案一的媒体查询
// 此脚本放置于body标签前，设置documentElement.fontSize的初始值
/**
 * 设置documentElement.fontSize的初始值
 * 当window.innerWidth <= 320 时, fontSize = '50px'; 否则 fontSize = '100px'
 */
function resize() {
  var docEl = document.documentElement
  var clientWidth = window.innerWidth
  if (clientWidth <= 320) {
    docEl.style.fontSize = '50px'
  } else if (clientWidth >= 640) {
    docEl.style.fontSize = '100px'
  } else {
    // 实际不会执行到这里
    docEl.style.fontSize = 100 * (clientWidth / 640) + 'px'
  }
}
//解决加载时放大后再缩小
resize()
