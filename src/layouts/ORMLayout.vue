<template>
  <div class="orm-layout-wrapper">
    <div class="orm-layout-header">
      <header-menu></header-menu>
    </div>
    <div class="orm-layout-container">
      <div class="container-left-nav">

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
export default {
  components: {HeaderMenu}
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