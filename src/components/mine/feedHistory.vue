<template>
  <page>
    <router-view class="router-view-class"></router-view>
    <header-title title="历史反馈" backIcon="icon-allow"></header-title>
    <div class="content">
      <div v-for="(n,i) in list" :key="i">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <mt-button class="button" type="primary" @click="jump">我要反馈</mt-button>
  </page>
</template>
<script>
import requset from '@/http'
import { FeedHistoryUrl } from '@/http/api'
export default {
  data () {
    return {
      telephone: '',
      list: []
    }
  },
  methods: {
    jump () {
      this.$router.push({ path: '/mine/feedHistory/feedback' })
    }
  },
  async beforeRouteEnter (to, from, next) {
    let a = await requset.get(FeedHistoryUrl).then(res => {
      return res.data.list
    })
    next(vm => {
      vm.list = a
    })
  }
}
</script>
<style lang='scss' scoped>
.content {
  flex: 1;
}
.button {
  font-size: 14px;
}
</style>
