<template>
  <div class="wrapper">
    <div class="icon">{{tradingObj.sign==1?'出售':'买入'}}</div>
    <div class="desc">
      <span>正在{{tradingObj.sign==1?'出售':'买入'}}大米</span>
      <span>大米余额:{{0.239847}}</span>
    </div>
    <div class="order">
      <div class="item">
        <span>{{tradingObj.price}}</span>
        <span>单价</span>
      </div>
      <div class="item">
        <span>{{tradingObj.number}}</span>
        <span>数量</span>
      </div>
    </div>
    <div class="password">
      <span class="tip">提示: 请认真核对单价以及数量</span>
      <mt-field class="input-wrapper" label="交易密码" placeholder="请输入交易密码" v-model="password"></mt-field>
    </div>
    <div class="buttom">
      <mt-button class="item" @click="$emit('cancel')" type="primary" plain>取消</mt-button>
      <mt-button class="item" @click="commit" type="primary">确定</mt-button>
    </div>
  </div>
</template>

<script>
import requset from '@/http'
import { SellOrderUrl, BuyOrderUrl } from '@/http/api'
import { MessageBox, Toast } from 'mint-ui'
export default {
  props: {
    tradingObj: {
      type: Object
    }
  },
  data () {
    return {
      password: ''
    }
  },
  computed: {
    url () {
      return this.tradingObj.sign === 1 ? SellOrderUrl : BuyOrderUrl
    }
  },
  methods: {
    commit () {
      if (!this.password) {
        MessageBox('提示', '请输入密码')
        return
      }
      requset.post(`${this.url}/${this.tradingObj.orderid}`, {
        orderid: this.tradingObj.orderid,
        owner: this.tradingObj.firmid,
        tradepassword: this.password
      }).then(res => {
        if (res.success) {
          this.$emit('cancel', this.tradingObj.orderid)
          this.password = ''
          Toast('交易完成')
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  height: 55vh;
  width: 100vw;
  position: relative;
  background-color: $item-color;
  display: flex;
  flex-direction: column;
  .icon {
    width: 50px;
    height: 50px;
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 12px 0px #e9e9e9;
    background-color: #ffaa23;
    color: #fff;
  }
  .desc {
    height: 60px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span:nth-child(1) {
      color: $font-light-color;
      font-size: 15px;
      margin-bottom: 8px;
    }
    span:nth-child(2) {
      font-size: 13px;
      color: $font-color;
    }
  }
  .order {
    flex: 1;
    display: flex;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:nth-child(1) {
        color: $font-light-color;
        font-size: 30px;
        margin-bottom: 8px;
      }
      span:nth-child(2) {
        font-size: 14px;
        color: $font-color;
      }
    }
  }
  .password{
    .tip{
      font-size:14px;
      margin-bottom:10px;
      color:$buttom-color;
      margin-left: 10px;
    }
    .input-wrapper{
      background-color:$background-color;
      color:$font-light-color;
      margin:10px 10px 0 10px ;

    }
  }
  .buttom{
    display: flex;
    padding: 5px;
    .item{
      flex:1;
      font-size:14px;
    }
  }
}
</style>
