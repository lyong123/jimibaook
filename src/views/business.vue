<template>
  <page>
    <router-view class="router-view-class"></router-view>
    <header-title :title="'商圈'"/>
    <div class="swipe-wrapper">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <div style="background-color:blue;height:100%"></div>
        </mt-swipe-item>
        <mt-swipe-item>
          <div style="background-color:#f40;height:100%"></div>
        </mt-swipe-item>
        <mt-swipe-item>
          <div style="background-color:#f4f;height:100%"></div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <buttoms :iconObjectList="iconObjectList"/>
  </page>
</template>
<script>
import Buttoms from '../components/buttoms'

export default {
  components: {
    Buttoms
  },
  data () {
    return {
      iconObjectList: [
        {
          icon: 'icon-home',
          title: '运动',
          color: '#5e81c3',
          path: '/business/sports'
        },
        {
          icon: 'icon-home',
          title: '商品',
          color: '#5e81c3',
          path: '/business/commodity'
        },
        {
          icon: 'icon-home',
          title: '虚拟商品',
          color: '#5e81c3',
          path: '/business/virtualCommodity'
        }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.swipe-wrapper {
  height: 160px;
  .item-wrapper {
    height: 300px;
    width: 100%;
    background-color: #f40;
  }
}
</style>
