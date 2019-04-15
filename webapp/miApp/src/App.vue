<template>
  <div id="app">
    <router-view class="page"/>
    <tar-bar/>
  </div>
</template>

<script>
import TarBar from './components/tarBar'

export default {
  name: 'App',
  components: {
    TarBar
  }
}
</script>
<style lang="scss">
@import url("./assets/iconfont/iconfont.css");
@import "./style/reset.scss";
@import "./style/common.scss";

#app {
  height: 100vh;
  overflow: hidden;
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
  background-color: $item-color !important;
  color: $font-color !important;
}

.mint-button--primary {
  margin: 10px;
  background-color: $buttom-color;
  color: $buttom-font-color;
}
.mint-button--primary.is-plain{
  color:$buttom-color;
  border:1px solid $buttom-color;
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
