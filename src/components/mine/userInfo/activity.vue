<template>
  <page>
    <header-title title="活跃度明细" backIcon="icon-allow"></header-title>
    <div class="wrapper">
      <i class="icon icon-activity"></i>
      <div class="info">
        <span>当前活跃度:</span>
        <span>{{'0.0'}}+{{'0.0'}}</span>
      </div>
    </div>
    <div class="content"></div>
  </page>
</template>

<script>
export default {}
</script>
<style lang='scss' scoped>
.wrapper {
  background-color: $item-color;
  height: 20%;
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  .icon-activity{
    font-size:30px;
    color:#ff362e;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    span:nth-child(1) {
      color: $font-light-color;
      font-size: 14px;
      margin-bottom: 5px;
    }
    span:nth-child(2) {
      color: $buttom-color;
      font-size: 18px;
    }
  }
}
.content {
  flex: 1;
  background-color: $item-color;
}
</style>
