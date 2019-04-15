<template>
  <div class="trade-wrapper">
    <div class="avatar">
      <img :src="imageSrc">
    </div>
    <div class="price info-style">
      <span>{{name}}</span>
      <span>单价:{{price}}</span>
    </div>
    <div class="count info-style">
      <span>最近30日成交:{{all_count}}</span>
      <span>数量:{{count}}</span>
    </div>
    <div class="btn">
      <div class="bottom" v-if="buy">出售</div>
      <div class="bottom" v-else>买入</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    buy: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      imageSrc:
        'https://img.php.cn/upload/study/000/000/005/5c4049320d260896.jpg',
      name: '鑫*****)))))))333333333333))))',
      price: 0.3243,
      all_count: 1233333333333,
      count: 3.0
    }
  }
}
</script>
<style lang="scss" scoped>
.trade-wrapper {
  height: 70px;
  background-color: $item-color;
  margin-bottom: 5px;
  display: flex;
  overflow: hidden;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .avatar {
    width: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .price {
    width: 85px;
    margin-right:5px;
  }
  .count {
    width: 100px;
  }
  .btn {
    box-sizing: border-box;
    padding-left: 3px;
    flex:1;
    display: flex;
    align-items: center;
    .bottom {
      width: 51px;
      height: 38px;
      background-color: $buttom-color;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .info-style {
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;

    span:nth-child(1) {
      font-size: 10px;
      margin-bottom: 6px;
      color: $font-color;
    }
    span:nth-child(2) {
      font-size: 13px;
      color:$buttom-color;
    }
  }
}
</style>
