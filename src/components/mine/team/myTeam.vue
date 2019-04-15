<template>
  <page>
    <router-view class="router-view-class"></router-view>
    <header-title
      title="我的团队"
      rightInfo="团队招募"
      backIcon="icon-allow"
      @clickRightInfo="$router.push('/mine/myTeam/myTeamCode')"
    ></header-title>
    <div class="team-list">
      <div class="item" v-for="item in teamList" :key="item.title">
        <span>
          {{item.title}}
          <i :class="['icon',item.icon]" v-if="item.icon"></i>
        </span>
        <span>{{item.value}}</span>
      </div>
    </div>
    <div class="recommend">
      <div class="avatar">
        <i class="icon icon-recomment"></i>
        <img :src="avatar" alt>
      </div>
      <div class="name">
        我的推荐人：
        <span>{{recomment}}</span>
      </div>
      <i class="icon icon-chat" @click="chatJump()"></i>
    </div>
    <mt-navbar v-model="active" class="navbar">
      <mt-tab-item id="1">全部成员</mt-tab-item>
      <mt-tab-item id="2">实名成员</mt-tab-item>
      <mt-tab-item id="3">未实名成员</mt-tab-item>
    </mt-navbar>
    <div class="team-member">
      <mt-tab-container v-model="active">
        <mt-tab-container-item id="1">
          <div class="item-wrapper" v-for="(n,i) in allMenber" :key="i">
            <img :src="n.headimage ? n.headimage : avatar" alt>
            <div class="desc">
              <span class="item">
                <span>{{n.activevalue}}</span>
                <span>{{'活跃度'}}</span>
              </span>
              <span class="item">
                <span>{{n.contribution}}</span>
                <span>{{'团队人数'}}</span>
              </span>
              <span class="item">
                <span>{{'0.0'}}</span>
                <span>{{'团队活跃度'}}</span>
              </span>
            </div>
            <i class="icon icon-chat" @click="chatJump(n.nickname)"></i>
          </div>
        </mt-tab-container-item>

        <mt-tab-container-item id="2">
          <div class="item-wrapper" v-for="(n,i) in realNameMenber" :key="i">
            <img :src="n.headimage ? n.headimage : avatar" alt>
            <div class="desc">
              <span class="item">
                <span>{{n.activevalue}}</span>
                <span>{{'活跃度'}}</span>
              </span>
              <span class="item">
                <span>{{n.contribution}}</span>
                <span>{{'团队人数'}}</span>
              </span>
              <span class="item">
                <span>{{'0.0'}}</span>
                <span>{{'团队活跃度'}}</span>
              </span>
            </div>
            <i class="icon icon-chat" @click="chatJump(n.nickname)"></i>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3" class="item-container-wrapper">
          <div class="item-wrapper" v-for="(n,i) in notRealNameMenber" :key="i">
            <img :src="n.headimage ? n.headimage : avatar" alt>
            <div class="desc">
              <span class="item">
                <span>{{n.activevalue}}</span>
                <span>{{'活跃度'}}</span>
              </span>
              <span class="item">
                <span>{{n.contribution}}</span>
                <span>{{'团队人数'}}</span>
              </span>
              <span class="item">
                <span>{{'0.0'}}</span>
                <span>{{'团队活跃度'}}</span>
              </span>
            </div>
            <i class="icon icon-chat" @click="chatJump(n.nickname)"></i>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </page>
</template>

<script>
import {avatar} from '@/store/constant'
import requset from '@/http'
import { SuperiorFirmsUrl, MyteamUrl } from '@/http/api'
export default {
  data () {
    return {
      avatar,
      allMenber: [],
      realNameMenber: [],
      notRealNameMenber: [],
      teamList: [
        { title: '团队总人数', value: 0 },
        { title: '团队总活跃度', value: 0 }

      ],
      recomment: '******',
      active: '1'
    }
  },
  methods: {
    chatJump (name) {
      this.$router.push({ name: 'Chat', params: { name } })
    }
  },
  async beforeRouteEnter (to, from, next) {
    let res = await requset.get(SuperiorFirmsUrl)
    let team = await requset.get(MyteamUrl)
      .catch(err => {
        console.log(err)
      })
    console.log(res, team)
    next(vm => {
      vm.allMenber = res.data
      vm.realNameMenber = res.data.filter(i => {
        return i.status === 1
      })
      vm.notRealNameMenber = res.data.filter(i => {
        return i.status === 0
      })
    })
  }
}
</script>
<style lang='scss' scoped>
.team-list {
  height: 70px;
  display: flex;
  color: $font-color;
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span:nth-child(1) {
      font-size: 12px;
      margin-bottom: 7px;
      i {
        font-size: 12px;
      }
    }
    span:nth-child(2) {
      color: $buttom-color;
    }
  }
}
.recommend {
  height: 60px;
  display: flex;
  background-color: $item-color;
  color: $font-color;
  .avatar {
    width: 70px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $buttom-color;
    i {
      top: 0;
      left: 0;
      font-size: 20px;
      position: absolute;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .name {
    flex: 1;
    display: flex;
    justify-content: start;
    align-items: center;
    padding-left: 10px;
    font-size: 15px;
    span {
      color: $font-light-color;
    }
  }
  .icon-chat {
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
  }
}
.team-member /deep/ {
  flex: 1;
  background-color: $item-color;
  overflow-y: auto;
  .item-wrapper {
    display: flex;
    align-items: center;
    height: 60px;
    color: $font-color;
    font-size: 14px;
    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: #fef;
      margin: 0 5px;
    }
    .desc {
      flex: 1;
      display: flex;
    }
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    i {
      width: 50px;
      height: 100%;
      font-size: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .mint-tab-container-item {
    overflow-y: auto;
  }
  .mint-tab-container {
    height: 100%;
  }
}
</style>
