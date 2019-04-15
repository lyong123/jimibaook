<template>
  <page>
    <router-view @goback="reloadData" class="router-view-class"></router-view>
    <header-title title="收货地址" rightInfo="新增" backIcon="icon-allow" @clickRightInfo="increase"></header-title>
    <div class="wrapper">
      <template v-if="addressList.length">
        <div class="address-wrapper" v-for="(n,i) in addressList" :key="i">
          <div class="btn-wrapper">
            <span @click="editAddress(n)">编辑</span>
            <span @click="delAddress(n.addressid)">删除</span>
          </div>
          <div class="desc-wrapper">
            <div class="first-line">
              <span class="name">{{n.addressee}}</span>
              <span class="phone">{{n.phone}}</span>
            </div>
            <div class="second-line">
              <span v-if="n.status == '1'" class="default">默认</span>
              <span class="address">
                <span>{{n.address}}</span>
              </span>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="no-message-wrapper">
          <img src="../../assets/no_message.png" width="100">
        </div>
        <span>暂时没有数据哦...</span>
      </template>
    </div>
  </page>
</template>
<script>
import requset from '@/http'
import { UserAddressUrl, DeleteAddressUrl } from '@/http/api'
import { MessageBox } from 'mint-ui'

export default {
  data () {
    return {
      addressList: [],
      showDefault: true
    }
  },
  methods: {
    increase () {
      this.$router.push({ path: '/mine/address/incAddress' })
    },
    editAddress (n) {
      this.$router.push({name: 'IncAddress', params: n})
    },
    delAddress (id) {
      MessageBox.confirm('你确定要删除吗?')
        .then(action => {
          requset.post(DeleteAddressUrl, { addressid: id }).then(res => {
            this.reloadData()
          })
        })
        .catch(err => err)
    },
    reloadData () {
      requset.get(UserAddressUrl).then(res => {
        this.getFormatList(this, res)
      })
    },
    getFormatList (vm, res) {
      let data = res.data
      let [a] = data.filter(i => {
        return i.status === 1
      })
      let aa = data.map(i => {
        if (i.status !== 1) {
          return i
        }
      })
      vm.addressList = [a, ...aa].filter(i => {
        return i !== undefined
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    requset
      .get(UserAddressUrl)
      .then(res => {
        next(vm => {
          vm.getFormatList(vm, res)
        })
      })
      .catch(ee => {
        next(false)
      })
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  flex: 1;
  overflow: auto;
  background-color: $item-color;
  color: $font-light-color;
  .address-wrapper {
    width: 100%;
    height: 65px;
    display: flex;
    border-bottom: 1px solid $background-color;

    .btn-wrapper {
      width: 95px;
      min-width: 95px;
      max-width: 95px;

      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      span {
        flex: 1;
        text-align: center;
      }
      span:nth-child(1) {
        border-right: 1px solid $background-color;
      }
    }
    .desc-wrapper {
      flex: 1;
      margin: auto 0;
      border-left: 1px solid $background-color;
      box-sizing: border-box;
      height: 45px;
      display: flex;
      flex-direction: column;

      .first-line {
        flex: 1;
        display: flex;
        align-items: center;
        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span:nth-child(1) {
          width: 45px;
          margin-left: 5%;
          height: 16px;
          line-height: 16px;
          border-radius: 3px;
          box-sizing: border-box;
        }
        span:nth-child(2) {
          margin-left: 5%;
          width: 60%;
        }
      }
      .second-line {
        flex: 1;
        display: flex;
        align-items: center;
        margin-top: 2px;
        .default {
          width: 45px;
          margin-left: 5%;
          background-color: $buttom-color;
          color: $buttom-font-color;
          font-size: 12px;
          height: 16px;
          line-height: 16px;
          border-radius: 3px;
          text-align: center;
          box-sizing: border-box;
        }
        .address {
          margin-left: 5%;
          width: 60%;
          color: $font-color;
          font-size: 14px;
          height: 28px;
          display: flex;
          justify-content: center;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; //行数
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .no-message-wrapper {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 0 auto;
    background-color: $background-color;
    margin-top: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > span {
    color: $font-color;
    font-size: 14px;
    margin-top: 10px;
    display: inline-block;
    text-align: center;
    width: 100%;
  }
}
</style>
