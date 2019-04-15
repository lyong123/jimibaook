<template>
  <page>
    <router-view class="router-view-class"></router-view>
    <header-title title="设置" backIcon="icon-allow"></header-title>
    <mt-cell class="link-item margin2" title="交换密码" to="/mine/settings/exchangePW" is-link></mt-cell>
    <mt-cell class="link-item margin2" title="登录密码" to="/mine/settings/loginPW" is-link></mt-cell>
    <div style="flex:1"></div>
    <mt-button type="primary" @click="logout">退出登录</mt-button>
  </page>
</template>
<script>
import requset from '@/http'
import { LogOutUrl } from '@/http/api'
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['clearAuthorization']),
    logout () {
      requset.post(LogOutUrl, {
        Authorization: this.$store.state.Authorization
      }).then(res => {
        this.clearAuthorization()
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.link-item{
  color:$font-light-color;
  background-color: $item-color;
}
.margin2{
  margin-bottom: 2px;
}
</style>
