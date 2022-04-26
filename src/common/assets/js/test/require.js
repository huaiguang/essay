// 方案一
// 创建一个空对象，将导入的 component 的名字和本体分别复制给 modules
const modules = {},
  files = require.context('../components/', false, /\.vue/)

files.keys().forEach(key => {
  modules[key.replace(/.vue/, '')] = files(key).default
})
console.log(modules)

// 方案二
// 定义导入的环境，通过 map 返回所有的 components 数组
const requireAll = requireContext => requireContext.keys().map(requireContext),
  // 导入的上下文
  req = require.context('../components/', false, /\.vue$/),
  // 返回读取的 components 数组
  components = requireAll(req)
