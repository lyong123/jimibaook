<template>
  <div id="app">
    <start-page v-if="startPage"/>
    <loginPage v-if="!Authorization"/>
    <template v-else>
      <router-view class="page"/>
      <tar-bar/>
    </template>
  </div>
</template>

<script>
import StartPage from '@/common/startPage'
import TarBar from './components/tarBar'
import LoginPage from './views/login/index'
import { mapGetters, mapActions } from 'vuex'
import { setTimeout } from 'timers'
export default {
  name: 'App',
  components: {
    TarBar,
    LoginPage,
    StartPage
  },
  data () {
    return {
      startPage: true
    }
  },
  computed: {
    ...mapGetters(['Authorization'])
  },
  methods: {
    ...mapActions(['loadUserInfo'])
  },
  created () {
    this.Authorization && this.loadUserInfo()
    this.timer = setTimeout(() => {
      this.startPage = false
    }, 2000)
  }
}
</script>
<style lang="scss">
@import "./assets/iconfont/iconfont.css";
@import "./style/reset.scss";
@import "./style/common.scss";

html {
  font-size: 10vw;
}
#app {
  height: 100vh;
  overflow: hidden;
  font-size: 16px;
  .page {
    height: calc(100% - 46px);
    overflow-y: auto;
  }
}

.mint-searchbar {
  background-color: $item-color;
  .mint-searchbar-cancel {
    color: $font-color;
  }
  .mint-searchbar-inner {
    background-color: $background-color;
    input {
      background-color: $background-color;
      color: $font-light-color;
    }
    input::-webkit-search-cancel-button {
      display: none;
    }
  }
}
.mint-cell {
  .mint-cell-wrapper {
    background-image: none !important;
  }
  .mint-cell-left {
    -webkit-transform: none;
    transform: none;
  }
}

.mint-cell-text,
.mint-cell-value {
  font-size: $font-size;
  margin-right: 5px;
}
.mint-cell-value.is-link {
  margin-right: 30px;
  color: $buttom-color;
}

.mint-tab-container-wrap {
  height: 100%;
}

input.mint-field-core {
  background-color: $item-color;
  color: $font-color;
}

.mint-button--primary {
  margin: 10px;
  background-color: $buttom-color;
  color: $buttom-font-color;
}
.mint-button--primary.is-plain {
  color: $buttom-color;
  border: 1px solid $buttom-color;
}

.mint-navbar {
  background-color: $background-color;
  color: $font-light-color;
  margin-bottom: 3px;
  .mint-tab-item.is-selected {
    border-bottom: 3px solid $buttom-color;
    color: $buttom-color;
    margin-bottom: -3px;
  }
}

.mint-tabbar .mint-tab-item {
  padding: 4px 0;
}
</style>
