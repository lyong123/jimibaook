<template>
  <page>
    <header-title title="实名认证" backIcon="icon-allow"></header-title>
    <mt-field class="input-wrapper" label="姓名" placeholder="请输入您的真实姓名" v-model="username"></mt-field>
    <mt-field class="input-wrapper" label="身份证" placeholder="请输入您的真实身份证" v-model="identity"></mt-field>
    <mt-cell class="input-wrapper" title="银行名称" to is-link></mt-cell>
    <mt-field class="input-wrapper" label="银行卡" placeholder="卡号一经填写，不能修改" v-model="bankCard"></mt-field>
    <mt-field class="input-wrapper" label="支付宝" placeholder="请输入您的支付宝账号" v-model="alipay"></mt-field>
    <span
      class="announcement"
    >亲爱的集米宝用户，您好。为保证用户的真实性，集米宝将调用第三方公司认证系统进行实人认证，整个认证过程中做用户真实性匹配对比，不做其他任何用途。人脸认证成功之后，用户需要支付一元认证费用，用于第三方公司认证费用及信息费，如您不愿认证请勿认证及支付。如您认证完成并成功支付一元，将视为同意此协议。</span>
    <mt-button class="buttom-wrapper" type="primary">提交</mt-button>
  </page>
</template>

<script>
import HeaderTitle from '../header'

export default {
  components: {
    HeaderTitle
  },
  data () {
    return {
      username: '',
      identity: '',
      bankCard: '',
      alipay: ''
    }
  }
}
</script>
<style lang='scss' scoped>
.input-wrapper {
  margin-top: 5px;
  background-color: $item-color;
  color: $font-color;
  font-size: $font-size;
}
.announcement{
  font-size: 12px;
  line-height: 14px;
  color:$font-color;
  padding: 10px;
  flex:1;
}
</style>
