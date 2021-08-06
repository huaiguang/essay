import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { storageMethod, throttle, createUniqueId } from './commonUtil'
import { ErrorCodeChange } from './errorCode'

const LagoResponseCodes = {
  successCode: '000000'
}

const authError = throttle(message => {
  Message.error({
    showClose: true,
    message,
    center: true
  })
}, 1000)

// 除登录注册外的接口都需要添加 token
axios.interceptors.request.use(
  config => {
    const token = storageMethod('local').get('token')
    const accessToken = window.accessToken

    if (token && accessToken && token !== accessToken) {
      window.location.reload()
      window.accessToken = undefined
      return {}
    } else {
      window.accessToken = token
    }

    if (token) {
      config.headers.Authorization = 'Bearer' + ' ' + token
    }
    config.headers['App-Code'] = '16'
    config.headers['X-Reqid'] = createUniqueId()
    config.headers['X-Reqtime'] = storageMethod('local').get('sysTimestamp')
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 排除一般错误
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.message.includes('timeout')) {
      // 判断请求异常信息中是否含有超时timeout字符串
      Message.error({
        showClose: true,
        message: '请求超时，请稍后再试！',
        center: true
      })
    }
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 415:
          //防止登录失效出现多个弹窗
          authError('登录过期，请重新登录！')
          setTimeout(() => {
            storageMethod('local').clear()
            window.location.hash = '#/account/login'
          }, 600)
          break
        case 403:
          //访问页面无权限
          authError('您没有访问该页面的权限，请重新登录！')
          setTimeout(() => {
            window.location.hash = '#/lago'
          }, 600)
          break
        case 504:
          Message.error({
            showClose: true,
            message: '请求超时，请稍后再试！',
            center: true
          })
          break
        default:
          Message.error({
            showClose: true,
            message: '系统繁忙，请稍后再试！',
            center: true
          })
      }
    }
    return Promise.reject(error.response)
  }
)

function getData(actionPath, params, options = {}) {
  const defaultOpts = {
    useLoading: true,
    timeout: 6000,
    resHandler: null
  }

  options = Object.assign(defaultOpts, options)
  let loading = null

  if (options.useLoading) {
    loading = Loading.service({
      customClass: 'axios-loading',
      lock: true,
      background: 'rgba(256, 256, 256, 0.7)'
    })
  }
  return new Promise((resolve, reject) => {
    axios(actionPath, {
      method: 'GET',
      params: params,
      timeout: options.timeout
    })
      .then(function(res) {
        if (loading !== null) {
          loading.close()
        }
        let result = res.data
        if (result.code) {
          if (result.code === LagoResponseCodes.successCode) {
            resolve(result.data)
          } else {
            let errorMessage = ErrorCodeChange(result.code) || {}
            if (!options.resHandler) {
              Message.error({
                showClose: true,
                message: errorMessage.message || result.msg
              })
            } else {
              let newResult = Object.assign({}, result, errorMessage)
              reject(newResult)
            }
          }
        }
      })
      .catch(error => {
        if (options.resError) {
          reject(error)
        }
        if (loading !== null) {
          loading.close()
        }
      })
  })
}

function postData(actionPath, params, options = {}) {
  const defaultOpts = {
    useLoading: true,
    timeout: 6000,
    resHandler: null
  }
  options = Object.assign({}, defaultOpts, options)
  let loading = null
  if (options.useLoading) {
    loading = Loading.service({
      customClass: 'axios-loading',
      lock: true,
      background: 'rgba(256, 256, 256, 0.7)'
    })
  }
  const config = {
    method: 'POST',
    url: actionPath,
    data: params
  }
  // timeout, responseType, headers
  for (let key in options) {
    if (key !== 'useLoading' && key !== 'resHandler' && options[key]) {
      if (key === 'useEncrypt') {
        const secId = storageMethod('local').get('securityInfo').secId
        config.headers = {
          'Content-Type': 'application/json',
          'X-PROTECT': 1,
          'X-Secid': secId
        }
      } else {
        config[key] = options[key]
      }
    }
  }
  return new Promise((resolve, reject) => {
    axios(config)
      .then(res => {
        if (loading !== null) {
          loading.close()
        }
        let result = res.data
        if (result.code) {
          if (result.code === LagoResponseCodes.successCode) {
            resolve(result.data)
          } else {
            let errorMessage = ErrorCodeChange(result.code) || {}
            if (!options.resHandler) {
              Message.error({
                showClose: true,
                message: errorMessage.message || result.msg
              })
            } else {
              let newResult = Object.assign({}, result, errorMessage)
              reject(newResult)
            }
          }
        } else {
          // 处理文件下载
          resolve(res)
        }
      })
      .catch(error => {
        if (options.resError) {
          reject(error)
        }
        if (loading !== null) {
          loading.close()
        }
      })
  })
}

export { getData, postData, axios }
