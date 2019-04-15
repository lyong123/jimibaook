<template>
  <div class="trade-wrapper">
    <div class="avatar">
      <img v-if="orderInfo.firm.headimage" :src="orderInfo.firm.headimage">
      <img v-else src="../../assets/rice.png">
    </div>
    <div class="price info-style">
      <span>{{orderInfo.firm.nickname}}</span>
      <span>单价:{{orderInfo.price}}</span>
    </div>
    <div class="count info-style">
      <span>最近30日成交:{{'all_count'}}</span>
      <span>数量:{{orderInfo.number / 1000}}千克</span>
    </div>
    <div class="btn">
      <mt-button class="bottom" :disabled="traded" @click="$emit('open')" v-if="orderInfo.sign==1?true:false">出售</mt-button>
      <mt-button class="bottom" :disabled="traded" @click="$emit('open')" v-else>买入</mt-button>
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
    }
  }
}
</script>
<style lang="scss" scoped>
.trade-wrapper {
  height: 70px;
  background-color: $item-color;
  margin-bottom: 5px;
  display: flex;
  overflow: hidden;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .avatar {
    width: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      padding-left:5px;
    }
  }
  .price {
    width: 85px;
    margin-right:5px;
  }
  .count {
    flex:1;
  }
  .btn {
    box-sizing: border-box;
    padding-left: 3px;
    margin-right:10px;
    display: flex;
    align-items: center;
    .bottom {
      width: 51px;
      height: 38px;
      font-size: 13px;
      background-color: $buttom-color;
    }
  }
  .info-style {
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;

    span:nth-child(1) {
      font-size: 10px;
      margin-bottom: 6px;
      color: $font-color;
    }
    span:nth-child(2) {
      font-size: 13px;
      color:$buttom-color;
    }
  }
}
</style>
