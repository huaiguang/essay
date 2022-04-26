// import './loading.css'
// import Vue from 'vue'

// const Loading = {}

// Loading.show = () => {
//   if (document.querySelector('.wrap-loading')) {
//     return
//   }
//   // You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
//   const loadingTpl = `
//     <div class="wrap-loading">
//       <div class="van-loading van-loading--circular">
//         <span class="van-loading__spinner van-loading__spinner--circular" style="width: .3em; height: .3em;">
//           <svg viewBox="25 25 50 50" class="van-loading__circular">
//             <circle cx="50" cy="50" r="20" fill="none"></circle>
//           </svg>
//         </span>
//         <span class="van-loading__text" style="font-size: .16em; line-height: .3em;">加载中...</span>
//       </div>
//     </div>
//   `,
//     LoadingTip = Vue.extend({
//       template: loadingTpl
//     }),
//     loadingTemplate = new LoadingTip().$mount().$el

//   document.body.appendChild(loadingTemplate)
//   // 防止遮罩滑动
//   document.querySelector('.wrap-loading').addEventListener('touchmove', function(e) {
//     e.preventDefault()
//     e.stopPropagation()
//   })
// }

// Loading.hide = () => {
//   const template = document.querySelector('.wrap-loading')

//   if (template) {
//     document.body.removeChild(template)
//   }
// }

// // 避免重复 install, 设立 flag
// Loading.installed = false
// Loading.install = function(vue) {
//   if (Loading.installed) {
//     return
//   }
//   vue.prototype.$loading = {}

//   vue.prototype.$loading.show = () => {
//     // 如果页面有 loading，则不再重复执行
//     if (document.querySelector('.wrap-loading')) {
//       return
//     }
//     // 创建loading模版
//     const LoadingTip = vue.extend({
//         // template: `
//         //   <div class="wrap-loading">
//         //     <div class="loader"></div>
//         //   </div>
//         // `
//         template: `
//         <div class="wrap-loading">
//           <div class="van-loading van-loading--circular">
//             <span class="van-loading__spinner van-loading__spinner--circular" style="width: .3em; height: .3em;">
//               <svg viewBox="25 25 50 50" class="van-loading__circular">
//                 <circle cx="50" cy="50" r="20" fill="none"></circle>
//               </svg>
//             </span>
//             <span class="van-loading__text" style="font-size: .16em; line-height: .3em;">加载中...</span>
//           </div>
//         </div>
//       `
//       }),
//       // 创建实例，挂载到文档
//       loadingTemplate = new LoadingTip().$mount().$el

//     document.body.appendChild(loadingTemplate)
//     // 防止遮罩滑动
//     document.querySelector('.wrap-loading').addEventListener('touchmove', function(e) {
//       e.preventDefault()
//       e.stopPropagation()
//     })
//     Loading.installed = true
//   }

//   vue.prototype.$loading.hide = () => {
//     const template = document.querySelector('.wrap-loading')

//     if (template) {
//       document.body.removeChild(template)
//     }
//   }
// }

// export default Loading

import './loading.css'

const Loading = {}

Loading.show = () => {
  if (document.querySelector('.wrap-loading')) {
    return
  }
  const loadingWrap = document.createElement('DIV')
  loadingWrap.className = 'wrap-loading'
  const innerLoader = '<div class="loader"></div>'
  loadingWrap.innerHTML = innerLoader
  document.body.appendChild(loadingWrap)
  // 防止遮罩滑动
  document.querySelector('.wrap-loading').addEventListener('touchmove', e => {
    e.preventDefault()
    e.stopPropagation()
  })
}

Loading.hide = () => {
  const loadingWrap = document.querySelector('.wrap-loading')
  if (loadingWrap) {
    document.body.removeChild(loadingWrap)
  }
}

// 实际上，Loading 被挂载在 Vue.prototype 上，通过 Vue.use() 在实例中执行
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
    // when using runtime-only build of Vue, template compiler is not available
    // 创建实例，挂载到文档
    // html dom节点
    // const LoadingTpl = Vue.extend({
    //   template: `
    //     <div class="wrap-loading">
    //       <div class="loader"></div>
    //     </div>
    //   `
    // })
    // const loadingTemplate = new LoadingTpl().$mount().$el
    // document.body.appendChild(loadingTemplate)
    const loadingWrap = document.createElement('div')
    loadingWrap.className = 'wrap-loading'
    const innerLoader = document.createElement('div')
    innerLoader.className = 'loader'
    loadingWrap.appendChild(innerLoader)
    document.body.appendChild(loadingWrap)
    // 防止遮罩滑动
    const wrapper = document.querySelector('.wrap-loading')
    if (wrapper) {
      wrapper.addEventListener('touchmove', e => {
        e.preventDefault()
        e.stopPropagation()
      })
    }
    Loading.installed = true
  }

  Vue.prototype.$loading.hide = () => {
    const loadingWrap = document.querySelector('.wrap-loading')
    if (loadingWrap) {
      document.body.removeChild(loadingWrap)
    }
  }
}

export default Loading
