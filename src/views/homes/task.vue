<template>
  <page>
    <header-title title="任务" backIcon="icon-allow"></header-title>
    <mt-navbar v-model="active">
      <mt-tab-item id="1">集米工具</mt-tab-item>
      <mt-tab-item id="2">我的工具</mt-tab-item>
    </mt-navbar>
    <div class="backgroud">
      <div class="desc">
        <span>当前活跃度:{{$store.state.userInfo.contribution}}</span>
        <span>总米粒:{{$store.state.userInfo.lastbalance}}</span>
      </div>
      <scroll
        v-if="current.list.length > 0"
        :loading="loading"
        :isTheEnd="current.isTheEnd"
        @loadMore="loadMore(current)"
      >
        <div v-for="(item,index) in current.list" :key="`_${index}`">
          <template v-if="active === '1'">
            <div class="task-item">
              <img src="../../assets/logo.png" alt>
              <div class="item-desc">
                <span class="title">{{item.name}}</span>
                <div class="detail">
                  <span>每次收集 {{item.harvestpd}} 克</span>
                  <span>总共奖励: {{item.sumReward}}克</span>
                  <span>有效时间: {{item.validitytime}} 天</span>
                </div>
              </div>
              <div class="rice">
                <span>兑换: {{item.price}}克</span>
                <span>最多可换 {{item.limitnumber}} 个</span>
                <span @click="exchange(item.toolid)">兑换</span>
              </div>
            </div>
          </template>
          <template v-else-if="active === '2'">
            <div class="mine-item">
              <div class="task-item">
              <img src="../../assets/logo.png" alt>
              <div class="item-desc">
                <span class="title">{{item.name}}</span>
                <div class="detail">
                  <span>每次收集 {{item.harvestpd}} 克</span>
                  <span>总共奖励: {{item.sumReward}}克</span>
                  <span>{{item.ftendtime?`到期时间：${item.ftendtime}`:`有效时间: ${item.validitytime} 天`}}</span>
                </div>
              </div>
              <div class="rice">
                <span>已拥有 {{item.toolnumber}} 个</span>
              </div>
            </div>
            </div>
          </template>
        </div>
      </scroll>
    </div>
  </page>
</template>
<script>
import requset from '@/http'
import {
  findAllToolsUrl,
  userAlreadyHaveUrl,
  exchangeToolsUrl
} from '@/http/api'
import Scroll from '@/common/scroll'
import { MessageBox } from 'mint-ui'

export default {
  components: {
    Scroll
  },
  data () {
    return {
      active: '1',
      loading: false,
      task: {
        url: findAllToolsUrl,
        list: [],
        page: 0,
        size: 10,
        isTheEnd: false
      },
      mine: {
        url: userAlreadyHaveUrl,
        list: [],
        page: 0,
        size: 10,
        isTheEnd: false
      }
    }
  },
  watch: {
    active (newV) {}
  },
  computed: {
    current () {
      let a = this.active
      switch (a) {
        case '1':
          return this.task
        case '2':
          return this.mine
        case '3':
          return this.history
      }
    }
  },
  methods: {
    exchange (id) {
      MessageBox.prompt('请输入个数').then(num => {
        MessageBox.prompt('请输入密码').then(password => {
          requset
            .post(exchangeToolsUrl, {
              tradepassword: password.value,
              number: num.value,
              toolid: id
            })
            .then(res => {
              MessageBox('提示', '兑换成功')
              this.$store.dispatch('loadUserInfo')
            })
        })
      })
    },
    loadMore (obj) {
      this.loading = true
      requset
        .get(`${obj.url}`, {
          page: obj.page + 1,
          size: obj.size
        })
        .then(res => {
          if (obj.url === findAllToolsUrl) {
            if (res.data.length < obj.size) {
              obj.isTheEnd = true
            }
            obj.page++
            obj.list = [...obj.list, ...res.data]
            this.loading = false
          } else {
            if (res.data.list.length < obj.size) {
              obj.isTheEnd = true
            }
            obj.page++
            obj.list = [...obj.list, ...res.data.list]
            this.loading = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  async beforeRouteEnter (to, from, next) {
    let task = {
      url: findAllToolsUrl,
      list: [],
      page: 0,
      size: 10,
      isTheEnd: false
    }
    let mine = {
      url: userAlreadyHaveUrl,
      list: [],
      page: 0,
      size: 10,
      isTheEnd: false
    }
    let loadMore = async obj => {
      await requset
        .get(`${obj.url}`, {
          page: obj.page + 1,
          size: obj.size
        })
        .then(res => {
          if (obj.url === findAllToolsUrl) {
            if (res.data.length < obj.size) {
              obj.isTheEnd = true
            }
            obj.page++
            obj.list = [...obj.list, ...res.data]
          } else {
            if (res.data.list.length < obj.size) {
              obj.isTheEnd = true
            }
            obj.page++
            obj.list = [...obj.list, ...res.data.list]
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    await loadMore(task)
    await loadMore(mine)
    mine.list = mine.list.map(i => {
      let obj = task.list.filter(n => {
        return n.toolid === i.toolid
      })
      return {
        ...i,
        ...obj[0]
      }
    })

    await next(vm => {
      vm.task = task
      vm.mine = mine
    })
  }
}
</script>
<style lang='scss' scoped>
.backgroud {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.task-item {
  height: 130px;
  display: flex;
  align-items: center;
  background-color: $item-color;
  margin-bottom: 10px;
  .item-desc {
    height: 100px;
    width: 110px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .title {
      font-size: 18px;
      height: 40px;
      line-height: 40px;
      color: #fff;
    }
    .detail {
      color: $font-color;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      span {
        margin-bottom: 5px;
      }
    }
  }
  .rice {
    flex: 1;
    height: 100px;
    font-size: 12px;
    color: $font-color;
    padding-top: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      margin-bottom: 3px;
    }
    span:nth-child(3) {
      margin-top: 20px;
      height: 25px;
      width: 50px;
      border-radius: 5px;
      line-height: 25px;
      text-align: center;
      background-color: #646464;
      color: #fff;
    }
    .ok {
      background-color: #1092aa;
    }
  }
  img {
    width: 100px;
    height: 100px;
    margin: 0 7px;
  }
}

.desc {
  height: 30px;
  min-height: 30px;
  display: flex;
  align-items: center;
  background-color: $item-color;
  margin-bottom: 2px;
  span {
    flex: 1;
    text-align: center;
    color: $font-color;
    font-size: 12px;
  }
}
</style>
