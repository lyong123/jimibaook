<template>
  <page>
    <header-title :title="'运动用品'" :backIcon="'icon-allow'" @headerBack="headerBack"/>
    <mt-navbar v-model="selected" class="navbar">
      <mt-tab-item id="1">综合排序</mt-tab-item>
      <mt-tab-item id="2">最新商品</mt-tab-item>
      <mt-tab-item id="3">价格最低</mt-tab-item>
      <mt-tab-item id="4">价格最高</mt-tab-item>
    </mt-navbar>
    <div class="product-list">
      <div class="product-wrapper" v-for="n in 10" :key="n">
        <img src="../assets/logo.png">
        <span>{{'个福哈法师是的发送到发大师的天上的非1'}}</span>
        <span>￥{{23.9}}</span>
      </div>
    </div>
  </page>
</template>
<script>
import HeaderTitle from '../components/header'

export default {
  components: {
    HeaderTitle
  },
  data () {
    return {
      selected: '1'
    }
  },
  methods: {
    headerBack () {
      this.$emit('back')
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(to, 'to')
    console.log(from, 'from')
    next()
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  box-shadow: 0 0 15px 0px;
  padding-bottom: 3px;
  box-sizing: border-box;
  z-index: $navbar-z-index;
}

.product-list {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow-y: auto;
  .product-wrapper {
    width: 160px;
    height: 230px;
    padding: 3px 0;
    margin-top: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    img {
      width: 150px;
    }
    span:nth-child(2) {
      font-size: 11px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span:nth-child(3) {
      align-self: start;
      font-size: 14px;
      color: #fa2845;
    }
  }
}

.mint-navbar .mint-tab-item {
  padding: 10px 0;
}
</style>
