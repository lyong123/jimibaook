<template>
  <div>
    <mt-field label="username" placeholder="Input username" v-model="username"></mt-field>
    <mt-field label="password" placeholder="Input password" v-model="password"></mt-field>
    <mt-button type="primary" @click="toLogin">登录</mt-button>
    <mt-button type="danger" @click="toRegistered">注册</mt-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    toLogin () {

    },
    toRegistered () {
      this.$router.replace({name: 'Registered'})
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
