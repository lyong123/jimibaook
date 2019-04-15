// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Page from './common/page'
import MintUI, { Popup, Search, InfiniteScroll, CellSwipe, Cell, TabContainer, TabContainerItem, Field, Button, Navbar, TabItem, Header, Swipe, SwipeItem } from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(InfiniteScroll)

Vue.component(Popup.name, Popup)
Vue.component('page', Page)
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Header.name, Header)
Vue.component(Cell.name, Cell)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(CellSwipe.name, CellSwipe)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Search.name, Search)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
