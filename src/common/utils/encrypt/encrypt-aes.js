// import CryptoJS from 'crypto-js'
const CryptoJS = require('crypto-js')

function aesEncrypt(data, secretKey) {
  if (!data || !secretKey) {
    return ''
  }
  let encryptedStr = ''

  if (typeof data === 'object') {
    encryptedStr = JSON.stringify(data)
  } else {
    encryptedStr = data
  }
  return CryptoJS.AES.encrypt(encryptedStr, secretKey).toString()
}

/**
 * AES 解密
 * @param text 待解密数据
 * @param aesKey aes密钥
 * @returns {string} 返回解密字符串
 */
function aesDecrypt(text, aesKey) {
  const key = CryptoJS.enc.Utf8.parse(aesKey)
  const decrypt = CryptoJS.AES.decrypt(text, key, {
    // iv: key, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedData = CryptoJS.enc.Utf8.stringify(decrypt).toString()
  let decryptedObj = null
  try {
    decryptedObj = JSON.parse(decryptedData)
  } catch (err) {
    decryptedObj = decryptedData
  }
  console.log(0, decryptedObj)
  return decryptedObj
}

export { aesEncrypt, aesDecrypt }
