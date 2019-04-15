import Vue from 'vue'
import Vuex from 'vuex'
import requset from '@/http'
import { getUserInfoUrl, FirmfoundsUrl } from '@/http/api'

Vue.use(Vuex)

let localStorage = window.localStorage
let Authorization = localStorage.getItem('Authorization')
export default new Vuex.Store({
  state: {
    Authorization: Authorization,
    userInfo: {}
  },
  getters: {
    Authorization (state) {
      return state.Authorization
    }
  },
  mutations: {
    setAuthorization (state, val) {
      window.localStorage.setItem('Authorization', val)
      state.Authorization = val
    },
    clearAuthorization (state) {
      window.localStorage.removeItem('Authorization')
      state.Authorization = null
    },
    setUserInfo (state, params) {
      state.userInfo = params
    }
  },
  actions: {
    async loadUserInfo (store) {
      await requset.get(getUserInfoUrl).then(res => {
        store.commit('setUserInfo', res.data)
      })
      await requset.get(FirmfoundsUrl).then(res => {
        store.commit('setUserInfo', {...store.state.userInfo, ...res.data})
      })
    }
  },
  modules: {

  }

})
