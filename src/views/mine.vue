<template>
  <page>
    <router-view class="router-view-class"></router-view>
    <div class="header-wrapper">
      <div class="user-title">
        <img :src="avatar">
        <span>ID: {{userInfo.tuijianma}}</span>
        <i class="icon icon-setting" @click="routerGo('settings')"></i>
      </div>
      <div class="user-info">
        <div class="info-item" @click="routerGo('level')">
          <span>Lv{{userInfo.levelid}}</span>
          <span>
            <i class="icon icon-level" style="color:#fca65d"></i>
            <span>{{'会员等级'}}</span>
          </span>
        </div>
        <div class="info-item" >
          <span>{{userInfo.activevalue}}</span>
          <span>
            <i class="icon icon-activity" style="color:#ff362e"></i>
            <span>{{'活跃度'}}</span>
          </span>
        </div>
        <div class="info-item" >
          <span>{{userInfo.contribution}}</span>
          <span>
            <i class="icon icon-gift" style="color:#f9efb4"></i>
            <span>{{'贡献值'}}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="link-wrapper">
      <mt-cell class="link-item margin2" title="总大米" to="/mine/candy" is-link :value="userInfo.lastbalance"></mt-cell>
      <!-- <mt-cell class="link-item margin7" title="钱包地址">
        <div class="description">
          sdf893u298ua9d8f3r39af3rf848f
          <i
            class="icon icon-paper"
            style="color:#fff;margin-left:5px;"
          ></i>
        </div>
      </mt-cell> -->
      <mt-cell class="link-item margin2" title="抽奖专区" to="/mine/lottery" is-link></mt-cell>
      <mt-cell class="link-item margin7" title="身份信息" to="/mine/identity" is-link>
        <div class="tip">{{certification?'已认证':'未认证'}}</div>
      </mt-cell>
      <mt-cell class="link-item margin2" title="我的订单" to="/mine/order" is-link></mt-cell>
      <!-- <mt-cell class="link-item margin2" title="商圈订单" to="/mine/order" is-link></mt-cell> -->
      <mt-cell class="link-item margin7" title="收货地址" to="/mine/address" is-link></mt-cell>
      <mt-cell class="link-item margin2" title="我的团队" to="/mine/myTeam" is-link></mt-cell>
      <mt-cell class="link-item margin2" title="问题反馈" to="/mine/feedHistory" is-link></mt-cell>
      <mt-cell class="link-item margin2" title="检测版本" to="/mine/version">
        <div class="tip radius">当前版本:{{'3.0.1'}}</div>
      </mt-cell>
      <mt-cell class="link-item margin35" title="联系客服">
        <a class="description" href="tel:13509920394">400-6034-110</a>
      </mt-cell>
      <div style="background-color:#36344c"></div>
    </div>
  </page>
</template>

<script>
import {baseURL} from '@/http/api'
import {avatar as Davatar} from '@/store/constant'
export default {
  data () {
    return {
      userInfo: {},
      servicePhone: '400-6034-110',
      certification: false
    }
  },
  computed: {
    avatar () {
      return this.userInfo.headimage ? `${baseURL}${this.userInfo.headimage}` : Davatar
    }
  },
  methods: {
    routerGo (page) {
      this.$router.push({ path: `/mine/${page}` })
    }
  },
  async created () {
    this.userInfo = this.$store.state.userInfo
    // eslint-disable-next-line no-sequences
    if (this.userInfo.account, this.userInfo.nickname) {
      this.certification = true
    }
  }
}
</script>
<style lang="scss" scoped>
a{
  color:$font-color;
  text-decoration: none;
}
.header-wrapper {
  background-image: url('../assets/mine.jpg');
  color: $font-light-color;
  position: relative;
  height: 300px;
  .user-title {
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-top: 10px;
    img {
      border: 5px solid #999;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-bottom: 12px;
    }
    span {
      font-size: 13px;
    }
    .icon-setting {
      position: absolute;
      right: 5px;
      top: 5px;
      padding: 10px;
    }
  }
  .user-info {
    height: 70px;
    display: flex;
    .info-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:first-child {
        font-size: 12px;
        margin-bottom: 5px;
      }
      span:nth-child(2) {
        font-size: 11px;
        i {
          vertical-align: -1px;
        }
      }
    }
  }
}
.link-item /deep/ {
  color: $font-light-color;
  background-color: $item-color;

  .tip {
    height: 20px;
    padding: 0 8px;
    line-height: 20px;
    text-align: center;
    border-radius: 20px;
    font-size: 12px;
    background-color: $buttom-color;
    color: $buttom-font-color;
  }
  .description {
    font-size: 12px;
  }
}
.radius {
  border-radius: 5px !important;
}
.margin2 {
  margin-bottom: 2px;
}
.margin7 {
  margin-bottom: 7px;
}
.margin35 {
  margin-bottom: 35px;
}
</style>
