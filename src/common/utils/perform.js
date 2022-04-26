window.addEventListener('load', function() {
  setTimeout(function() {
    var e = window.performance

    if (!e) {
      return null
    }
    var t = e.timing,
      r = t.navigationStart

    var n = [
      {
        key: 'Redirect',
        desc: '网页重定向的耗时',
        value: t.redirectEnd - t.redirectStart
      },
      {
        key: 'AppCache',
        desc: '检查本地缓存的耗时',
        value: t.domainLookupStart - t.fetchStart
      },
      {
        key: 'DNS',
        desc: 'DNS查询的耗时',
        value: t.domainLookupEnd - t.domainLookupStart
      },
      {
        key: 'TCP',
        desc: 'TCP连接的耗时',
        value: t.connectEnd - t.connectStart
      },
      {
        key: 'Waiting(TTFB)',
        desc: '从客户端发起请求到接收到响应的时间 / Time To First Byte',
        value: t.responseStart - t.requestStart
      },
      {
        key: 'Content Download',
        desc: '下载服务端返回数据的时间',
        value: t.responseEnd - t.responseStart
      },
      {
        key: 'HTTP Total Time',
        desc: 'http请求总耗时',
        value: t.responseEnd - t.requestStart
      },
      {
        key: 'DOMContentLoaded',
        desc: 'dom加载完成的时间',
        value: t.domContentLoadedEventEnd - r
      },
      {
        key: 'domInteractive',
        desc: '解析dom树耗时,added',
        value: t.domComplete - t.domInteractive
      },
      {
        key: 'responseStart',
        desc: '白屏时间,added',
        value: t.responseStart - t.navigationStart
      },
      {
        key: 'Loaded',
        desc: '页面load的总耗时',
        value: t.loadEventEnd - r
      }
    ]

    n.forEach(item => {
      const { key, desc, value } = item

      console.log(desc + ' ' + value)
    })

    // this.request.post(url, data, () => {
    //   stats_ttfb: t.responseStart - t.requestStart,
    //   stats_domLoaded: t.domContentLoadedEventEnd - r,
    //   stats_loaded: t.loadEventEnd - r
    // })

    // 统计使用的内存
    if (performance.memory) {
      var memory = performance.memory

      console.log(
        'js内存使用占比 ：' +
          ((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100).toFixed(2) +
          '%'
      )
    }
  }, 0)
})

const timing = window.performance.timing

for (let key in timing) {
  console.log(key, timing[key])
}
