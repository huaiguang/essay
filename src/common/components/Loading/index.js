import './loading.css'
import Vue from 'vue'

const Loading = {}

Loading.show = () => {
  if (document.querySelector('.wrap-loading')) {
    return
  }
  const loadingTpl = `
    <div class="wrap-loading">
      <div class="van-loading van-loading--circular">
        <span class="van-loading__spinner van-loading__spinner--circular" style="width: .3rem; height: .3rem;">
          <svg viewBox="25 25 50 50" class="van-loading__circular">
            <circle cx="50" cy="50" r="20" fill="none"></circle>
          </svg>
        </span>
        <span class="van-loading__text" style="font-size: .16rem; line-height: .3rem;">加载中...</span>
      </div>
    </div>
  `,
        LoadingTip = Vue.extend({
          'template': loadingTpl
        }),
        loadingTemplate = new LoadingTip().$mount().$el

  document.body.appendChild(loadingTemplate)
    // 防止遮罩滑动
  document.querySelector('.wrap-loading').addEventListener('touchmove', function(e) {
    e.preventDefault()
    e.stopPropagation()
  })
}

Loading.hide = () => {
  const template = document.querySelector('.wrap-loading')

  if (template) {
    document.body.removeChild(template)
  }
}

// 避免重复 install, 设立 flag
Loading.installed = false
Loading.install = function(Vue) {
  if (Loading.installed) {
    return
  }
  Vue.prototype.$loading = {}

  Vue.prototype.$loading.show = () => {
    // 如果页面有 loading，则不再重复执行
    if (document.querySelector('.wrap-loading')) {
      return
    }
        // 创建loading模版
    const LoadingTip = Vue.extend({
            // template: `
            //   <div class="wrap-loading">
            //     <div class="loader"></div>
            //   </div>
            // `
      'template': `
        <div class="wrap-loading">
          <div class="van-loading van-loading--circular">
            <span class="van-loading__spinner van-loading__spinner--circular" style="width: .3rem; height: .3rem;">
              <svg viewBox="25 25 50 50" class="van-loading__circular">
                <circle cx="50" cy="50" r="20" fill="none"></circle>
              </svg>
            </span>
            <span class="van-loading__text" style="font-size: .16rem; line-height: .3rem;">加载中...</span>
          </div>
        </div>
      `
    }),
            // 创建实例，挂载到文档
          loadingTemplate = new LoadingTip().$mount().$el

    document.body.appendChild(loadingTemplate)
        // 防止遮罩滑动
    document.querySelector('.wrap-loading').addEventListener('touchmove', function(e) {
      e.preventDefault()
      e.stopPropagation()
    })
    Loading.installed = true
  }

  Vue.prototype.$loading.hide = () => {
    const template = document.querySelector('.wrap-loading')

    if (template) {
      document.body.removeChild(template)
    }
  }
}

export default Loading
