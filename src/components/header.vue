<template>
  <div class="header">
    <div class="left-buttom" @click="back">
      <i :class="iconClass"></i>
    </div>
    <div class="title">
      <span>{{title}}</span>
    </div>
    <div class="right-content">
      <div class="info" @click="right" v-if="rightInfo">
        <span>{{rightInfo}}</span>
      </div>
      <div class="icon-wrapper" v-if="rightIcon">
        <i :class="['icon', rightIcon]"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    backIcon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    rightInfo: {
      type: String,
      default: ''
    },
    rightIcon: {
      type: String,
      default: ''
    }
  },
  methods: {
    back () {
      if (this.backIcon !== 'icon-allow') {
        this.$emit('leftClick')
        return
      }
      this.$emit('headerBack')
      this.$router.back()
    },
    right () {
      if (!this.rightInfo) return
      this.$emit('clickRightInfo')
    }
  },
  computed: {
    iconClass () {
      return ['icon', this.backIcon]
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  height: 40px;
  min-height: 40px;
  border-bottom: 1px solid $background-color;
  z-index: $header-z-index;
  display: flex;
  background-color: $item-color;
  color: $font-light-color;
  .left-buttom {
    width: 90px;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: left;
    align-items: center;
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .title {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right-content {
    width: 90px;
    display: flex;
    justify-content: flex-end;
    position: relative;
    .info {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 12px;
      }
    }
    .icon-wrapper {
      width: 40px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
