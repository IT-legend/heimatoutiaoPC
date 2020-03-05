<template>
<!-- 使用element的面包屑组件 设置选项之间的分隔符-->
  <el-breadcrumb separator="=>">
    <!-- el-breadcrumb-item相当于router-link标签 -->
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <!-- 二级选项需要传值，动态的 props传值或者slot插槽-->
      <el-breadcrumb-item>
          <!-- 动态内容 -->
          <!-- 定义具名插槽 -->
          <slot name="title"></slot>
      </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
