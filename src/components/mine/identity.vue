<template>
  <page>
    <router-view class="router-view-class"></router-view>
    <header-title title="身份信息" rightInfo="提交" @clickRightInfo="commit" backIcon="icon-allow"></header-title>
    <div class="input-wrapper avatar">
      <span class="avatar-span">头像</span>
      <photo @selected="selectedImage">
        <span v-if="!avatarUrl">点击上传</span>
        <img v-else :src="avatarUrl" alt>
      </photo>
    </div>
    <mt-field class="input-wrapper" label="ID" placeholder="请输入您的ID" disabled v-model="userID"></mt-field>
    <mt-field class="input-wrapper" label="账号" placeholder="请输入您的用户名" v-model="account"></mt-field>
    <mt-field class="input-wrapper" label="昵称" placeholder="请输入您的昵称" v-model="nickname"></mt-field>
    <div class="click-wrapper" @click="changeSex">
      <mt-cell class="input-wrapper" title="性别" is-link>{{sexName}}</mt-cell>
    </div>
    <mt-field class="input-wrapper" label="微信" placeholder="请输入您的微信" v-model="wechat"></mt-field>
    <!-- <div class="click-wrapper" @click="changeLevel">
      <mt-cell class="input-wrapper" title="等级信息" is-link>{{level}}</mt-cell>
    </div>-->

    <mt-cell class="verified" title="实名认证" to="/mine/identity/verified" is-link></mt-cell>

    <mt-actionsheet :actions="sexActions" v-model="sexSheetVisible"></mt-actionsheet>
    <mt-actionsheet :actions="levelActions" v-model="levelSheetVisible"></mt-actionsheet>
  </page>
</template>
<script>
import store from '@/store/store'
import requset from '@/http'
import { baseURL, addUserInfoUrl, addHeaderImageUrl } from '@/http/api'
import { Toast } from 'mint-ui'
import Photo from '@/common/pickImage'

export default {
  components: {
    Photo
  },
  data () {
    return {
      upload: '',
      avatarUrl: '',
      sexSheetVisible: false,
      levelSheetVisible: false,
      sexActions: [
        {
          name: '男',
          method: n => {
            this.sex = 1
          }
        },
        {
          name: '女',
          method: n => {
            this.sex = 2
          }
        }
      ],
      levelActions: [
        {
          name: '1',
          method: n => {
            this.level = n.name
          }
        }
      ],

      userID: '',
      account: '',
      nickname: '',
      sex: '',
      wechat: '',
      level: ''
    }
  },
  computed: {
    sexName () {
      return this.sex === 2 ? '女' : '男'
    }
  },
  methods: {
    selectedImage (url) {
      this.avatarUrl = url
    },
    commit () {
      if (!this.avatarUrl) {
        Toast({
          message: '请选择头像',
          duration: 1000
        })
        return
      }
      if (!this.account) {
        Toast({
          message: '请输入账号',
          duration: 1000
        })
        return
      }
      if (!this.nickname) {
        Toast({
          message: '请输入昵称',
          duration: 1000
        })
        return
      }
      if (!this.sex) {
        Toast({
          message: '请选择性别',
          duration: 1000
        })
        return
      }
      if (!this.wechat) {
        Toast({
          message: '请输入微信号',
          duration: 1000
        })
        return
      }
      let fd = new FormData()
      fd.append('type', 'headerImage')
      fd.append('file', this.avatarUrl)

      fetch(`${baseURL}${addHeaderImageUrl}`, {method: 'POST',
        body: fd,
        headers: {
          'Authorization': this.$store.getters.Authorization
        }
      }).then(res => res.json()).then(res => {
        console.log(res)
      })
      let data = {
        account: this.account,
        nickname: this.nickname,
        sex: this.sex,
        wechatid: this.wechat
      }
      requset.post(addUserInfoUrl, data).then(res => {
        Toast({
          message: '提交成功',
          duration: 1000
        })
        store.dispatch('loadUserInfo')
        this.$router.back()
      })
    },
    changeSex () {
      this.sexSheetVisible = true
    },
    changeLevel () {
      this.levelSheetVisible = true
    }
  },
  created () {
    let info = store.state.userInfo
    if (JSON.stringify(info) !== '{}') {
      this.userID = info.tuijianma
      this.account = info.account
      this.nickname = info.nickname
      this.sex = info.sex
      this.wechat = info.wechatid
    }
  }
}
</script>
<style lang='scss' scoped>

.avatar {
  display: flex;
  align-items: center;
  .avatar-span {
    margin-left: 10px;
  }
  img{
    border-radius: 50%;
  }
}
.input-wrapper /deep/ {
  margin-top: 3px;
  background-color: $item-color;
  color: $font-light-color;
  font-size: $font-size;
  input {
    text-align: right;
  }
  .mint-field-clear {
    display: none;
  }
  .mint-cell-value.is-link {
    color: $font-color;
  }
}
.verified /deep/ {
  margin-top: 3px;
  background-color: $background-color;
  color: $font-light-color;
  .mint-cell-text {
    display: inline-block;
    font-size: 12px;
    margin-left: 10px;
  }
}
</style>
