<template>
  <div class="orm-layout-wrapper">
    <div class="orm-layout-header">
      <header-menu></header-menu>
    </div>
    <div class="orm-layout-container">
      <div class="container-left-nav">
        <left-menu></left-menu>
      </div>
      <div class="container-right-content">

      </div>
    </div>
    <div class="orm-layout-footer">
      
    </div>
  </div>
</template>

<script>
import HeaderMenu from './components/HeaderMenu'
import LeftMenu from './components/leftMenu'
export default {
  components: {HeaderMenu, LeftMenu}
}
</script>

<style lang="scss">
.orm-layout-wrapper {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>