<template>
<page>
    <header-title title="交换密码" backIcon="icon-allow"></header-title>
    <span class="tip">提示：新注册用户初始交换密码为123456</span>
    <mt-field class="input-wrapper" type="password" placeholder="请输入原密码" v-model="oldPassword"></mt-field>
    <mt-field class="input-wrapper" type="password" placeholder="请输入新密码" v-model="newPassword"></mt-field>
    <mt-field class="input-wrapper" type="password" placeholder="请确认新密码" v-model="comfirm"></mt-field>
    <span class="forget" @click="forget">忘记密码</span>
    <div style="flex:1"></div>
    <mt-button type="primary" @click="commit">确定</mt-button>

</page>
</template>
<script>
import requset from '@/http'
import { ChangeExchangeUrl, ForgetExchangeUrl } from '@/http/api'
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      comfirm: ''
    }
  },
  methods: {
    commit () {
      if (!this.oldPassword) {
        Toast({
          message: '请输入原始密码',
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

      requset.post(ChangeExchangeUrl, {
        oldTradePassword: this.oldPassword,
        newTradePassword: this.newPassword,
        newpreTradePassword: this.comfirm
      }).then(res => {
        Toast({
          message: '修改成功',
          duration: 1000
        })
        this.$router.back()
      }).catch(err => {
        Toast({
          message: err.message,
          duration: 1000
        })
      })
    },
    forget () {
      this.$router.replace({name: 'ForgetPW', params: {url: ForgetExchangeUrl}})
    }
  }
}
</script>
<style lang='scss' scoped>
.tip{
    color:$font-light-color;
    font-size:12px;
    padding: 10px;
}
.forget{
    border-bottom: 1px solid $font-light-color;
    color:$font-light-color;
    font-size:14px;
    width:60px;
    margin-top:10px;
    margin-right:10px;
    text-align: center;
    align-self: flex-end;
}
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
</style>
