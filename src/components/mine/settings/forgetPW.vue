<template>
  <page>
    <header-title title="忘记密码" :backIcon="back ? `icon-allow`: ''"></header-title>
    <mt-field
      class="input-wrapper"
      label="验证码"
      placeholder="请输入验证码"
      :attr="{ maxlength: 4 }"
      v-model="code"
    >
      <div class="code-buttom" @click="getCode">
        <span>{{codeTip}}</span>
      </div>
    </mt-field>
    <mt-field class="input-wrapper" type="password" placeholder="请输入新密码" v-model="newPassword"></mt-field>
    <mt-field class="input-wrapper" type="password" placeholder="请确认新密码" v-model="comfirm"></mt-field>
    <div style="flex:1"></div>
    <mt-button type="primary" @click="commit">确定</mt-button>
  </page>
</template>
<script>
import requset from '@/http'
import { SendCodeUrl } from '@/http/api'
import { Toast } from 'mint-ui'

export default {
  props: {
    back: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      url: '',
      newPassword: '',
      comfirm: '',
      code: '',
      isSendCode: false,
      codeCount: 90,
      phone: this.$store.state.userInfo.phone
    }
  },
  watch: {
    isSendCode (newV) {
      if (newV) this.countdown()
    }
  },
  methods: {
    commit () {
      if (!this.code) {
        Toast({
          message: '请输入验证码',
          duration: 1000
        })
        return
      }
      if (!this.newPassword) {
        Toast({
          message: '请输入新密码',
          duration: 1000
        })
        return
      }
      if (!this.comfirm) {
        Toast({
          message: '请确认新密码',
          duration: 1000
        })
        return
      }
      let data
      if (this.url === '/firmpassword/resetLoginPawwoord') {
        data = {
          phoneCode: this.code,
          newPassword: this.newPassword,
          newprePassword: this.comfirm
        }
      } else {
        data = {
          phoneCode: this.code,
          newTradePassword: this.newPassword,
          newpreTradePassword: this.comfirm
        }
      }

      requset
        .post(this.url, data)
        .then(res => {
          Toast({
            message: '修改成功',
            duration: 1000
          })
          this.$router.back()
        })
        .catch(err => {
          Toast({
            message: err.message,
            duration: 1000
          })
        })
    },
    countdown () {
      this.timer = setInterval(() => {
        this.codeCount--
        if (this.codeCount === 0) {
          clearInterval(this.timer)
          this.isSendCode = false
          this.codeCount = 90
        }
      }, 1000)
    },
    getCode () {
      if (this.isSendCode) {
        Toast({
          message: '验证码已发送',
          duration: 1000
        })
        return
      }
      requset
        .post(SendCodeUrl, {
          phone: this.phone
        })
        .then(res => {
          this.isSendCode = true
          Toast({
            message: '验证码已发送',
            duration: 1000
          })
        })
        .catch(res => {})
    }
  },
  computed: {
    codeTip () {
      return this.isSendCode ? `已发送 ${this.codeCount}s` : '获取验证码'
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.url) {
      next(vm => {
        vm.url = to.params.url
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.input-wrapper /deep/ {
  margin-top: 3px;
  background-color: $item-color;
  color: $font-light-color;
  font-size: $font-size;

  .mint-field-clear {
    display: none;
  }
  .mint-cell-value.is-link {
    color: $font-color;
  }
}
.code-buttom {
  color: $buttom-font-color;
  background-color: $buttom-color;
  font-size: 12px;
  padding: 5px;
  border-radius: 30px;
}
</style>
