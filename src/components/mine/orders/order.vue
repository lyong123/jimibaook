<template>
  <page>
    <router-view class="router-view-class"></router-view>
    <header-title title="商圈订单" backIcon="icon-allow"></header-title>
    <mt-navbar v-model="active">
      <mt-tab-item id="1">买单</mt-tab-item>
      <mt-tab-item id="2">卖单</mt-tab-item>
      <mt-tab-item id="3">交换工具</mt-tab-item>
    </mt-navbar>

    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active">
        <mt-tab-container-item id="1" class="item-container-wrapper">
          <div class="content-wrapper">
            <scroll
              v-if="buyOrder.list.length > 0"
              class="list-wrapper"
              :loading="loading"
              :isTheEnd="buyOrder.isTheEnd"
              @loadMore="loadMore(buyOrder)"
            >
              <div class="item-wrapper" v-for="(item,index) in buyOrder.list" :key="`_${index}`">
                <list-item :orderInfo="item"/>
              </div>
            </scroll>
          </div>
        </mt-tab-container-item>

        <mt-tab-container-item id="2" class="item-container-wrapper">
          <div class="content-wrapper">
            <scroll
              v-if="sellOrder.list.length > 0"
              class="list-wrapper"
              :loading="loading"
              :isTheEnd="sellOrder.isTheEnd"
              @loadMore="loadMore(sellOrder)"
            >
              <div class="item-wrapper" v-for="(item,index) in sellOrder.list" :key="`_${index}`">
                <list-item :orderInfo="item"/>
              </div>
            </scroll>
          </div>
        </mt-tab-container-item>

        <mt-tab-container-item id="3" class="item-container-wrapper">
          <div class="content-wrapper">
            <scroll
              v-if="UtilsOrder.list.length > 0"
              class="list-wrapper"
              :loading="loading"
              :isTheEnd="UtilsOrder.isTheEnd"
              @loadMore="loadMore(UtilsOrder)"
            >
              <div class="item-wrapper" v-for="(item,index) in UtilsOrder.list" :key="`_${index}`">
                <list-item :orderInfo="item"/>
              </div>
            </scroll>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </page>
</template>
<script>
import Scroll from '@/common/scroll'
import ListItem from './listItem'
import requset from '@/http'
import { MineOrderUrl } from '@/http/api'

export default {
  components: {
    Scroll,
    ListItem
  },
  data () {
    return {
      active: '1',
      popupVisible: false,

      loading: false,

      tradingObj: {},
      buyOrder: {
        list: [],
        page: 0,
        size: 10,
        sign: 1,
        isTheEnd: false
      },
      sellOrder: {
        list: [],
        page: 0,
        size: 10,
        sign: 2,
        isTheEnd: false
      },
      UtilsOrder: {
        list: [],
        page: 0,
        size: 10,
        sign: 3,
        isTheEnd: false
      }
    }
  },
  methods: {
    loadMore (obj) {
      this.loading = true
      requset
        .get(`${MineOrderUrl}/${obj.sign}`, {
          page: obj.page + 1,
          size: obj.size
        })
        .then(res => {
          if (res.data.list.length < obj.size) {
            obj.isTheEnd = true
          }
          obj.page++
          obj.list = [...obj.list, ...res.data.list]
          this.loading = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.loadMore(this.buyOrder)
    this.loadMore(this.sellOrder)
    this.loadMore(this.UtilsOrder)
  }
}
</script>
<style lang='scss' scoped>
.page-tab-container /deep/ {
  flex: 1;
  overflow: hidden;
  .mint-tab-container {
    height: 100%;
    .content-wrapper {
      height: 100%;
    }
  }
}
.list-wrapper {
  height: 100%;
}
.item-wrapper {
  height: 100%;
}
</style>
