import axios from 'axios' // 引入axios
import Vue from 'vue'
import {
  MessageBox
} from 'element-ui' // 引入elemnebt自带的弹窗提示，用于全局的消息提醒
import router from '@/router'
import SetLoading from './axiosLoading'
import { Promise } from 'core-js'
// import { resolve } from 'core-js/fn/promise'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API  // axios请求地址
const $loading = new SetLoading() // 使用封装的打开与关闭弹窗方法
const configs = { 
  baseURL: process.env.VUE_APP_BASE_API || ""
  // timeout: 60 * 1000, // Timeout 请求超时时间
  // withCredentials: true, // Check cross-site Access-Control
  // method: 'post' // 默认请求方式
}
const _axios = axios.create(configs) // 创建axios实例

// 添加请求拦截器
_axios.interceptors.request.use(
  config => {
    // 可以为头部增加参数，以下是增加token
    const token = '1238208802iwioqieiei'
    if (token) {
      config.headers.Authorization = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // 请求错误
    return Promise.reject(error)
  }
)

// 添加响应拦截器
_axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // return一个promise, 错误判断在使用该方法时做
    return Promise.reject(error)
  }
)

const responesMessage = (data, config, resolve, reject) => {
  // 接口code返回200时，正常，返回其他时，弹出提示框，提示框的内容是接口返回的是message
  if (+data.code === 200 || (config && config.blob && !+data.code)) {
    resolve(data)
  } else {
    if (!(config && config.noEnd)) {
      MessageBox.alert(data.message)
    }
    reject(data)
  }
}
// 接口返回错误code码时的判断， 需用到响应拦截器，特定的异常code，需要单独处理
const alertMessage = (config, reject, error) => {
  if (config && config.noEnd) {
    reject(error)
    return false
  }
  switch (error.response && error.response.status) {
    case 404:
      MessageBox.alert('Network anomalies')
      break
    case 403:
      MessageBox.alert('You do not have permission')
      break
    case 401:
      MessageBox.alert('You do not have permission')
      // 清除登录的用户信息
      // store.dispatch('user/resetToken')
      // MessageBox.alert('You are not logged in or your login has expired',{
      //   confirmButtonText: 'Login'
      // }).then(() => {
      //   router.push({
      //     path: '/login',
      //     query: {
      //       redirect: router.currentRoute.fullPath
      //     }
      //   })
      // })
      break
    case 500:
      MessageBox.alert('Network anomalies')
      break
    default:
      MessageBox.alert('Network anomalies')
      break
  }
  reject(error)
}
// 封装post方法
const $post = (url, data, config, axiosConfig = {}) => {
  /*
  * config配置参数
  * noLoading: true 不显示loading蒙层
  * noEnd: true 不弹出提示框
  * default: true default 会自动添加 api/v2
  * blob: true 返回文件流，不走默认的拦截
  * axiosConfig axios 的配置，如header 等
  * rsaEncrypt: true rsa加密
  */
  return new Promise((resolve, reject) => {
    $loading.open(config)
    // const _url = `ec.yasuo/api/v1/${url}` // 可以用三元，在特定情况用传入的url
    const _url = url
    _axios.post(_url, data, axiosConfig).then(data => {
      responesMessage(data, config, resolve, reject)
    })
      .catch(error => {
        alertMessage(config, reject, error)
      })
      .finally(() => {
        // 在mock.js中使用Mock.setup来延迟报错，为了展示接口的延迟效果，在弹窗关闭时加个定时
        setTimeout(() => {
          $loading.close(config)
        },500)
      })
  })
}

// 封装get
const $get = (url, params, config) => {
  return new Promise((resolve, reject) => {
    $loading.open()
    // const _url = (config && config.default) ? url : `ec.yasuo/api/v1/${url}` // 后台本地的服务
    const _url = url
    _axios.get(_url, {
      params
    }).then(data => {
      responesMessage(data, config, resolve, reject)
    })
      .catch(error => {
        alertMessage(config, reject, error)
      })
      .finally(() => {
        setTimeout(() => {
          $loading.close(config)
        },500)
      })
  })
}

Vue.prototype.$post = $post
Vue.prototype.$get = $get

export {
  $post,
  $get
}
