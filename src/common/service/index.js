// 引入axios
import axios from 'axios'
import Interceptors from './Interceptors'
import Loading from '@/common/components/Loading'

// 创建axios实例
const httpService = axios.create({
  baseURL: '//artemis.com', // url前缀
  timeout: 3000 // 请求超时时间
})
const interceptors = new Interceptors({})

// request拦截器
httpService.interceptors.request.use(...interceptors.beforeRequest)

// response拦截器
httpService.interceptors.response.use(...interceptors.afterResponse)

/*网络请求部分*/
/**
 * 封装的get请求
 * @param {string} url api地址
 * @param {object} params 请求的参数
 * @param {object} options 其他配置
 * @returns {object|promise}
 */
export function get(
  url,
  params,
  options = {
    loading: true
  }
) {
  if (options.loading) {
    Loading.show()
  }
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: 'get',
      params
    })
      .then(response => {
        if (response.data && response.data.code === '000000') {
          resolve(response.data)
          Loading.hide()
        } else {
          reject(response)
          Loading.hide()
        }
      })
      .catch(error => {
        reject(error)
        Loading.hide()
      })
  })
}

/**
 * 封装的post方法
 * @param {string} url api地址
 * @param {object} params 请求的参数
 * @param {object} options 其他配置
 * @returns {object|promise}
 */
export function post(url, params, options = { loading: true }) {
  if (options.loading) {
    Loading.show()
  }
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: 'post',
      data: params
    })
      .then(response => {
        console.log('response', response)
        if (response.data && response.data.code === '000000') {
          resolve(response.data)
          Loading.hide()
        } else {
          reject(response)
          Loading.hide()
        }
      })
      .catch(error => {
        reject(error)
        Loading.hide()
      })
  })
}

/**
 * 文件上传
 * @param {string} url
 * @param {object} params
 * @returns {object|promise}
 */
export function fileUpload(url, params = {}) {
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: 'post',
      data: params,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  get,
  post,
  fileUpload
}
