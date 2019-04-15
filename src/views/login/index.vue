<template>
  <div>
    <mt-tab-container v-model="active" swipeable>
      <mt-tab-container-item id="tab-container1">
        <login @registered="i => active=i"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <registered @registered="i => active=i"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container3">
        <div style="height:100vh">
          <forgetwp :back="false" @registered="i => active=i"/>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Login from './login'
import Registered from './registered'
import Forgetwp from '@/components/mine/settings/forgetPW'

export default {
  components: {
    Login,
    Registered,
    Forgetwp
  },
  data () {
    return {
      active: 'tab-container1'
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
