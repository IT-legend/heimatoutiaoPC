<template>
  <!-- 用一个el-card组件做评论列表的主页面 -->
  <el-card>
    <!-- 1.放置面包屑组件 slot="header"表示面包屑会作为具名插槽给el-card的header部分，使样式完整-->
    <bread-crumb slot="header">
      <!-- 填坑评论管理 具名插槽需要写入相应的名字-->
      <template slot="title">流言蜚语</template>
    </bread-crumb>
    <!-- 2.放置一个表格 -->
    <el-table :data="list">
        <!-- 放置el-column列 并写入prop属性 表示显示的字段-->
        <el-table-column width='500' label='标题'></el-table-column>
        <el-table-column label='评论状态'></el-table-column>
        <el-table-column label='总评论数'></el-table-column>
        <el-table-column label='粉丝评论数'></el-table-column>
        <el-table-column label='操作'></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [
      ]
    }
  }
}
</script>

<style>
</style>
