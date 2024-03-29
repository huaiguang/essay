class Interceptors {
  constructor(beforeRequest = [], afterResponse = []) {
    this.beforeRequest = [
      config => {
        if (beforeRequest[0]) {
          beforeRequest[0](config)
        } else {
          const token = localStorage.getItem('token')

          if (token) {
            config.headers['User-Token'] = ''
          }
          return config
        }
      },
      error => {
        if (beforeRequest[1]) {
          beforeRequest[1](error)
        } else {
          return Promise.reject(error)
        }
      }
    ]

    this.afterResponse = [
      response => {
        if (afterResponse[0]) {
          afterResponse[0](response)
        } else {
          return response
        }
      },
      error => {
        // console.log('timeout', error, error.code, error.message)
        // error.code    ECONNABORTED
        // error.message timeout of 3000ms exceeded
        if (afterResponse[1]) {
          afterResponse[1](error)
        } else {
          if (
            error.code === 'ECONNABORTED' &&
            error.message.indexOf('timeout') !== -1 &&
            !error.config._retry
          ) {
            error.message = '请求超时，请稍后再试！'
            return Promise.reject(error)
          }
          if (error && error.response) {
            switch (error.response.status) {
              case 400:
                error.message = '错误请求'
                break
              case 401:
                error.message = '未授权，请重新登录'
                break
              case 403:
                error.message = '拒绝访问'
                break
              case 404:
                error.message = '请求错误,未找到该资源'
                break
              case 405:
                error.message = '请求方法未允许'
                break
              case 408:
                error.message = '请求超时'
                break
              case 500:
                error.message = '服务器端出错'
                break
              case 501:
                error.message = '网络未实现'
                break
              case 502:
                error.message = '网络错误'
                break
              case 503:
                error.message = '服务不可用'
                break
              case 504:
                error.message = '网络超时'
                break
              case 505:
                error.message = 'http版本不支持该请求'
                break
              default:
                error.message = `未知错误${error.response.status}`
            }
          } else {
            error.message = '连接到服务器失败'
          }
          return Promise.reject(error)
        }
      }
    ]
  }
}

export default Interceptors
