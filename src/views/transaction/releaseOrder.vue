<template>
  <page>
    <header-title title="发布订单" backIcon="icon-allow"></header-title>
    <div class="sign-type">
      <span :class="{selected:sign === '1'}" @click="change('1')">出售</span>
      <span :class="{selected:sign === '2'}" @click="change('2')">买入</span>
    </div>
    <mt-field
      class="input-wrapper"
      type="number"
      label="数额"
      placeholder="请输入数额(千克)..."
      v-model="volume"
    ></mt-field>
    <mt-field class="input-wrapper" type="number" label="价格" placeholder="请输入价格..." v-model="price"></mt-field>
    <mt-field
      class="input-wrapper"
      type="password"
      label="密码"
      placeholder="请输入密码..."
      v-model="password"
    ></mt-field>
    <mt-cell class="input-wrapper" title="是否自动匹配">
      <mt-switch class="switch" v-model="automatic"></mt-switch>
    </mt-cell>
    <div style="flex:1"></div>
    <mt-button class="button" type="primary" @click="commit">提交</mt-button>
  </page>
</template>
<script>
import requset from '@/http'
import { PushOrderUrl } from '@/http/api'
import store from '@/store/store'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      volume: '',
      price: '',
      password: '',
      automatic: false,
      sign: '1'
    }
  },
  methods: {
    change (type) {
      this.sign = type
    },
    commit () {
      if (!this.volume) {
        Toast({
          message: '请输入数额',
          duration: 1000
        })
        return
      }
      if (Number(this.volume) <= 0) {
        this.volume = ''
        Toast({
          message: '数额必须大于0',
          duration: 1000
        })
        return
      }
      if (!this.price) {
        Toast({
          message: '请输入价格',
          duration: 1000
        })
        return
      }
      if (Number(this.price) <= 0) {
        this.price = ''
        Toast({
          message: '价格必须大于0',
          duration: 1000
        })
        return
      }
      if (!this.password) {
        Toast({
          message: '请输入密码',
          duration: 1000
        })
        return
      }

      requset
        .post(`${PushOrderUrl}/${this.sign}`, {
          sign: this.sign,
          volume: this.volume * 1000,
          price: this.price,
          tradepassword: this.password,
          firmid: store.state.userInfo.firmid,
          autoMatch: Number(this.automatic)
        })
        .then(res => {
          Toast('订单申请成功！')
          this.$router.back()
        })
    }
  }
}
</script>
<style lang='scss' scoped>
.sign-type {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 20px 0;
  span {
    height: 40px;
    width: 80px;
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    color: $font-light-color;
    background-color: $item-color;
  }
  .selected {
    background-color: $buttom-color;
    color: $buttom-font-color;
  }
}
.input-wrapper /deep/ {
  margin-top: 5px;
  background-color: $item-color;
  color: $font-light-color;
  .mint-switch-input:checked + .mint-switch-core {
    border-color: $buttom-color;
    background-color: $buttom-color;
  }
}
</style>
