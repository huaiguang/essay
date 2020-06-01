
/**
 * 返回数据类型
 *
 * @param {} obj 传入的参数
 * @returns {string} 传入参数的数据类型
 */
function getType(obj) {
  // '[object Object]'
  let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
  return type
}

export default getType
