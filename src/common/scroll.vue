<template>
  <div @scroll="scrolling" class="wrapper" ref="ss">
    <div ref="dd">
      <slot></slot>
      <div class="desc-wrapper">
        <template v-if="!isTheEnd">
          <mt-spinner type="fading-circle"></mt-spinner>
          <span class="desc">加载中...</span>
        </template>
        <template v-else>
          <span class="end-desc">已经到底了</span>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    isTheEnd: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrolling (e) {
      if (
        e.target.scrollTop + this.$refs.ss.clientHeight >
        this.$refs.dd.clientHeight - 30
      ) {
        if (!this.loading && !this.isTheEnd) {
          this.$emit('loadMore')
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  overflow-y: auto;
  height:100%;
  .desc-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 5px;
    .desc {
      color: $font-color;
      font-size: 12px;
      margin-top: 5px;
    }
    .end-desc {
      color: $font-color;
      font-size: 12px;
      margin-top: 5px;
      padding: 10px;
    }
  }
}
</style>
