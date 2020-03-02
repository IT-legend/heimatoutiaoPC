<template>
<!-- 必须在最外层放置一个container容器 因为所有小容器必须放在这个大容器中 -->
  <el-container>
      <!-- 左侧 -->
      <el-aside>
        左侧导航区域
      </el-aside>
      <!-- 右侧 -->
      <el-container>
        <!-- 右侧上部分 -->
        <el-header>顶部操作栏</el-header>
        <!-- 右侧下部分 -->
        <el-main>
          主要区域
          <!-- 这里应该放置二级路由 -->
          <router-view></router-view>
        </el-main>
      </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
