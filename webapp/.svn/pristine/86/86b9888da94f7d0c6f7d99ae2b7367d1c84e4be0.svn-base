<template>
  <page>
    <header-title v-bind="headerOptions"/>
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
import HeaderTitle from '../components/header'
import Buttoms from '../components/buttoms'

export default {
  components: {
    HeaderTitle,
    Buttoms
  },
  data () {
    return {
      iconObjectList: [
        { icon: 'icon-home', title: '俱乐部', color: '#fe9b1c' },
        { icon: 'icon-home', title: '组队', color: '#3ba29f' },
        { icon: 'icon-home', title: '任务', color: '#3eaffd' },
        { icon: 'icon-home', title: '商学院', color: '#c57ffc' }
      ]
    }
  },
  computed: {
    headerOptions () {
      return {title: '首页', address: '江阳实'}
    }
  }
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
