<template>
  <page>
    <header-title title="我的团队" rightInfo="团队招募" backIcon="icon-allow"></header-title>
    <div class="team-list">
      <div class="item" v-for="item in teamList" :key="item.title">
        <span>{{item.title}}<i :class="['icon',item.icon]" v-if="item.icon"></i></span>
        <span>{{item.value}}</span>
      </div>
    </div>
    <div class="recommend">
        <div class="avatar">
            <i class="icon icon-recomment"></i>
            <img src="../../assets/logo.png" alt="">
        </div>
        <div  class="name">我的推荐人：<span>{{recomment}}</span></div>
        <i class="icon icon-chat"></i>
    </div>
    <mt-navbar v-model="selected" class="navbar">
      <mt-tab-item id="1">综合排序</mt-tab-item>
      <mt-tab-item id="2">最新商品</mt-tab-item>
      <mt-tab-item id="3">价格最低</mt-tab-item>
      <mt-tab-item id="4">价格最高</mt-tab-item>
    </mt-navbar>
    <div class="team-member">

    </div>
  </page>
</template>

<script>
import HeaderTitle from '../header'

export default {
  components: {
    HeaderTitle
  },
  data () {
    return {
      teamList: [
        { title: '团队总人数', value: 0 },
        { title: '团队总活跃度', value: 0 },
        { title: '英雄活跃度', value: 0, icon: 'icon-question2' },
        { title: '联盟活跃度', value: 0, icon: 'icon-question2' }
      ],
      recomment: '******',
      selected: '1'
    }
  }
}
</script>
<style lang='scss' scoped>
.team-list{
    height:70px;
    display: flex;
    color:$font-color;
    .item{
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span:nth-child(1) {
            font-size:12px;
            margin-bottom: 7px;
            i {
                font-size: 12px;
            }
        }
        span:nth-child(2) {
            color:$buttom-color;
        }
    }
}
.recommend{
    height: 60px;
    display: flex;
    background-color: $item-color;
    color:$font-color;
    .avatar{
        width: 70px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        color:$buttom-color;
        i{
            top:0;
            left:0;
            font-size: 20px;
            position: absolute;
        }
        img{
            width: 50px;
            height:50px;
            border-radius: 50%;
        }
    }
    .name{
        flex:1;
        display: flex;
        justify-content: start;
        align-items: center;
        padding-left: 10px;
        font-size:15px;
        span{
            color:$font-light-color;
        }
    }
    .icon-chat{
        width:60px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
    }
}
.team-member{
    flex:1;
    background-color: $item-color;
}
</style>
