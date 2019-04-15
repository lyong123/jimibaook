<template>
  <page>
    <header-title title="实名认证" backIcon="icon-allow"></header-title>
    <mt-field :disabled="already" class="input-wrapper" label="姓名" placeholder="请输入您的真实姓名" v-model="username"></mt-field>
    <mt-field :disabled="already" class="input-wrapper" label="身份证" placeholder="请输入您的真实身份证" v-model="identity"></mt-field>
    <div @click="show">
      <mt-cell class="input-wrapper" title="银行名称" is-link>{{bankName}}</mt-cell>
    </div>
    <mt-field :disabled="already" class="input-wrapper" label="银行卡" placeholder="卡号一经填写，不能修改" v-model="bankCard"></mt-field>
    <mt-field :disabled="already" class="input-wrapper" label="支付宝" placeholder="请输入您的支付宝账号" v-model="alipay"></mt-field>
    <span
      class="announcement"
    >亲爱的集米宝用户，您好。为保证用户的真实性，集米宝将调用第三方公司认证系统进行实人认证，整个认证过程中做用户真实性匹配对比，不做其他任何用途。人脸认证成功之后，用户需要支付一元认证费用，用于第三方公司认证费用及信息费，如您不愿认证请勿认证及支付。如您认证完成并成功支付一元，将视为同意此协议。</span>

    <mt-actionsheet :actions="bankList" v-model="bankSheetVisible"></mt-actionsheet>
    <mt-button @click="commit" class="buttom-wrapper" type="primary">提交</mt-button>
  </page>
</template>

<script>
import requset from '@/http'
import { RealNameUrl, BankInfoUrl } from '@/http/api'
import { Toast } from 'mint-ui'
import { mapActions } from 'vuex'
import store from '@/store/store'

export default {
  data () {
    return {
      bankSheetVisible: false,
      already: false,
      username: '',
      identity: '',
      bankId: '',
      bankName: '',
      bankCard: '',
      alipay: '',
      bankList: []
    }
  },
  methods: {
    ...mapActions(['loadUserInfo']),
    show () {
      if (this.already) return
      this.bankSheetVisible = true
    },
    commit () {
      if (!this.username) {
        Toast({
          message: '请输入姓名',
          duration: 1000
        })
        return
      }
      if (!this.identity) {
        Toast({
          message: '请输入身份证号',
          duration: 1000
        })
        return
      }
      if (!this.bankId) {
        Toast({
          message: '请选择银行名称',
          duration: 1000
        })
        return
      }
      if (!this.bankCard) {
        Toast({
          message: '请输入银行卡号',
          duration: 1000
        })
        return
      }
      if (!this.alipay) {
        Toast({
          message: '请输入支付宝',
          duration: 1000
        })
        return
      }
      let params = {
        name: this.username,
        idcard: this.identity,
        bankaccount: this.bankCard,
        alipayid: this.alipay,
        bankid: this.bankId
      }
      requset.post(RealNameUrl, params).then(res => {
        if (res.data.success) {
          Toast({
            message: '提交成功',
            duration: 1000
          })
          this.loadUserInfo()
        }
      })
    }
  },
  async beforeRouteEnter (to, from, next) {
    let res = await requset.get(BankInfoUrl)

    next(vm => {
      let { name, idcard, bankaccount, alipayid, bankid } = store.state.userInfo
      vm.username = name
      vm.identity = idcard
      vm.bankCard = bankaccount
      vm.alipay = alipayid
      vm.bankId = bankid
      if (name && idcard) {
        vm.already = true
      }
      let banklist = res.data.map(i => {
        return {
          bankid: i.bankid,
          name: i.bankname,
          method: n => {
            vm.bankId = n.bankid
            vm.bankName = n.name
          }
        }
      })
      vm.bankList = banklist
    })
  }
}
</script>
<style lang='scss' scoped>
.input-wrapper {
  margin-top: 3px;
  background-color: $item-color;
  color: $font-light-color;
  font-size: $font-size;
}
.announcement {
  font-size: 12px;
  line-height: 14px;
  color: $font-color;
  padding: 10px;
  flex: 1;
}
</style>
