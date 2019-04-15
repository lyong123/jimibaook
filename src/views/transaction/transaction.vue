<template>
  <page>
    <router-view class="router-view-class"></router-view>
    <mt-popup v-model="popupVisible" position="bottom">
      <buy-or-sell :tradingObj="tradingObj" @cancel="cancle"/>
    </mt-popup>
    <header-title title="交换中心" rightInfo="发布订单" @clickRightInfo="jumpTo('releaseOrder')"/>

    <div class="nav">
      <mt-navbar v-model="active">
        <mt-tab-item id="1">买单列表</mt-tab-item>
        <mt-tab-item id="2">卖单列表</mt-tab-item>
        <div class="search-wrapper" @click="jumpTo('search')">
          <i class="icon icon-magnifier"></i>
        </div>
      </mt-navbar>
    </div>

    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active">
        <mt-tab-container-item id="1" class="item-container-wrapper">
          <div class="content-wrapper">
            <tradingInfo :buy="active=='1'?true:false" class="trading-info"/>
            <scroll
              v-if="buyOrder.list.length > 0"
              class="list-wrapper"
              :loading="loading"
              :isTheEnd="buyOrder.isTheEnd"
              @loadMore="loadMore(buyOrder)"
            >
              <div v-for="(item,index) in buyOrder.list" :key="`_${index}`">
                <trade-item :orderInfo="item" :traded="tradingArr.includes(item.orderid)" @open="sellOrBuy(item)"/>
              </div>
            </scroll>
          </div>
        </mt-tab-container-item>

        <mt-tab-container-item id="2" class="item-container-wrapper">
          <div class="content-wrapper">
            <tradingInfo :buy="active=='1'?true:false" class="trading-info"/>
            <scroll
              v-if="sellOrder.list.length > 0"
              class="list-wrapper"
              :loading="loading"
              :isTheEnd="sellOrder.isTheEnd"
              @loadMore="loadMore(sellOrder)"
            >
              <div v-for="(item,index) in sellOrder.list" :key="`_${index}`">
                <trade-item :orderInfo="item" :traded="tradingArr.includes(item.orderid)" @open="sellOrBuy(item)"/>
              </div>
            </scroll>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </page>
</template>
<script>
import TradingInfo from './tradingInfo'
import TradeItem from './tradeItem'
import BuyOrSell from './buyOrSell'
import Scroll from '@/common/scroll'
import requset from '@/http'
import { OrderListUrl } from '@/http/api'

export default {
  components: {
    TradingInfo,
    TradeItem,
    BuyOrSell,
    Scroll
  },
  data () {
    return {
      active: '1',
      popupVisible: false,
      tradingArr: [],
      loading: false,

      tradingObj: {},
      buyOrder: {
        list: [],
        page: 0,
        size: 10,
        sign: 1,
        status: 1,
        isTheEnd: false
      },
      sellOrder: {
        list: [],
        page: 0,
        size: 10,
        sign: 2,
        status: 5,
        isTheEnd: false
      }
    }
  },
  methods: {
    cancle (Oid) {
      this.tradingArr.push(Oid)
      this.popupVisible = false
    },
    sellOrBuy (data) {
      this.tradingObj = data
      this.popupVisible = true
    },
    jumpTo (page) {
      this.$router.push({ path: `/transaction/${page}` })
    },
    loadMore (obj) {
      this.loading = true
      requset
        .get(`${OrderListUrl}/${obj.sign}`, {
          status: obj.status,
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
  }
}
</script>
<style lang="scss" scoped>
.page-tab-container {
  flex: 1;
  overflow: hidden;
  .page-tabbar-tab-container {
    height: 100%;
    overflow: hidden;
  }
}

.item-container-wrapper {
  height: 100%;
  overflow: hidden;
  .content-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    .trading-info {
      margin-bottom: 12px;
    }
    .list-wrapper {
      flex: 1;
    }
  }
}
.mint-tab-item.is-selected {
  border-bottom: 3px solid $buttom-color;
  color: $buttom-color;
}

.search-wrapper {
  width: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
</style>
