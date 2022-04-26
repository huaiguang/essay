/**
 * 日期格式化工具
 * @param {string} fmt 期望的日期格式, 例如 YYYY-mm-dd HH:MM:ss
 * @param {date} date 将要转换的date对象
 * @returns {string}
 */
function dateFormat(fmt, date = new Date()) {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
    }
  }
  return fmt
}

/**
 * 计算当前日期前几天或后几天
 * @param AddDayCount  0是当天,-1是昨天,1是明天
 * @returns {string}
 */
function getDateStr(AddDayCount) {
  var dd = new Date()
  dd.setDate(dd.getDate() + AddDayCount) //获取AddDayCount天后的日期
  return dd
}

/**
 * 计算两个日期相差几天
 * @param date1
 * @param date2
 * @returns {number}
 * @constructor
 */
function DateMinus({ date1, date2 = new Date() }) {
  let sDate = new Date(date1)
  let now = new Date(date2)
  let days = now.getTime() - sDate.getTime()
  return parseInt(days / (1000 * 60 * 60 * 24), 10)
}

export { dateFormat, getDateStr, DateMinus }
