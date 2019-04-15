<template>
  <div class="wrapper">
    <div class="content-wrap">
      <div class="icon">集米宝</div>
      <mt-field label="手机号" placeholder="请输入手机号码" :attr="{ maxlength: 11 }" v-model="telephone"></mt-field>
      <mt-field label="验证码" placeholder="请输入验证码" :attr="{ maxlength: 4 }" v-model="code">
        <div class="code-buttom" @click="getCode">
          <span>{{codeTip}}</span>
        </div>
      </mt-field>
      <mt-field label="密码" type="password" placeholder="请输入您的密码" v-model="password"></mt-field>
      <mt-field label="确认密码" type="password" placeholder="请再次输入您的密码" v-model="secPassword"></mt-field>
      <mt-field label="推荐人" placeholder="请输入推荐人" v-model="referrer"></mt-field>
      <div class="buttom-content">
        <mt-button class="buttom" type="primary" @click="commit">
          <span>确定</span>
        </mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import requset from '@/http'
import { RegisterUrl, SendCodeUrl } from '@/http/api'
import { Toast } from 'mint-ui'
import { setInterval, clearInterval } from 'timers'

export default {
  data () {
    return {
      isSendCode: false,
      codeCount: 90,
      telephone: '',
      password: '',
      secPassword: '',
      code: '',
      referrer: ''
    }
  },
  watch: {
    isSendCode (newV) {
      if (newV) this.countdown()
    }
  },
  methods: {
    countdown () {
      let timer = setInterval(() => {
        this.codeCount--
        if (this.codeCount === 0) {
          clearInterval(timer)
          this.isSendCode = false
          this.codeCount = 90
        }
      }, 1000)
    },
    checkFormat (rule, toast) {
      if (rule) {
        Toast({
          message: toast,
          duration: 1000
        })
        return false
      }
      return true
    },
    getCode () {
      let sub
      sub = this.checkFormat(this.telephone === '', '请输入手机号')
      sub =
        sub &&
        this.checkFormat(
          !/^1\d{10}/.test(this.telephone),
          '请输入正确的手机号'
        )
      sub = sub && this.checkFormat(this.isSendCode, '验证码已发送')
      if (!sub) return
      this.isSendCode = true
      requset
        .post(`${SendCodeUrl}?phone=${this.telephone}`, null, undefined, {
          'Content-Type': 'application/json'
        })
        .then(res => {
          Toast({
            message: '验证码已发送',
            duration: 1000
          })
        })
    },
    commit () {
      let sub
      sub = this.checkFormat(this.telephone === '', '请输入手机号')
      sub =
        sub &&
        this.checkFormat(
          !/^1\d{10}/.test(this.telephone),
          '请输入正确的手机号'
        )
      sub = sub && this.checkFormat(!this.code, '请输入验证码')
      sub = sub && this.checkFormat(!this.password, '请输入密码')
      sub =
        sub &&
        this.checkFormat(
          this.password !== this.secPassword,
          '再次输入密码不一致'
        )
      if (!sub) return
      requset
        .post(RegisterUrl, {
          phone: this.telephone,
          password: this.password,
          repassword: this.secPassword,
          code: this.code,
          superior: this.referrer
        }, undefined, {
          'Content-Type': 'application/json'
        })
        .then(res => {
          this.isSendCode = false
          Toast({
            message: '注册成功，请登录',
            duration: 1000
          })
          this.$emit('registered', 'tab-container1')
          this.telephone = ''
          this.password = ''
          this.secPassword = ''
          this.code = ''
          this.referrer = ''
        })
    }
  },
  computed: {
    codeTip () {
      return this.isSendCode ? `已发送 ${this.codeCount}s` : '获取验证码'
    }
  }
}
</script>
<style lang="scss" scoped>
.mint-cell /deep/ {
  background-color: $background-color;
  color: $font-light-color;
  // border-bottom: 1px solid $item-color;
  margin: 0 20px;
  width: 90%;
  .mint-cell-wrapper .mint-cell-title {
    width: 70px;
  }
  input.mint-field-core {
    background-color: $background-color;
  }
}
.wrapper {
  height: 100vh;
  padding-top: 100px;
  background-color: $item-color;
  display: flex;
  justify-content: center;
  .content-wrap {
    background-color: $background-color;
    height: 60%;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      padding: 10px;
      border-radius: 30px;
      background-color: $buttom-color;
    }
    .code-buttom {
      color: $buttom-font-color;
      background-color: $buttom-color;
      font-size: 12px;
      padding: 5px;
      border-radius: 30px;
    }
    .buttom-content {
      margin-top: 30px;
      width: 100%;
      text-align: center;
      .mint-button--primary {
        margin: 3px;
      }
      .mint-button {
        height: 35px;
      }
      .buttom {
        width: 50%;
        border-radius: 50px;
      }
      .white {
        background-color: #fff;
      }
    }
  }
}
</style>
