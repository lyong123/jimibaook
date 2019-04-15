<template>
  <page>
    <header-title title="问题反馈" backIcon="icon-allow"></header-title>
    <mt-field class="input-wrapper" label="姓名" placeholder="请输入您的姓名" v-model="username"></mt-field>
    <mt-field
      class="input-wrapper"
      label="手机号"
      placeholder="请输入手机号码..."
      :attr="{ maxlength: 11 }"
      v-model="telephone"
    ></mt-field>
    <mt-field class="input-wrapper" label="身份证" placeholder="请输入您的身份证" v-model="idcard"></mt-field>
    <div @click="showList">
      <mt-cell class="input-wrapper" title="问题类型" is-link>
        <span class="span-style">{{problemType}}</span>
      </mt-cell>
    </div>
    <mt-field
      class="textarea-wrapper"
      placeholder="请用文字描述一下集米宝APP程序出现的问题..."
      type="textarea"
      rows="6"
      v-model="problemDesc"
    ></mt-field>
    <div class="selectImage">
      <Photo @selected="selectImage">
        <div class="item">
          <i v-if="!avatarUrl" class="icon icon-push"></i>
          <img v-else :src="avatarUrl" alt>
        </div>
      </Photo>
    </div>
    <div style="flex:1"></div>
    <mt-button type="primary" @click="commit">提交</mt-button>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </page>
</template>
<script>
import { FeedbackUrl } from '@/http/api'
import { Toast } from 'mint-ui'
import Photo from '@/common/pickImage'
import request from '@/http'

export default {
  components: {
    Photo
  },
  data () {
    return {
      avatarUrl: '',
      sheetVisible: false,
      actions: [
        {
          name: '解绑(提供身份证正反面)',
          method: n => {
            this.problemType = n.name
          }
        },
        {
          name: '解冻(提供身份证正反面)',
          method: n => {
            this.problemType = n.name
          }
        },
        {
          name: '商圈售后(提供订单号截图)',
          method: n => {
            this.problemType = n.name
          }
        },
        {
          name: '其他问题',
          method: n => {
            this.problemType = n.name
          }
        }
      ],
      username: '',
      telephone: '',
      idcard: '',
      problemDesc: '',
      problemType: '点击选择问题类型'
    }
  },
  methods: {
    selectImage (url) {
      this.avatarUrl = url
    },
    showList () {
      this.sheetVisible = !this.sheetVisible
    },
    commit () {
      if (!this.username) {
        Toast({
          message: '请输入您的姓名',
          duration: 1000
        })
        return
      }
      if (!this.telephone) {
        Toast({
          message: '请输入您的手机号',
          duration: 1000
        })
        return
      }
      if (!/^1\d{10}/.test(this.telephone)) {
        Toast({
          message: '请输入正确的手机号',
          duration: 1000
        })
        return
      }
      if (!this.idcard) {
        Toast({
          message: '请输入您的身份证',
          duration: 1000
        })
        return
      }
      if (this.problemType === '点击选择问题类型') {
        Toast({
          message: '请选择问题类型',
          duration: 1000
        })
        return
      }
      if (!this.problemDesc) {
        Toast({
          message: '请输入问题详情',
          duration: 1000
        })
      }
      if (!this.avatarUrl) {
        Toast({
          message: '请选择反馈图片',
          duration: 1000
        })
      }
      let params = {
        name: this.username,
        phone: this.telephone,
        idcard: this.idcard,
        content: this.problemDesc,
        messagetype: this.problemType,
        file: this.avatarUrl,
        type: 'feedback'
      }
      request.post(FeedbackUrl, params).then(res => {
        if (res.success) {
          Toast('提交成功！')
          this.$router.back()
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.selectImage {
  padding: 10px;
  .item {
    height: 50px;
    line-height: 50px;
    text-align: center;
    width: 50px;
    background-color: $item-color;
    i {
      font-size: 30px;
      color: $font-color;
    }
  }
}
.input-wrapper {
  margin-top: 3px;
  background-color: $item-color;
  color: $font-light-color;
  font-size: $font-size;
}
.textarea-wrapper /deep/ {
  margin-top: 3px;
  background-color: $item-color;
  z-index: 1000;
  textarea {
    background-color: $item-color;
    color: $font-light-color;
    font-size: $font-size;
  }
}
.span-style {
  color: $font-color;
}
</style>
