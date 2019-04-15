<template>
  <page>
    <router-view class="router-view-class"></router-view>
    <header-title title="首页" :rightInfo="address" :rightIcon="'icon-chat'"/>
    <div class="swipe-wrapper">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <div style="height:100%">
            <img style="width:100%;height:100%" src="../../assets/banner1.jpg" alt>
          </div>
        </mt-swipe-item>
        <mt-swipe-item>
          <img style="width:100%;height:100%" src="../../assets/banner2.jpg" alt>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="announcement">
      <img src="../../assets/icon/img_announ@2x.png" alt>

      <div class="item">
        <div class="transfrom" ref="transfrom">
          <template v-for="(n,i) in announcement">
            <div class="desc" :key="i" @click="jump(n.content)">{{n.title}}</div>
          </template>
        </div>
      </div>
    </div>

    <buttoms class="buttoms" :iconObjectList="iconObjectList"/>
    <div class="home-desc">
      <p class="title">集米宝最新赠送米粒</p>
      <div class="line">
        <div class="item">
          <span class="desc">时间</span>
          <span class="number">{{NewRice.time}}</span>
        </div>
        <div class="item">
          <span class="desc">数目</span>
          <span class="number">{{NewRice.amount}}</span>
        </div>
      </div>

      <p class="title title-p">最新活跃值赠送: {{NewRice.number}} <mt-button class="button-in" @click="take"><span>存入米库</span></mt-button>  </p>
      <div class="line line1">
        <div class="item">
          <span class="number">Lv{{$store.state.userInfo.levelid}}</span>
          <span class="desc">会员等级</span>
        </div>
        <div class="item">
          <span class="number">{{$store.state.userInfo.contribution}}</span>
          <span class="desc">贡献值</span>
        </div>
      </div>
      <div class="line line2">
        <div class="item">
          <span class="number">{{$store.state.userInfo.activevalue}}</span>
          <span class="desc">活跃值</span>
        </div>
        <div class="item">
          <span class="number">{{$store.state.userInfo.lastbalance}}</span>
          <span class="desc">总米粒</span>
        </div>
      </div>
    </div>
  </page>
</template>
<script>
import Buttoms from '../../components/buttoms'
import requset from '@/http'
import { getAllNotices, homeNewRice, homeNewActive, postHomeNewActive } from '@/http/api'
import { MessageBox } from 'mint-ui'

export default {
  components: {
    Buttoms
  },
  data () {
    return {
      NewRice: {},
      announcement: [],
      address: '广州市',
      dashArray: (Math.PI * 100 * window.innerWidth) / 320,
      iconObjectList: [
        {
          icon: require('../../assets/icon/btn_partner@2x.png'),
          title: '合伙人',
          color: '#fe9b1c',
          path: '/home/partner'
        },
        {
          icon: require('../../assets/icon/btn_recruit@2x.png'),
          title: '招募',
          color: '#3ba29f'
        },
        {
          icon: require('../../assets/icon/btn_tool@2x.png'),
          title: '工具',
          color: '#3eaffd',
          path: '/home/task'
        },
        {
          icon: require('../../assets/icon/btn_college@2x.png'),
          title: '商学院',
          color: '#c57ffc',
          path: '/home/business'
        }
      ],
      pictureSource: '',
      destinationType: ''
    }
  },

  computed: {
    headerOptions () {
      return {}
    },
    dashOffset () {
      return (1 - this.tweenedNumber / 100) * this.dashArray
    }
  },
  methods: {
    take () {
      requset.post(postHomeNewActive).then(res => {
        console.log(res, 'take')
      })
    },
    jump (content) {
      this.$router.push({ name: `Details`, params: { content } })
    },
    geolocationSuccess (position) {
      let Latitude = position.coords.latitude
      let Longitude = position.coords.longitude
      this.location(Longitude, Latitude)
    },
    geolocationError (err) {
      MessageBox('提示', err.message)
    },
    location (long, lati) {
      var map = new BMap.Map('allmap')
      var point = new BMap.Point(long, lati)
      var gc = new BMap.Geocoder()
      gc.getLocation(point, function (rs) {
        var addComp = rs.addressComponents
        this.address = addComp.city
      })
    },
    transfrom (time) {
      let len = this.announcement.length
      let count = 0
      this.timer = setInterval(() => {
        count++
        this.$refs.transfrom.style.transform = `translateY(${-0.5 *
          Math.ceil(count % len)}rem)`
      }, time)
    }
  },
  async created () {
    navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.geolocationError, {
    })
    await requset.get(homeNewRice).then(res => {
      this.NewRice.time = res.data.createtime
      this.NewRice.amount = res.data.amount
    })
    await requset.get(homeNewActive).then(res => {
      this.NewRice.number = res.data.number
    })
    requset.get(getAllNotices).then(res => {
      this.announcement = res.data.list
      this.$nextTick(() => {
        this.transfrom(4000)
      })
    })
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
.button-in{
  display: inline-block;
  height: 24px;
  width: 70px;
  text-align: center;
  background-image: url('../../assets/icon/btn_orange_pressed@2x.png');
  background-size: cover;
  background-position: -4px 0;
  border-radius: 5px;
  padding:0;
  span{
    height:24px;
    line-height: 24px;
    color:#fff;
    font-size:13px;
  }
}
.home-desc {
  background-color: $item-color;
  padding: 15px 15px 0 15px;
  margin-bottom: 3px;

  .title {
    font-size: 15px;
    color: $font-color;
  }
   .title-p{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .line {
    display: flex;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 13px 0 15px 0;
      span:nth-child(1) {
        margin-bottom: 3px;
      }
      .desc {
        font-size: 12px;
        color: $font-color;
      }
      .number {
        font-size: 14px;
        color: $icon-color;
      }
    }
  }

    .line1 {
      .item {
        margin-bottom: 0;
      }
    }
    .line2 {
      .item {
        margin-top: 8px;
        margin-bottom: 15px;
      }
    }
}
.announcement {
  height: 42px;
  min-height: 42px;
  display: flex;
  align-items: center;
  background-color: $item-color;
  .transfrom {
    transition: all 2s;
  }
  .item {
    height: 16px;
    overflow: hidden;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    .desc {
      margin-right: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  img {
    height: 22px;
    width: 22px;
    margin-left: 15px;
  }
}
.loading {
  position: absolute;
  z-index: 1000;
  svg {
    margin: 0;
    width: 100vw;
    height: 100px;
    .mycircle {
      stroke-width: 4px;
      stroke: #000;
    }
  }
}
.run {
  position: relative;
  background-color: $item-color;
  display: flex;
  margin-top: 1px;
  .left {
    flex: 1;
  }
  .right {
    flex: 1;
  }
  .mask {
    position: absolute;
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 50px solid $item-color;
    top: 35px;
    right: 38px;
  }
}
svg {
  position: relative;
  margin: 10px;
}
.progress-background {
  stroke-width: 8px;
  stroke: #d5d4da;
  transform-origin: 50% 50%;

  transform: scale(0.9);
  position: absolute;
  top: 0;
}
.progress-bar {
  stroke-width: 8px;
  stroke: #f4f;
  transform-origin: 50% 50%;
  transform: scale(0.9) rotateZ(90deg);
}
.buttoms {
  background-color: $item-color;
  margin: 3px 0;
}
.progress-background {
  background-color: #f40;
}
.progress-bar {
  background-color: #fdf;
}
.swipe-wrapper {
  height: 160px;
  .item-wrapper {
    height: 300px;
    width: 100%;
    background-color: #f40;
  }
}
</style>
