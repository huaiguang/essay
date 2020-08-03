// 引入包的方式
const modules = {}

const files = require.context('../components/', false, /\.vue/)
files.keys().forEach(key => {
  modules[key.replace(/.vue/, '')] = files(key).default
})
console.log (modules)


let requireAll = requireContext => requireContext.keys().map(requireContext)
let req = require.context('../components/', false, /\.vue$/)
let components = requireAll(req)

let contexts = require.context('../components', false, /\.vue$/)
let components = contexts.keys().map(component => contexts(component).default)
console.log(components)
