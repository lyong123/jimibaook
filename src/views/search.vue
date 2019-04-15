<template>
  <page>
    <header-title backIcon="icon-allow" title="订单查询" />
    <mt-search v-model="value" cancel-text="取消" placeholder="搜索"></mt-search>
  </page>
</template>
<script>

export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
