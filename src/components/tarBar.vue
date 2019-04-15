<template>
  <div class="bar-wrapper">
    <template v-for="(n,i) in list">
      <div class="item" :key="i" @click="click(n.path, i)">
        <img :src="selected === `/${n.path}` ? n.iconPressed : n.iconNormal" alt="">
        <span :class="{selected:selected === `/${n.path}`}">{{n.desc}}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          path: 'home',
          iconNormal: require('../assets/icon/btn_home_normal@2x.png'),
          iconPressed: require('../assets/icon/btn_home_pressed@2x.png'),
          desc: '首页'
        },
        {
          path: 'business',
          iconNormal: require('../assets/icon/btn_busniss_normal@2x.png'),
          iconPressed: require('../assets/icon/btn_busniss_pressed@2x.png'),
          desc: '商圈'
        },
        {
          path: 'transaction',
          iconNormal: require('../assets/icon/btn_exchange_normal@2x.png'),
          iconPressed: require('../assets/icon/btn_exchange_pressed@2x.png'),
          desc: '交换'
        },
        {
          path: 'communication',
          iconNormal: require('../assets/icon/btn_com_normal@2x.png'),
          iconPressed: require('../assets/icon/btn_com_pressed@2x.png'),
          desc: '通讯'
        },
        {
          path: 'mine',
          iconNormal: require('../assets/icon/btn_mine_normal@2x.png'),
          iconPressed: require('../assets/icon/btn_mine_pressed@2x.png'),
          desc: '我的'
        }
      ]
    }
  },
  computed: {
    selected () {
      return this.$route.path
    }
  },
  methods: {
    click (p, i) {
      this.$router.push(p)
    }
  }
}
</script>
<style lang="scss" scoped>
.bar-wrapper{
  display: flex;
  height:46px;
  .item{
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
      height:20px;
      width:20px;
      margin-bottom: 3px;
    }
    .selected{
      color:#e47d21;
    }
    span{
      color:$font-color;
      font-size:12px;
    }
  }
}
</style>
