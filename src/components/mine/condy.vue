<template>
  <page>
    <header-title title="米粒明细" backIcon="icon-allow"></header-title>
    <div class="wrapper">
      <img src="../../assets/rice.png" width="55">
      <div>
        <div class="info">
          <span>可用米粒:</span>
          <span>{{ricedata.balance}}</span>
        </div>
        <div class="info">
          <span>冻结米粒:</span>
          <span>{{ricedata.frozenfunds}}</span>
        </div>
        <div class="info">
          <span>当前总米粒:</span>
          <span>{{ricedata.lastbalance}}</span>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="item-wrapper" v-for="(n,i) in list" :key="i">
        <div class="left">
          <span>{{n.oprcodePO.oprcodename}}</span>
          <span>{{n.createtime}}</span>
        </div>
        <div class="right" style="color:red" v-if="statusList.includes(n.oprcodePO.oprcodename)">-{{n.amount}}</div>
        <div class="right" v-else>+{{n.amount}}</div>
      </div>
    </div>
  </page>
</template>
<script>
import requset from '@/http'
import { FirmflowsUrl, FirmfoundsUrl } from '@/http/api'

export default {
  data () {
    return {
      ricedata: {},
      list: [],
      statusList: ['出售', '交易手续费扣除', '兑换工具', '商城实物兑换']
    }
  },
  async beforeRouteEnter (to, from, next) {
    let list, ricedata
    list = await requset.get(FirmflowsUrl).then(res => {
      return res.data
    })
    ricedata = await requset.get(FirmfoundsUrl).then(res => {
      return res.data
    })
    next(vm => {
      vm.list = list
      vm.ricedata = ricedata
    })
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  background-color: $item-color;
  height: 20%;
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  img {
    margin-bottom: 15px;
  }
  .info {
    display: flex;
    margin-left: 10px;
    align-items: center;
    span:nth-child(1) {
      color: $font-light-color;
      font-size: 14px;
      margin-right: 5px;
    }
    span:nth-child(2) {
      color: $buttom-color;
      font-size: 18px;
    }
  }
}
.content {
  flex: 1;
  background-color: $background-color;
  .item-wrapper {
    height: 60px;
    margin-bottom: 1px;
    background-color: $item-color;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 10px;
      span:nth-child(1) {
        color: $font-light-color;
        margin-bottom: 2px;
        font-size: 14px;
      }
      span:nth-child(2) {
        color: $font-color;
        font-size: 12px;
      }
    }
    .right {
      color: $buttom-color;
      padding-right: 10px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
