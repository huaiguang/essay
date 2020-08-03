// 减法，num1:被减数，num2:减数
function numSub(num1, num2) {
  var baseNum, baseNum1, baseNum2
  var precision // 精度
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
  precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2
  console.log('-----应该充值的结果---')
  console.log(parseInt(Number((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(2) * 100) + '')
  return (parseInt(Number((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(2)) * 100) + ''
  // 下面两步乘100 造成了精度缺失
  //    console.log(((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision) * 100+'')
  //   return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision) * 100+''
}

// 加法
function numAdd(num1, num2) {
  var baseNum, baseNum1, baseNum2
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
  return (num1 * baseNum + num2 * baseNum) / baseNum
}

/**
 * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
 *
 * @param num1被乘数 | num2乘数
 */
function numMulti(num1, num2) {
  var baseNum = 0
  try {
    baseNum += num1.toString().split('.')[1].length
  } catch (e) {}
  try {
    baseNum += num2.toString().split('.')[1].length
  } catch (e) {}
  return Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / Math.pow(10, baseNum)
}

/**
 * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
 *
 * @param num1被除数 | num2除数
 */
function numDiv(num1, num2) {
  var baseNum1 = 0
  var baseNum2 = 0
  var baseNum3, baseNum4
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  with(Math) {
    baseNum3 = Number(num1.toString().replace('.', ''))
    baseNum4 = Number(num2.toString().replace('.', ''))
    return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1)
  }
}

/**
 * js + - * / 计算
 * @param arg1  第一个计算的参数
 * @param arg2  第二个计算的参数
 * @param type  运算符号 + - * /
 * @returns {number}
 */
function calculateTwoNumber(arg1, arg2, type) {
  if (type === '*') { //乘法
    let m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString()
    try {
      m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
      m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  } else if (type === '+' || type === '-') { //加减法
    let sq1, sq2, x
    try {
      sq1 = arg1.toString().split(".")[1].length
    } catch (e) {
      sq1 = 0
    }
    try {
      sq2 = arg2.toString().split(".")[1].length
    } catch (e) {
      sq2 = 0
    }
    x = Math.pow(10, Math.max(sq1, sq2))
    if (type === '+') {
      return (calculateTwoNumber(arg1, x, '*') + calculateTwoNumber(arg2, x, '*')) / x
    } else if (type === '-') {
      return (calculateTwoNumber(arg1, x, '*') - calculateTwoNumber(arg2, x, '*')) / x
    }
  } else if (type === '/') { //除法
    let t1 = 0,
      t2 = 0,
      r1, r2
    try {
      t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
      t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace(".", ""))
    r2 = Number(arg2.toString().replace(".", ""))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  }
}

