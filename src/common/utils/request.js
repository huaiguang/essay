import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  // baseURL: BASE_API,
  // withCredentials: true,
  // timeout: 5000
  responseType: 'arraybuffer'
})

service.interceptors.request.use(
  config => {
    config.headers['App-Code'] = '16'
    return config
  },
  error => {
    //console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    // const res = response.data
    // if (res.code !== '000000') {
    //   console.log('%c error1 ', 'color: #fff; background-color: #20a0e8');
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return Promise.resolve(res);
    // }
    return response
  },
  error => {
    //console.log('%c error2 ', 'color: #fff; background-color: #20a0e8');
    //console.log(error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
