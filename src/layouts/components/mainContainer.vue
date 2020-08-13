<template>
  <div class="main-container-cont">
    <div class="pb-breadcrumb-cont">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="router-view-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>
<style lang="scss">
.el-breadcrumb__inner {
  color: #fff;
}
</style>
<style lang="scss" scoped>
.main-container-cont {
  padding: 20px 30px;
  height: 100%;
  background-color: #191a21;
  box-sizing: border-box;
}
</style>