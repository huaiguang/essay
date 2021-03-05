// 引入axios
import axios from 'axios'
import Interceptors from './Interceptors'

// 创建axios实例
const httpService = axios.create({
  baseURL: 'http://localhost:8081', // url前缀
  timeout: 3000 // 请求超时时间
})
const interceptors = new Interceptors({})

// request拦截器
httpService.interceptors.request.use(...interceptors.beforeRequest)

// response拦截器
httpService.interceptors.response.use(...interceptors.afterResponse)

/*网络请求部分*/

/*
 *  get请求
 *  url:请求地址
 *  params:参数
 * */
export function get(url, params, options = {}) {
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: 'get',
      params: params
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/*
 *  post请求
 *  url:请求地址
 *  params:参数
 * */
export function post(url, params, options = {}) {
  return new Promise((resolve, reject) => {
    httpService({
      url: url,
      method: 'post',
      data: params
    })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

/*
 *  文件上传
 *  url: 请求地址
 *  params: 参数
 * */
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
