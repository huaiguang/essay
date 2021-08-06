import CryptoJS from 'crypto-js'

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

function aesDecrypt({ data, isObject = true, secretKey }) {
  if (!data || !secretKey) {
    return ''
  }
  console.log(data, secretKey)
  const bytes = CryptoJS.AES.decrypt(data, secretKey),
    plainText = bytes.toString(CryptoJS.enc.Utf8)

  if (isObject === true) {
    return JSON.parse(plainText)
  }
  return plainText
}

export { aesEncrypt, aesDecrypt }
