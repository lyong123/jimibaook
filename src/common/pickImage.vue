<template>
  <div :class="['avatar', {radius:border === 'R'}]" @click="typeSheetVisible=true">
    <slot/>
    <div class="background" v-if="typeSheetVisible===true" @click.stop="typeSheetVisible=false"></div>
    <mt-actionsheet :actions="typeActions" v-model="typeSheetVisible"></mt-actionsheet>
  </div>
</template>
<script>
export default {
  props: {
    border: {
      type: String,
      default: 'R'
    }
  },
  data () {
    return {
      type: 1,
      typeSheetVisible: false,
      typeActions: [
        {
          name: '从相册中选择',
          method: n => {
            this.type = 1
            this.select()
          }
        },
        {
          name: '相机拍照',
          method: n => {
            this.type = 2
            this.select()
          }
        }
      ]
    }
  },
  methods: {
    cameraSuccess (imageURI) {
      let data = 'data:image/jpeg;base64,' + imageURI
      this.$emit('selected', data)
    },
    cameraError (message) {
      alert('Failed because: ' + message)
    },
    select () {
      let Camera = navigator.camera
      Camera.getPicture(this.cameraSuccess, this.cameraError, {
        sourceType: this.type === 1 ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA,
        destinationType: Camera.DestinationType.DATA_URL,
        quality: 50,
        encodingType: Camera.EncodingType.JPEG
      })
    },
    image () {
      console.log('3344444444')
    }
  }
}
</script>
<style lang='scss' scoped>
.radius {
  border-radius: 50%;
  border-radius: 50%;
}
.avatar /deep/ {
  width: 50px;
  height: 50px;
  display: inline-block;
  background-color: #fff;
  margin: 10px 10px 10px auto;
  .background {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
  }
  .v-modal {
    display: none;
  }
  span {
    color: $buttom-font-color;
    font-size: 12px;
    line-height: 50px;
    text-align: center;
  }
  img {
    height: 100%;
    width: 100%;
  }
}
</style>
