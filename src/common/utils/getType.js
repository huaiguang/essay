/**
 * 返回数据类型
 *
 * @param {any} obj 传入的参数
 * @returns {string} 传入参数的数据类型
 */
function getType(obj) {
  let type = Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase()

  return type
}

export default getType
