<template>
  <div class="Global-page">
    <slot></slot>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.Global-page{
  height:100%;
  display: flex;
  flex-direction: column;
  background-color: $background-color;
}
</style>
