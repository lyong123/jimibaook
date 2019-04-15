import Vue from 'vue'
import Router from 'vue-router'
// import store from './store/store'
// import * as types from './store/types'
import Business from '@/views/business'
import Transaction from '@/views/transaction/transaction'
import Search from '@/views/search'
import Merchandise from '@/views/merchandise'
import Mine from '@/views/mine'
import Home from '@/views/home'
import Login from '@/views/login'
import Registered from '@/views/registered'

import Address from '@/components/mine/address'
import Condy from '@/components/mine/condy'
import Feedback from '@/components/mine/feedback'
import Identity from '@/components/mine/identity'
import Lottery from '@/components/mine/lottery'
import MyTeam from '@/components/mine/myTeam'
import Order from '@/components/mine/order'
import Version from '@/components/mine/version'

Vue.use(Router)

// 页面刷新时，重新赋值token
// if (window.localStorage.getItem('token')) {
//   store.commit(types.LOGIN, window.localStorage.getItem('token'))
// }

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registered',
      name: 'Registered',
      component: Registered
    },
    {
      path: '/business',
      name: 'Business',
      component: Business,
      children: [
        {
          path: '/business/sports',
          name: 'SportsCommodity',
          component: Merchandise
        },
        {
          path: '/business/commodity',
          name: 'Commodity',
          component: Merchandise
        },
        {
          path: '/business/virtualCommodity',
          name: 'VirtualCommodity',
          component: Merchandise
        }
      ]
    },
    {
      path: '/transaction',
      name: 'Transaction',
      component: Transaction,
      children: [
        {
          path: '/transaction/search',
          name: 'Search',
          component: Search
        }
      ]
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      children: [
        {
          path: '/mine/address',
          name: 'Address',
          component: Address
        },
        {
          path: '/mine/candy',
          name: 'Condy',
          component: Condy
        },
        {
          path: '/mine/feedback',
          name: 'Feedback',
          component: Feedback
        },
        {
          path: '/mine/identity',
          name: 'Identity',
          component: Identity
        },
        {
          path: '/mine/lottery',
          name: 'Lottery',
          component: Lottery
        },
        {
          path: '/mine/myTeam',
          name: 'MyTeam',
          component: MyTeam
        },
        {
          path: '/mine/order',
          name: 'Order',
          component: Order
        },
        {
          path: '/mine/version',
          name: 'Version',
          component: Version
        }
      ]
    },
    {
      path: '*',
      name: 'Login',
      component: Login
    }]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(r => r.meta.requireAuth)) {
//     if (store.state.token) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
