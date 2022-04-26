// 十六进制转字节
function hexToBytes(hex) {
  const bytes = []

  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16))
  }
  return bytes
}

// 字节转十六进制
function bytesToHex(bytes) {
  const hex = []

  for (let i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16))
    hex.push((bytes[i] & 0xf).toString(16))
  }
  return hex.join('')
}

// 字符转二进制
function strToBinary(str) {
  var result = [],
    list = str.split('')

  for (var i = 0; i < list.length; i++) {
    if (i !== 0) {
      //加空格，分割二进制
      result.push(' ')
    }
    var item = list[i],
      // 返回对应字符的unicode值
      binaryStr = item.charCodeAt().toString(2)

    result.push(binaryStr)
  }
  return result.join('')
}

// 二进制转字符
function binaryToStr(str) {
  var result = [],
    //通过空格来分开二进制的字符
    list = str.split(' ')
  const length = list.length

  for (var i = 0; i < length; i++) {
    var item = list[i],
      // 取出原来的二进制 unicode
      asciiCode = parseInt(item, 2),
      // 转为字符
      charValue = String.fromCharCode(asciiCode)
    //添加到集合中

    result.push(charValue)
  }
  //返回结果
  return result.join('')
}

// 字符转字节
function stringToByte(str) {
  var bytes = new Array(),
    len,
    c

  len = str.length
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if (c >= 0x010000 && c <= 0x10ffff) {
      bytes.push(((c >> 18) & 0x07) | 0xf0)
      bytes.push(((c >> 12) & 0x3f) | 0x80)
      bytes.push(((c >> 6) & 0x3f) | 0x80)
      bytes.push((c & 0x3f) | 0x80)
    } else if (c >= 0x000800 && c <= 0x00ffff) {
      bytes.push(((c >> 12) & 0x0f) | 0xe0)
      bytes.push(((c >> 6) & 0x3f) | 0x80)
      bytes.push((c & 0x3f) | 0x80)
    } else if (c >= 0x000080 && c <= 0x0007ff) {
      bytes.push(((c >> 6) & 0x1f) | 0xc0)
      bytes.push((c & 0x3f) | 0x80)
    } else {
      bytes.push(c & 0xff)
    }
  }
  return bytes
}

// 字节转字符
function byteToString(arr) {
  if (typeof arr === 'string') {
    return arr
  }
  var str = '',
    _arr = arr

  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
      v = one.match(/^1+?(?=0)/)

    if (v && one.length === 8) {
      var bytesLength = v[0].length,
        store = _arr[i].toString(2).slice(7 - bytesLength)

      for (var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2)
      }
      str += String.fromCharCode(parseInt(store, 2))
      i += bytesLength - 1
    } else {
      str += String.fromCharCode(_arr[i])
    }
  }
  return str
}

export { hexToBytes, bytesToHex, strToBinary, binaryToStr, stringToByte, byteToString }
