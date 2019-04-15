<template>
  <div>
    <mt-field label="手机号" placeholder="Input 手机号" v-model="phoneNumber"></mt-field>
    <mt-field label="验证码" placeholder="Input 验证码" v-model="verificationCode"></mt-field>
    <mt-field label="密码" placeholder="Input 密码" v-model="password"></mt-field>
    <mt-field label="推荐人" placeholder="Input 推荐人" v-model="ReferrerID"></mt-field>
    <mt-button type="primary">获取验证码</mt-button>
    <mt-button type="danger">确定</mt-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      phoneNumber: '',
      verificationCode: '',
      password: '',
      ReferrerID: ''
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
