<template>
<!-- el-card布局 -->
  <el-card>
      <!-- 放置面包屑组件 -->
      <bread-crumb slot="header">
      <!-- 具名插槽 -->
      <template slot="title">
          素材管理
      </template>
      </bread-crumb>
      <!-- 放置标签页 -->
      <el-tabs v-model="activeName">
          <!-- 子选项 -->
          <el-tab-pane label="全部素材" name="all">
              <!-- 子选项内容 -->
              all
          </el-tab-pane>
          <el-tab-pane label="收藏素材" name="collect">
              <!-- 子选项内容 -->
              like
          </el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all' // 当前默认选中的页签
    }
  }
}
</script>

<style>

</style>
