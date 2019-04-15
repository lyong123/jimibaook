<template>
  <div class="buttom-wrapper" v-if="iconObjectList.length">
    <div class="buttom-item" @click="jumpTo(item.path)" v-for="(item,index) in iconObjectList" :key="index">
      <div class="icon-wrapper" :style="{backgroundColor:item.color}">
        <i :class="['icon', item.icon]"></i>
      </div>
      <span>{{item.title}}</span>
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
    height: 95px;
    display: flex;
    .buttom-item{
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .icon-wrapper{
            height: 44px;
            width:44px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 8px;
            i{
                font-size: 20px;
                color:#fff;
            }
        }
    }
}
</style>
