import { storageMethod } from '@/utils/commonUtil'

let lastTime = Date.now()
let currentTime = Date.now()
let timeOut = 30 * 60 * 1000 //设置超时时间： 30分

window.onload = function() {
  window.document.onmousedown = function() {
    if (storageMethod('local').get('token') && window.location.href.indexOf('#/account') < 0) {
      storageMethod('local').set('lastTime', Date.now())
    }
  }
}

function checkTimeout() {
  currentTime = Date.now()
  lastTime = storageMethod('local').get('lastTime')
  if (storageMethod('local').get('lastTime') > 0) {
    if (currentTime - lastTime > timeOut) {
      //判断是否超时
      storageMethod('local').clear()
      window.location.hash = '#/account/login'
    }
  }
}

// 定时器 间隔30秒检测是否长时间未操作页面
window.setInterval(checkTimeout, 30000)
