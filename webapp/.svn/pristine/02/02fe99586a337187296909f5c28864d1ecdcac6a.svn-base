<template>
  <mt-tabbar class="wrapper" v-model="selected">
    <mt-tab-item id="home">
      <div class="tabbar-item">
        <i class="icon icon-home"></i>
        首页
      </div>
    </mt-tab-item>
    <mt-tab-item id="transaction">
      <div class="tabbar-item">
        <i class="icon icon-order"></i>
        交换
      </div>
    </mt-tab-item>
    <mt-tab-item id="business">
      <div class="tabbar-item">
        <i class="icon icon-shopping2"></i>
        商圈
      </div>
    </mt-tab-item>
    <mt-tab-item id="mine">
      <div class="tabbar-item">
        <i class="icon icon-mine"></i>
        我的
      </div>
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    selected: {
      set (v) {
        this.$router.replace({ path: `/${v}` })
      },
      get () {
        return ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
  border-top:1px solid $background-color;
  box-sizing: border-box;
  background-color: $item-color;
  color:$font-light-color;
}
.tabbar-item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  i{
    font-size:20px;
    margin-bottom: 5px;
  }
}
</style>
