<template>
  <page>
    <router-view class="router-view-class"></router-view>
    <div class="header-wrapper">
      <div class="user-title">
        <img src="../assets/logo.png">
        <span>ID: {{340234525}}</span>
      </div>
      <div class="user-info">
        <div class="info-item">
          <span>Lv{{3}}</span>
          <span>
            <i class="icon icon-level" style="color:#fca65d"></i>
            <span>{{'会员等级'}}</span>
          </span>
        </div>
        <div class="info-item">
          <span>{{1.0}}+{{0.0}}</span>
          <span>
            <i class="icon icon-activity" style="color:#ff362e"></i>
            <span>{{'活跃度'}}</span>
          </span>
        </div>
        <div class="info-item">
          <span>{{0.0}}</span>
          <span>
            <i class="icon icon-gift" style="color:#f9efb4"></i>
            <span>{{'贡献值'}}</span>
          </span>
        </div>
      </div>
    </div>
    <mt-cell class="link-item margin2" title="总糖果" to="/mine/candy" is-link :value="candy"></mt-cell>
    <mt-cell class="link-item margin7" title="钱包地址">
      <div class="description">sdf893u298ua9d8f3r39af3rf848f <i class="icon icon-paper" style="color:#fff;margin-left:5px;"></i></div>
    </mt-cell>
    <mt-cell class="link-item margin2" title="抽奖专区" to="/mine/lottery" is-link></mt-cell>
    <mt-cell class="link-item margin7" title="身份信息" to="/mine/identity" is-link>
      <div class="tip">未认证</div>
    </mt-cell>
    <mt-cell class="link-item margin2" title="商圈订单" to="/mine/order" is-link></mt-cell>
    <mt-cell class="link-item margin7" title="收货地址" to="/mine/address" is-link></mt-cell>
    <mt-cell class="link-item margin2" title="我的团队" to="/mine/myTeam" is-link></mt-cell>
    <mt-cell class="link-item margin2" title="问题反馈" to="/mine/feedback" is-link></mt-cell>
    <mt-cell class="link-item margin2" title="检测版本" to="/mine/version">
      <div class="tip radius">当前版本:{{'3.0.1'}}</div>
    </mt-cell>
    <mt-cell class="link-item margin35" title="联系客服">
      <div class="description">400-6034-110</div>
    </mt-cell>
  </page>
</template>

<script>
export default {
  data () {
    return {
      candy: '0.0',
      servicePhone: '400-6034-110'
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
  background-color: #423c5e;
  color: $font-light-color;
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
.link-item{
  color:$font-light-color;
  background-color: $item-color;
  .tip{
    height:20px;
    padding: 0 8px;
    line-height: 20px;
    text-align: center;
    border-radius: 20px;
    font-size: 12px;
    background-color: $buttom-color;
    color:$buttom-font-color;
  }
  .description{
    font-size:12px;
  }
}
.radius{
  border-radius: 5px !important;
}
.margin2{
  margin-bottom: 2px;
}
.margin7{
  margin-bottom: 7px;
}
.margin35{
  margin-bottom: 35px;
}
</style>
