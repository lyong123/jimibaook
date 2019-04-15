<template>
  <page>
    <router-view class="router-view-class"></router-view>
    <mt-popup v-model="popupVisible" position="bottom">
      <releaseOrder/>
    </mt-popup>
    <header-title title="交换中心" rightInfo="发布订单" @clickRightInfo="popupVisible=true"/>

    <div class="nav">
      <mt-navbar v-model="active">
        <mt-tab-item id="tab-container1">买单列表</mt-tab-item>
        <mt-tab-item id="tab-container2">卖单列表</mt-tab-item>
        <div class="search-wrapper" @click="jumpTo">
          <i class="icon icon-magnifier"></i>
        </div>
      </mt-navbar>
    </div>

    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container" v-model="active">
        <mt-tab-container-item id="tab-container1" class="item-container-wrapper">
          <div class="content-wrapper">
            <tradingInfo class="trading-info"/>
            <div class="list-wrapper">
              <div v-for="n in 10" :key="n">
                <trade-item/>
              </div>
            </div>
          </div>
        </mt-tab-container-item>

        <mt-tab-container-item id="tab-container2" class="item-container-wrapper">
          <div class="content-wrapper">
            <tradingInfo :buy="false" class="trading-info"/>
            <div class="list-wrapper">
              <div v-for="n in 10" :key="n">
                <trade-item :buy="false"/>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </page>
</template>
<script>
import TradingInfo from './tradingInfo'
import TradeItem from './tradeItem'
import ReleaseOrder from './releaseOrder'
import HeaderTitle from '../../components/header'

export default {
  components: {
    TradingInfo,
    TradeItem,
    HeaderTitle,
    ReleaseOrder
  },
  data () {
    return {
      active: 'tab-container1',
      popupVisible: true
    }
  },
  methods: {
    jumpTo () {
      this.$router.push({ path: '/transaction/search' })
    }
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
      overflow-y: auto;
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
