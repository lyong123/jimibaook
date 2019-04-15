<template>
  <page>
    <header-title title="订单详情" backIcon="icon-allow"></header-title>
    <mt-field class="input-wrapper" label="姓名" disabled v-model="content.name"></mt-field>
    <mt-field class="input-wrapper" label="电话" disabled v-model="content.phone"></mt-field>
    <mt-field class="input-wrapper" label="微信" disabled v-model="content.wechatid"></mt-field>
    <mt-field class="input-wrapper" label="支付宝账号" disabled v-model="content.alipayid"></mt-field>
    <div class="selectImage">
      <template v-if="!content.payCertPicture">
        <Photo @selected="selectImage">
          <div class="item">
            <i v-if="!baseurl" class="icon icon-push"></i>
            <img v-else :src="baseurl" alt>
          </div>
        </Photo>
      </template>
      <template v-else>
          <img :src="content.payCertPicture" alt="">
      </template>
    </div>
    <mt-button type="primary" @click="commit">提交</mt-button>
  </page>
</template>
<script>
import Photo from '@/common/pickImage'
import requset from '@/http'
import { Toast } from 'mint-ui'
import {
  getBuyerInfo,
  getSellerInfo,
  getConfirmPay,
  getConfirmRec,
  postBaseImage
} from '@/http/api'

export default {
  components: {
    Photo
  },
  data () {
    return {
      content: {},
      baseurl: '',
      imagePath: ''
    }
  },
  methods: {
    async selectImage (url) {
      this.baseurl = url
      await requset
        .post(`${postBaseImage}?type=image&file=${this.baseurl}`)
        .then(res => {
          this.imagePath = res.data
        })
    },
    async commit () {
      if (this.$route.params.info.sign === 1) {
        await requset
          .post(`${postBaseImage}?type=image&file=${this.baseurl}`)
          .then(res => {
            this.imagePath = res.data
          })
        if (!this.baseurl || !this.imagePath) {
          Toast('上传截图')
          return
        }
        requset
          .post(
            `${getConfirmPay}/${this.$route.params.info.orderid}?picPath=${
              this.imagePath
            }`
          )
          .then(res => {
            Toast(res)
          })
      } else {
        requset
          .post(`${getConfirmRec}/${this.$route.params.info.orderid}`)
          .then(res => {
            Toast(res.data.msg)
          })
      }
    }
  },
  async beforeRouteEnter (to, from, next) {
    let url
    if (to.params.info.sign === 1) {
      url = `${getSellerInfo}/${to.params.info.match}`
    } else {
      url = `${getBuyerInfo}/${to.params.info.match}`
    }
    let res = await requset.get(url)
    next(vm => {
      vm.content = res.data
    })
  }
}
</script>
<style lang='scss' scoped>
.input-wrapper /deep/ {
  margin-top: 3px;
  background-color: $item-color;
  color: $font-light-color;
  font-size: $font-size;
  input {
    text-align: right;
  }
  .mint-field-clear {
    display: none;
  }
  .mint-cell-value.is-link {
    color: $font-color;
  }
}
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
</style>
