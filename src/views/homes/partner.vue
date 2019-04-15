<template>
  <page style="background-color:#fff">
    <header-title title="合伙人" backIcon="icon-allow"></header-title>
    <div class="banner">
      <img src="../../assets/partner.png" alt>
    </div>
    <div class="select-list" @click="sheetVisible=true">
      <span>地区</span>
      <div class="value">
        {{selectValue}}
        <i class="icon icon-allow"></i>
      </div>
    </div>
    <mt-button class="button" type="primary" @click="commit">我要合伙</mt-button>
    <div class="confirm-ok" v-if="contirm">
      <img src="../../assets/confirmOK.png" alt>
      <mt-button class="button-confirm" type="primary" @click="contirm=false">知道了</mt-button>
    </div>

    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </page>
</template>
<script>
export default {
  data () {
    return {
      contirm: false,
      sheetVisible: false,
      selectValue: '请选择合伙地区',
      actions: [
        {
          name: '解绑(提供身份证正反面)',
          method: n => {
            this.selectValue = n.name
          }
        },
        {
          name: '解绑(提供身份证正反面)',
          method: n => {
            this.selectValue = n.name
          }
        }
      ]
    }
  },
  methods: {
    commit () {
      this.contirm = true
    }
  }
}
</script>
<style lang='scss' scoped>
.confirm-ok {
  height: 285px;
  width: 285px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  box-shadow: 0 1px 2px 1px #cfcfcf;
  img {
    width: 100%;
    height: 100%;
  }
  .button-confirm {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    height: 42px;
    width: 180px;
    background-color: #f68728;
    font-size: 13px;
    color: #fff;
    text-align: center;
    line-height: 42px;
    border-radius: 30px;
    margin: 0;
  }
}
.banner {
  height: 210px;
  width: 100%;
  margin-bottom: 68px;
  img {
    height: 100%;
    width: 100%;
  }
}
.select-list {
  height: 40px;
  width: 265px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  span:nth-child(1) {
    font-size: 17px;
    color: #333;
    margin-left: 15px;
  }
  .value {
    margin-left: 20px;
    font-size: 13px;
    color: #666;
    flex: 1;
    position: relative;
    i {
      position: absolute;
      right: 8px;
      top: -2px;
      transform: rotateZ(-90deg);
    }
  }
}
.button {
  height: 35px;
  width: 220px;
  background-color: #ee2f69;
  border-radius: 30px;
  text-align: center;
  line-height: 35px;
  color: #fff;
  font-size: 15px;
  margin: 40px auto 0 auto;
}
</style>
