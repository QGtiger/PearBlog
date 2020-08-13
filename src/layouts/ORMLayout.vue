<template>
  <div class="orm-layout-wrapper">
    <div class="orm-layout-header">
      <header-menu></header-menu>
    </div>
    <div class="orm-layout-container">
      <div class="container-left-nav" :style="{width: leftMenuWidth+'px'}">
        <left-menu></left-menu>
      </div>
      <div class="container-right-content">
        <main-container></main-container>
      </div>
    </div>
    <div class="orm-layout-footer">
      
    </div>
  </div>
</template>

<script>
import HeaderMenu from './components/HeaderMenu'
import LeftMenu from './components/leftMenu'
import MainContainer from './components/mainContainer'
export default {
  components: {HeaderMenu, LeftMenu, MainContainer},
  data () {
    return {
      leftMenuWidth: 120
    }
  }
}
</script>

<style lang="scss">
.orm-layout-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .orm-layout-container {
    display: flex;
    flex-grow: 1;
    .container-left-nav {
      flex-shrink: 0;
    }
    .container-right-content {
      flex-grow: 1;
    }
  }
}
</style>