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
        <el-table-column prop='title' width='500' label='标题'></el-table-column>
        <!-- 给el-table-column 的评论状态列一个formatter属性，用来格式化内容 -->
        <el-table-column :formatter='formatterBool' prop='comment_status' label='评论状态'></el-table-column>
        <el-table-column prop='total_comment_count' label='总评论数'></el-table-column>
        <el-table-column prop='fans_comment_count' label='粉丝评论数'></el-table-column>
        <el-table-column prop='' label='操作'>
            <!-- 通过组件实现操作 -->
            <el-button type="text" size="small">修改</el-button>
            <el-button type="text" size="small">关闭评论</el-button>
        </el-table-column>
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
  },
  methods: {
    // 获取评论数据
    getComment () {
      this.$axios({
        url: '/articles', // 请求地址
        // query参数在哪个位置传呢？
        // params 传get参数，就是query参数
        // data 传body参数，就是请求体参数
        params: {
          response_type: 'comment' // 迎来获取数据类型
        }
      }).then(result => {
        console.log(result)
        this.list = result.data.results
      })
    },
    // 定义一个格式化布尔值的函数
    formatterBool (row, column, cellValue, index) {
      // row 代表当前的一行数据
      // column 代表当前的列信息
      // cellValue 代表当前单元格的值
      // index 代表当前的索引
      // 该函数需要返回一个值来显示
      return cellValue ? '打开' : '关闭'
    }
  },
  created () {
    //   在钩子函数中，vue实例化后获取数据
    this.getComment()
  }
}
</script>

<style>
</style>
