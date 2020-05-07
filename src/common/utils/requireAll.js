
/**
 * 引入特定目录下的模块
 *
 * @param {object} options
 * @property {string} directory 要引入文件的地址
 * @property {boolean} useSubdirectories 是否需要搜索子目录
 * @property {regular} regExp 匹配目录下文件的拓展名
 * @returns {object} 引入文件的说明
 * @property {key} 文件名
 * @property {value} 打包的资源
 */
function requireAll(options) {
  const { directory, useSubdirectories, regExp } = options;
  const context = require.context(directory, useSubdirectories, regExp);
  const map = {};
  context.keys().forEach(key => {
    let route = key.substring(2);
    map[route.replace(/.vue$/, '')] = context(key).default;
  });

  return map;
}

// const requireAll = context => {
//   const map = {};

//   context.keys().forEach(key => {
//     let route = key.substring(2);
//     // 引入reg做成全局方法
//     map[route.replace(/\.vue$/, '')] = context(key).default;
//   })

//   return map;
// }

export default requireAll;
