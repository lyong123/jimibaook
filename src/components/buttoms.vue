<template>
  <div class="buttom-wrapper" v-if="iconObjectList.length">
    <div class="buttom-item" @click="jumpTo(item.path)" v-for="(item,index) in iconObjectList" :key="index">
      <div class="icon-wrapper">
        <img :src="item.icon" alt="">
      </div>
      <span class="desc">{{item.title}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    iconObjectList: {
      type: Array,
      default () {
        return []
      }
    }
  },

  methods: {
    jumpTo (path) {
      this.$router.push({path: path})
    }
  }
}
</script>
<style lang="scss" scoped>
.buttom-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    height:92px;
    min-height:92px;
    .buttom-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding:15px 0;
        .desc{
          color:#333;
          font-size:14px;
        }
        .icon-wrapper{
            height: 40px;
            min-height:40px;
            width:40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            margin-bottom: 8px;
           img{
             width:100%;
             height:100%;
           }
        }
    }
}
</style>
