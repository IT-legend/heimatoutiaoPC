<template>

<!-- 必须在最外层放置一个container容器 因为所有小容器必须放在这个大容器中 -->
  <el-container>
      <!-- 左侧 需要设置宽度，不然会影响布局-->
      <el-aside  style="width:220px;background:#2e2f32" >
        <!-- 1.左侧导航组件 -->
        <layout-aside></layout-aside>
      </el-aside>
      <!-- 右侧 -->
      <el-container>
        <!-- 右侧上部分 -->
        <el-header>
          <!-- 2.右侧顶部操作栏组件 -->
          <layout-header></layout-header>
        </el-header>
        <!-- 右侧下部分 -->
        <el-main style="padding:0">
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
