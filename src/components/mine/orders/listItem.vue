<template>
  <div class="trade-wrapper" @click="jump(orderInfo)">
    <div class="price info-style">
      <span>{{status[orderInfo.status]}}</span>
      <span>单价:{{orderInfo.price}}</span>
      <span>{{orderInfo.sfee?`手续费率:${orderInfo.sfee}`:``}}</span>
    </div>
    <div class="count info-style">
      <span>{{orderInfo.ordertime}}</span>
      <span>数量:{{orderInfo.number}}</span>
      <span>{{orderInfo.frozennumber?`冻结数量:${orderInfo.frozennumber}`:``}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    orderInfo: {
      type: Object,
      required: true
    },
    traded: {
      type: Boolean
    }
  },
  data () {
    return {
      status: {
        1: '买家挂单求购状态',
        2: '（进去付款）卖家出售等待买家付款',
        3: '（进去确认）买家已付款,等待卖家确认收款',
        4: '卖家确认收款订单成交',
        5: '卖家挂出售单',
        6: '向平台购买工具成功',
        7: '买家撤销',
        8: '双方撤销'
      }
    }
  },
  methods: {
    jump (info) {
      if (info.sign === 1 && info.status === 2) {
        this.$router.push({ name: 'Comfirm', params: { info } })
      }
      if (info.sign === 2 && info.status === 3) {
        this.$router.push({ name: 'Comfirm', params: { info } })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.trade-wrapper {
  padding: 5px 0;
  background-color: $item-color;
  margin-bottom: 5px;
  display: flex;
  overflow: hidden;
  .avatar {
    width: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      padding-left: 5px;
    }
  }
  .price {
    flex: 1;
    margin-left: 30px;
  }
  .count {
    flex: 1;
    margin-right: 20px;
  }
  .info-style {
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;
    padding: 5px;
    span:nth-child(1) {
      font-size: 12px;
      margin-bottom: 6px;
      color: $font-color;
    }
    span:nth-child(2) {
      font-size: 13px;
      color: $buttom-color;
      margin-bottom: 3px;
    }
    span:nth-child(3) {
      font-size: 13px;
      color: $buttom-color;
    }
  }
}
</style>
