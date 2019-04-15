<template>
  <page>
    <header-title :title="name" backIcon="icon-allow"></header-title>
    <div class="content">
      <div class="item">
        <span>2-22 07:66</span>
        <div class="left">
          <img src="../../../assets/logo.png">
          <div class="box">11111333333333111</div>
        </div>
      </div>

     <div class="item">
        <span>2-22 07:66</span>
        <div class="right">
          <img src="../../../assets/logo.png">
          <div class="box">11111333333333111</div>
        </div>
      </div>
    </div>

    <div class="chat-input">
      <div class="input">
        <div class="input-wrapper">
          <input v-model="message" type="text">
        </div>
      </div>
      <div class="btn" @click="send">发送</div>
    </div>
  </page>
</template>
<script>
export default {
  data () {
    return {
      message: '',
      name: ''
    }
  },
  methods: {
    send () {
      console.log(this.message)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.name = to.params.name
    })
  }
}
</script>
<style lang='scss' scoped>
.chat-input {
  height: 55px;
  background-color: #fff;
  display: flex;
  .btn {
    background-color: $buttom-color;
    width: 40px;
    height: 35px;
    border-radius: 7px;
    line-height: 35px;
    text-align: center;
    margin: auto;
  }
  .input {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .input-wrapper {
    display: inline;
    position: relative;
    margin: 10px;
    &::before {
      content: "";
      display: block;
      z-index: 1;
      position: absolute;
      width: 1px;
      height: 5px;
      background-color: $font-color;
      left: 0px;
      bottom: 0px;
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 1px;
      height: 5px;
      background-color: $font-color;
      right: 0;
      bottom: 0px;
    }
  }
  input {
    font-size: 18px;
    padding: 5px 3px;
    outline: none;
    border: none;
    border-bottom: 1px solid $font-color;
    position: relative;
  }
}
.content {
  flex: 1;
  .item{
    margin: 10px 0;
    &>span{
      display: block;
      text-align: center;
      color:$font-color;
      font-size: 14px;
    }
  }
}
.left {
  margin: 10px 0;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left;
  }
  .box {
    margin-left: 10px;
    float: left;
    max-width: 70%;
    &::after {
      left: -14px;
      border-right-color: $buttom-color;
    }
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
}
.right {
  margin: 10px 0;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: right;
  }
  .box {
    margin-right: 10px;
    float: right;
    &::after {
      right: -14px;
      border-left-color: $buttom-color;
    }
  }
  &::after {
    content: "";
    display: block;
    clear: both;
  }
}
.box {
  position: relative;
  display: inline-block;
  min-height: 20px;
  background: $buttom-color;
  border-radius: 5px;
  line-height: 50px;
  word-break: break-word;
  color: $buttom-font-color;
  padding: 5px;
  line-height: 18px;
}
.box::after {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  top: 7px;
}
</style>
