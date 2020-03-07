<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">文章列表</template>
      </bread-crumb>
      <!-- 搜索工具栏 筛选 -->
      <!-- 插入el-form表单容器 -->
      <el-form style="padding-left:50px">
          <!-- 第一项 -->
          <el-form-item label='文章状态：'>
              <!-- 放置单选框组 -->
              <el-radio-group v-model="searchForm.status">
                  <!-- 单选框选项 label值表示该选项对应的值-->
                  <!-- :label表示后面的值不加引号 -->
                  <el-radio :label="5">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">审核通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
              </el-radio-group>
          </el-form-item>
          <!-- 第二项 -->
          <el-form-item label='频道类型：'>
              <el-select v-model='searchForm.channel_id' placeholder="请选择频道">
                  <!-- 下拉选项 通过接口获取 -->
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <!-- 第三项 日期选择器-->
          <el-form-item label='日期范围：'>
              <!-- 日期范围选择组件 要设置type属性为daterange-->
              <el-date-picker type='daterange' v-model="searchForm.dateRange"></el-date-picker>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
    //   定义表单数据对象
      searchForm: {
        // 数据
        status: 5, // 默认为全部的状态
        channel_id: null, // 表示没有任何频道
        dateRange: [] // 日期范围
      },
      channels: [] // 专门来接收频道的数据
    }
  },
  methods: {
    //   定义获取频道数据的方法
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        //   获取频道接口返回的数据
        this.channels = result.data.channels
      })
    }
  },
  //   钩子函数实例化后调用
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
