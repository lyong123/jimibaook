<template>
  <div class="trade-wrapper">
    <div class="item-line">
      <div class="line-item">
        <span>最低</span>
        <span>${{lowest}}</span>
      </div>
      <div class="line-item">
        <span>最高</span>
        <span>${{highest}}</span>
      </div>
      <div class="line-item">
        <span>当前</span>
        <span>${{current}}</span>
      </div>
    </div>
    <div class="item-line">
      <div class="line-item">
        <span>成交</span>
        <span>{{transaction}}</span>
      </div>
      <div class="line-item">
        <span>{{buy?'买单':'卖单'}}</span>
        <span>{{pay_bill}}</span>
      </div>
      <div class="line-item">
        <span>跌涨</span>
        <span>{{up_and_down}}%</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    buy: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      lowest: 2,
      highest: 223,
      current: 123,
      transaction: 98,
      pay_bill: 234,
      up_and_down: 23
    }
  }
}
</script>
<style lang="scss" scoped>
.trade-wrapper {
  height: 125px;
  display: flex;
  flex-direction: column;
  background-color: $item-color;
  .item-line {
    flex: 1;
    display: flex;
    .line-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:first-child {
        font-size: 10px;
        margin-bottom: 5px;
        color:$font-light-color;
      }
      span:nth-child(2) {
        color:#67e7da;
      }
    }
  }
}
</style>
