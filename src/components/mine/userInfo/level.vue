<template>
  <page>
    <header-title title="贡献值明细" backIcon="icon-allow"></header-title>
    <div class="wrapper" v-if="levelData">
      <div class="header">
        <i class="icon icon-victory"></i>
        <span>当前会员等级:Lv{{levelData.levelid}}</span>
      </div>
      <div class="info">
        <span>当前贡献:{{levelData.activevalue}}</span>
        <span>{{getLevelCount(levelData.levelid,levelData.activevalue)}}</span>
      </div>
    </div>
    <div class="content" v-if="levelCommon">
      <template v-for="(n,i) in levelCommon">
        <div class="item-wrapper" :key="i">
          <div class="avatar">
            <i class="icon icon-victory"></i>
          </div>
          <div class="level">
            <span>会员等级LV{{i}}</span>
            <span>{{levelDesc(i,n.levelstandard)}}</span>
          </div>
          <div class="desc">
            <span>{{desc(i)}}</span>
          </div>
        </div>
      </template>
    </div>
  </page>
</template>

<script>
import requset from '@/http'
import { CommonLevelUrl } from '@/http/api'
import store from '@/store/store'

export default {
  data () {
    return {
      levelData: null,
      levelCommon: null
    }
  },
  methods: {
    getLevelCount (level, active) {
      switch (level) {
        case 0:
          return '请去实名认证'
        case 1:
          return `距离下次升级还差${5 - active}贡献`
        case 2:
          return `距离下次升级还差${10 - active}贡献`
        case 3:
          return `距离下次升级还差${40 - active}贡献`
        case 4:
          return `距离下次升级还差${80 - active}贡献`
        case 5:
          return `您已经超神了！！`
      }
    },
    desc (n) {
      switch (n) {
        case 0:
          return '禁止交易'
        case 1:
          return '交易手续费50%'
        case 2:
          return '交易手续费35%'
        case 3:
          return '交易手续费30%'
        case 4:
          return '交易手续费28%'
        case 5:
          return '交易手续费25%'
      }
    },
    levelDesc (n, standard) {
      switch (n) {
        case 0:
          return '注册未实名认证通过的用户'
        case 1:
          return '注册并实名认证通过的用户'
        case 2:
          return `贡献值≥${standard}`
        case 3:
          return `贡献值≥${standard}`
        case 4:
          return `贡献值≥${standard}`
        case 5:
          return `贡献值≥${standard}`
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    requset.get(CommonLevelUrl).then(data => {
      next(vm => {
        vm.levelData = store.state.userInfo
        vm.levelCommon = data.data
      })
    }).catch(() => {
      next(false)
    })
    // requset
    //   .get(UserLevelInfoUrl)
    //   .then(res => {
    //     levelData = res.data
    //     console.log(levelData, levelCommon)
    //   })
    //   .catch(() => {})
    // requset
    //   .get(CommonLevelUrl)
    //   .then(res => {
    //     levelCommon = res.data
    //     levelCommon.unshift({ levelstandard: '' })
    //   })
    //   .catch(() => {})
    // if (levelData && levelCommon) {
    //   next(vm => {
    //     vm.levelData = levelData
    //     vm.levelCommon = levelCommon
    //   })
    // } else {
    //   Toast('33')
    //   next(false)
    // }
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  background-color: $item-color;
  color: $font-light-color;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header {
    margin-bottom: 15px;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    span:nth-child(1) {
      font-size: 12px;
      margin-bottom: 5px;
    }
    span:nth-child(2) {
      font-size: 12px;
    }
  }
}
.content {
  flex: 1;
  overflow: auto;
  background-color: $item-color;
  .item-wrapper {
    height: 60px;
    display: flex;
    background-color: $background-color;
    margin-bottom: 10px;
    .avatar {
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .level {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      span:nth-child(1) {
        color: $font-light-color;
        font-size: 14px;
        margin-bottom: 4px;
      }
      span:nth-child(2) {
        color: $font-color;
        font-size: 12px;
      }
    }
    .desc {
      width: 100px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      span {
        color: $font-color;
        font-size: 12px;
        margin-bottom: 10px;
        margin-right: 10px;
      }
    }
  }
}
.icon-victory {
  font-size: 25px;
  color: $buttom-color;
}
</style>
