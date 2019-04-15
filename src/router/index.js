import Vue from 'vue'
import Router from 'vue-router'
// import store from './store/store'
// import * as types from './store/types'
import Business from '@/views/business'
import Communication from '@/views/communication'
import Transaction from '@/views/transaction/transaction'
import ReleaseOrder from '@/views/transaction/releaseOrder'
import Search from '@/views/search'
import Merchandise from '@/views/merchandise'
import Mine from '@/views/mine'
import Home from '@/views/homes/home'
import Details from '@/views/homes/details'
import Task from '@/views/homes/task'
import Partner from '@/views/homes/partner'
import HomeBusiness from '@/views/homes/business'

import Address from '@/components/mine/address'
import IncAddress from '@/components/mine/incAddress'
import Condy from '@/components/mine/condy'
import Feedback from '@/components/mine/feedback'
import FeedHistory from '@/components/mine/feedHistory'
import Verified from '@/components/mine/verified'
import Lottery from '@/components/mine/lottery'
import MyTeam from '@/components/mine/team/myTeam'
import MyTeamCode from '@/components/mine/team/myTeamCode'
import Chat from '@/components/mine/team/chat'

import Order from '@/components/mine/orders/order'
import Comfirm from '@/components/mine/orders/comfirm'
import Version from '@/components/mine/version'
import Setting from '@/components/mine/settings/setting'
import ExchangePW from '@/components/mine/settings/exchangePW'
import LoginPW from '@/components/mine/settings/loginPW'
import ForgetPW from '@/components/mine/settings/forgetPW'
import Identity from '@/components/mine/identity'
import Activity from '@/components/mine/userInfo/activity'
import Contribution from '@/components/mine/userInfo/contribution'
import Level from '@/components/mine/userInfo/level'

Vue.use(Router)

// 页面刷新时，重新赋值token
// if (window.localStorage.getItem('token')) {
//   store.commit(types.LOGIN, window.localStorage.getItem('token'))
// }

const router = new Router({
  // mode: 'hash',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/home/details',
          name: 'Details',
          component: Details
        },
        {
          path: '/home/task',
          name: 'Task',
          component: Task
        },
        {
          path: '/home/partner',
          name: 'Partner',
          component: Partner
        },
        {
          path: '/home/business',
          name: 'HomeBusiness',
          component: HomeBusiness
        }
      ]
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
        }]
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
        },
        {
          path: '/transaction/releaseOrder',
          name: 'ReleaseOrder',
          component: ReleaseOrder
        }]
    },
    {
      path: '/communication',
      name: 'Communication',
      component: Communication
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      children: [
        {
          path: '/mine/identity',
          name: 'Identity',
          component: Identity,
          children: [
            {
              path: '/mine/identity/verified',
              name: 'Verified',
              component: Verified
            }]
        },
        {
          path: '/mine/activity',
          name: 'Activity',
          component: Activity
        },
        {
          path: '/mine/contribution',
          name: 'Contribution',
          component: Contribution
        },
        {
          path: '/mine/level',
          name: 'Level',
          component: Level
        },
        {
          path: '/mine/address',
          name: 'Address',
          component: Address,
          children: [
            {
              path: '/mine/address/incAddress',
              name: 'IncAddress',
              component: IncAddress
            }]
        },
        {
          path: '/mine/settings',
          name: 'Setting',
          component: Setting,
          children: [
            {
              path: '/mine/settings/exchangePW',
              name: 'ExchangePW',
              component: ExchangePW
            },
            {
              path: '/mine/settings/loginPW',
              name: 'LoginPW',
              component: LoginPW
            },
            {
              path: '/mine/settings/forgetPW',
              name: 'ForgetPW',
              component: ForgetPW
            }
          ]
        },
        {
          path: '/mine/candy',
          name: 'Condy',
          component: Condy
        },
        {
          path: '/mine/feedHistory',
          name: 'FeedHistory',
          component: FeedHistory,
          children: [
            {
              path: '/mine/feedHistory/feedback',
              name: 'Feedback',
              component: Feedback
            }]
        },
        {
          path: '/mine/lottery',
          name: 'Lottery',
          component: Lottery
        },
        {
          path: '/mine/myTeam',
          name: 'MyTeam',
          component: MyTeam,
          children: [
            {
              path: '/mine/myTeam/myTeamCode',
              name: 'MyTeamCode',
              component: MyTeamCode
            },
            {
              path: '/mine/myTeam/myTeamChat',
              name: 'Chat',
              component: Chat
            }]
        },
        {
          path: '/mine/order',
          name: 'Order',
          component: Order,
          children: [
            {
              path: '/mine/order/comfirm',
              name: 'Comfirm',
              component: Comfirm
            }
          ]
        },
        {
          path: '/mine/version',
          name: 'Version',
          component: Version
        }]
    },
    {
      path: '*',
      name: 'Home',
      component: Home
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
