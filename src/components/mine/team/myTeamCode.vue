<template>
  <page>
    <header-title title="团队招募" backIcon="icon-allow"></header-title>
    <!-- <div class="wrapper">
      <img src="../../../assets/myteam1.png">
      <div class="title">
        <span>集米宝，集米粒</span>
        <span>越集越快乐</span>
      </div>
      <div class="info-wrapper">
        <div class="info">
          <div class="name">
            <img src="../../../assets/rice.png" alt>
            <div class="desc">
              <span>我是集米宝粉丝</span>
              <span>我为集米宝代言</span>
            </div>
          </div>
          <span class="promotion-code">推广码:{{2349274}}</span>
        </div>
        <div class="code" id="qrcode">
        </div>
      </div>
      <mt-button class="button" type="primary">分享</mt-button>
    </div>-->
    <div class="wrapper">
      <img class="back" src="../../../assets/Recruitment4.jpg" alt="">
      <img class="avatar" :src="avatar" alt="">
      <span class="promotion-code">推广码:{{2349274}}</span>
      <div class="code" id="qrcode"></div>
    </div>
  </page>
</template>
<script>
import QRCode from './qrcode'
import { baseURL } from '@/http/api'
import {avatar} from '@/store/constant'

export default {
  data () {
    return {
      code: '',
      avatar
    }
  },
  methods: {
    // jquery-qrcode.js
  },
  mounted () {
    let width = window.innerWidth
    let id = this.$store.state.userInfo.tuijianma
    var qrcode = new QRCode(document.getElementById('qrcode'), {
      text: `${baseURL}/#/aaa?Referrer=${id}`,
      width: 100 * (width / 320), // 生成的二维码的宽度
      height: 100 * (width / 320), // 生成的二维码的高度
      colorDark: '#000000', // 生成的二维码的深色部分
      colorLight: '#ffffff' // 生成二维码的浅色部分
    })
    console.log(qrcode)
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  position: relative;
  width:100vw;
  height:calc(100vh - 40px);
  overflow: hidden;
  .back{
    width:100%;
    height: 100%;
  }
  .avatar{
    position: absolute;
    top:300px;
    left:16px;
    z-index: 10;
    width:53px;
    height:53px;
    border-radius: 50%;
  }
  .promotion-code{
    position: absolute;
    top:360px;
    left:34px;
    font-size:13px;
  }
  .code{
    position: absolute;
    top:267px;
    right:27px;
  }
}
// .wrapper {
//   flex: 1;
//   position: relative;
//   background-color: #fab456;
//   & > img {
//     width: 100%;
//   }
//   .title {
//     font-size: 30px;
//     color: #fff;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     span:nth-child(1) {
//       margin-bottom: 5px;
//     }
//   }
//   .info-wrapper {
//     // position: absolute;
//     // bottom: 61px;
//     height: 150px;
//     width: 100%;
//     box-sizing: border-box;
//     padding: 0 20px 0 20px;
//     display: flex;
//     justify-content: space-between;
//     color: #fff;
//     .info {
//       display: flex;
//       height: 60px;
//       flex-direction: column;
//       .name {
//         display: flex;
//         align-items: center;
//         max-width: 100px;
//         img {
//           width: 50px;
//           height: 50px;
//           min-width:50px;
//           border-radius: 50%;
//         }
//         .desc {
//           margin-left: 5px;
//           display: flex;
//           flex-direction: column;
//           font-size: 12px;
//           span {
//             width: 100%;
//             overflow: hidden;
//             white-space: nowrap;
//             text-overflow: ellipsis;
//           }
//           span:nth-child(1) {
//             margin-bottom: 2px;
//           }
//         }
//       }
//       .promotion-code {
//         margin-top: 10px;
//         font-size: 18px;
//         color: #5f5e5a;
//       }
//     }
//     .code {
//         margin: 10px;
//         width: 120px;
//         height: 120px;
//     }
//   }
//   .button {
//     position: absolute;
//     width: calc(100% - 20px);
//     color: #fff;
//     background-color: #84c37b;
//     bottom: 0;
//     right: 0;
//     left: 0;
//   }
// }
</style>
