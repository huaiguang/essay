// eslint-disable-next-line no-extra-semi
;(function() {
  if (location.search && location.search.indexOf('debug') >= 0) {
    return
  }

  // 参考 https://github.com/matthewhudson/device.js/blob/master/lib/device.js
  var userAgent = window.navigator.userAgent.toLowerCase()
  function find(needle) {
    return userAgent.indexOf(needle) !== -1
  }
  var windows = function() {
    return find('windows')
  }
  var iphone = function() {
    return !windows() && find('iphone')
  }
  var ipod = function() {
    return find('ipod')
  }
  var ipad = function() {
    return find('ipad')
  }
  var android = function() {
    return !windows() && find('android')
  }
  var androidPhone = function() {
    return android() && find('mobile')
  }
  var androidTablet = function() {
    return android() && !find('mobile')
  }
  var blackberry = function() {
    return find('blackberry') || find('bb10') || find('rim')
  }
  var blackberryPhone = function() {
    return blackberry() && !find('tablet')
  }
  var blackberryTablet = function() {
    return blackberry() && find('tablet')
  }
  var windowsPhone = function() {
    return windows() && find('phone')
  }
  var windowsTablet = function() {
    return windows() && find('touch') && !windowsPhone()
  }
  var fxos = function() {
    return (find('(mobile;') || find('(tablet;')) && find('; rv:')
  }
  var fxosPhone = function() {
    return fxos() && find('mobile')
  }
  var fxosTablet = function() {
    return fxos() && find('tablet')
  }
  var meego = function() {
    return find('meego')
  }
  var mobile = function() {
    return (
      androidPhone() ||
      iphone() ||
      ipod() ||
      windowsPhone() ||
      blackberryPhone() ||
      fxosPhone() ||
      meego()
    )
  }
  var tablet = function() {
    return ipad() || androidTablet() || blackberryTablet() || windowsTablet() || fxosTablet()
  }
  // 判断横竖屏
  var landscape = function() {
    return window.innerHeight < window.innerWidth
  }
  // 初始是否为横屏
  var isLandscape = landscape()

  var conf = document.getElementsByTagName('html')[0]
  var pcurl = conf.getAttribute('pc-url')
  var h5url = conf.getAttribute('h5-url')

  // 跳转时保持 query string 和 hash
  function redirect(url) {
    if (!url) {
      return
    }
    let newUrl = url
    if (url.indexOf('#') === -1) {
      newUrl += location.hash
    }
    if (url.indexOf('?') === -1) {
      newUrl += location.search
    }
    location.href = newUrl
  }

  // 旧版归类：平板竖屏为h5，平板横屏为pc
  // if (mobile() || (tablet() && !landscape())) {
  //   redirect(h5url)
  // } else {
  //   redirect(pcurl)
  // }

  // 2018-05-08
  // 平板竖屏，横屏均为 h5
  if (mobile() || tablet()) {
    redirect(h5url)
  } else {
    redirect(pcurl)
  }

  // 判断 平板 的横竖屏切换来来切换 pc 和 h5 的页面
  // 平板竖屏，横屏均为 h5 ,resize 后不跳转
  // function onresize() {
  //   if (tablet() && !(isLandscape === landscape())) {
  //     if (landscape() && pcurl) {
  //       redirect(pcurl)
  //     } else if (!landscape() && h5url) {
  //       redirect(h5url)
  //     }
  //   }
  // }

  var orientationEvent
  if (Object.prototype.hasOwnProperty.call(window, 'onorientationchange')) {
    orientationEvent = 'orientationchange'
  } else {
    orientationEvent = 'resize'
  }

  if (window.addEventListener) {
    window.addEventListener(orientationEvent, onresize, false)
  } else if (window.attachEvent) {
    window.attachEvent(orientationEvent, onresize)
  } else {
    window[orientationEvent] = onresize
  }
})()
