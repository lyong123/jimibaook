<template>
  <div class="wrapper">
    <div class="content-wrap">
      <div class="icon">集米宝</div>
      <mt-field label="账号" placeholder="请输入账号或手机号码" v-model="username"></mt-field>
      <mt-field label="密码" type="password" placeholder="请输入您的密码" v-model="password"></mt-field>
      <div class="buttom-content">
        <mt-button class="item" type="primary" @click="toLogin">登录</mt-button>
        <mt-button class="item white" type="primary" @click="toRegistered(2)">注册</mt-button>
        <span @click="toRegistered(3)">忘记密码</span>
      </div>
    </div>
  </div>
</template>
<script>
import requset from '@/http'
import { LoginUrl } from '@/http/api'
import { Toast } from 'mint-ui'
import { mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations(['setAuthorization']),
    ...mapActions(['loadUserInfo']),
    toLogin () {
      if (!this.username) {
        Toast({
          message: '请输入账号',
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

      let data
      if (/^1/.test(this.username)) {
        data = {
          phone: this.username,
          password: this.password
        }
      } else {
        data = {
          account: this.username,
          password: this.password
        }
      }

      requset.post(LoginUrl, data, undefined, {'Content-Type': 'application/json'})
        .then(res => {
          let token = res.data.token
          this.setAuthorization(token)
          this.loadUserInfo()
        })
    },
    toRegistered (n) {
      this.$emit('registered', `tab-container${n}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.mint-cell /deep/ {
  background-color: $background-color;
  color: $font-light-color;
  // border-bottom: 1px solid $item-color;
  width: 90%;
  .mint-cell-wrapper .mint-cell-title {
    width: 70px;
  }
  input.mint-field-core {
    background-color: $background-color;
  }
}
.wrapper /deep/ {
  height: 100vh;
  padding-top: 100px;
  background-color: $item-color;
  display: flex;
  justify-content: center;
  .content-wrap {
    background-color: $background-color;
    width: 90%;

    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      padding: 10px;
      border-radius: 30px;
      background-color: $buttom-color;
    }
    .buttom-content {
      margin: 10vh auto 0 auto;
      width: 100%;
      & > span {
        position: relative;
        display: inline-block;
        width: 100%;
        font-size: 14px;
        text-align: center;
        margin-top: 5px;
        color: $font-color;
      }
      .item {
        display: block;
        width: 50%;
        margin: 5px auto;
        border-radius: 30px;
      }
      .white {
        background-color: #fff;
      }
    }
  }
}
</style>
