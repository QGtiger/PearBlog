<template>
  <div class="left-menu-cont">
    <div class="left-main-menu">
      <ul class="left-aside">
        <li
          v-for="(item,index) in leftMenu"
          :key="'leftMain'+index"
        >{{ item.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import leftMenu from '@/assets/json/leftMenu.js'
export default {
  data () {
    return {
      leftMenu: leftMenu
    }
  }
}
</script>

<style lang="scss" scoped>
$themeColor: #262f41;
.left-menu-cont {
  .left-main-menu {
    width: 120px;
    height: 100%;
    background-color: $themeColor;
    .left-aside {
      li {
        color: #ecf5ff;
      }
    }
  }
}
</style>