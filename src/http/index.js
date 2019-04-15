// import axios from 'axios'
import qs from 'qs'
import { baseURL } from './api'
import { MessageBox, Indicator } from 'mint-ui'
import store from '@/store/store'

// axios.interceptors.request.use(config => {
//   // loading
//   return config
// }, error => {
//   return Promise.reject(error)
// })

// axios.interceptors.response.use(response => {
//   return response
// }, error => {
//   return Promise.resolve(error.response)
// })

function checkStatus (res) {
  if (res.message === '请登录！') {
    store.commit('clearAuthorization')
  }
  if (!res.success) {
    MessageBox('提示', res.message)
    return Promise.reject(res)
  }
  return res
}

export default {
  post (url, data, message = '加载中...', headers = null) {
    Indicator.open({
      text: message,
      spinnerType: 'fading-circle'
    })
    return fetch(`${baseURL}${url}`, {
      method: 'POST',
      body: headers ? JSON.stringify(data) : qs.stringify(data),
      headers: {
        'Authorization': store.getters.Authorization,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        ...headers
      }
    })
      .then(res => {
        Indicator.close()
        return res.json()
      })
      .then(res => {
        return checkStatus(res)
      })
      .catch((res) => {
        if (!res.success) {
          return Promise.reject(res)
        }
        Indicator.close()
        MessageBox('提示', '网络异常')
      })
  },
  get (url, params, message = '加载中...', headers = {}) {
    Indicator.open({
      text: message,
      spinnerType: 'fading-circle'
    })
    if (params) {
      let paramsArray = []
      // 拼接参数
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
    return fetch(`${baseURL}${url}`, {
      method: 'GET',
      headers: {
        'Authorization': store.getters.Authorization,
        ...headers
      }
    })
      .then(res => {
        Indicator.close()
        return res.json()
      })
      .then(res => {
        return checkStatus(res)
      })
      .catch((res) => {
        if (!res.success) {
          return Promise.reject(res)
        }
        Indicator.close()
        MessageBox('提示', '网络异常')
      })
  }
}
