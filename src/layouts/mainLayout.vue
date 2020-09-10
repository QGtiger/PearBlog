<template>
  <div class="main-layout-wrapper">
    <div class="main-layout-header">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="rgb(0 0 0 / 44%)"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu class="test" index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1" @click="handleTest">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="4"><router-link to="/login">登陆</router-link></el-menu-item>
      </el-menu>
    </div>
    <div class="main-layout-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  mounted () {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    handleTest () {
      console.log('test')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
.el-menu.el-menu--horizontal {
  border: none;
}
.el-menu--horizontal {
  border: none;
  .el-menu-item {
    background-color: rgba(0,0,0,0) !important;
  }
  .el-submenu__title {
    background-color: rgba(0,0,0,0) !important;
  }
}
.main-layout-header {
  .el-menu.el-menu--horizontal {
    display: flex;
    justify-content: flex-end;
    .el-menu-item {
      background-color: rgba(0,0,0,0) !important;
    }
    .el-submenu__title {
      background-color: rgba(0,0,0,0) !important;
    }
  }
}
</style>
