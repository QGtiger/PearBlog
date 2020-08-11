<template>
  <div class="header-menu-cont">
    <div class="header-logo-cont">
      <div class="left-logo-cont">
        <img src="http://qnpic.top/yoona2.jpg" alt="">
      </div>
      <div class="right-cont">
        <p class="title-text">PearBlog</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
$themeColor: #262f41;
.header-logo-cont {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 30px;
  .left-logo-cont {
    width: 44px;
    height: 44px;
    border-radius: 100%;
    overflow: hidden;
  }
  .right-cont {
    margin-left: 20px;
    font-size: 20px;
    font-weight: 700;
    font-family: cursive;
    color: #ecf5ff;
  }
}
.header-menu-cont {
  height: 60px;
  box-shadow: 0 3px 5px #ccc;
  background-color: $themeColor;
}
</style>