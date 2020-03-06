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
            <!-- 这里用到作用域插槽=>子组件中的数据通过插槽传出，slot-scope接收 -->
            <!-- 这里我们知道：el-table-column组件在插槽中传出了 row $index store column四个属性，我们只需要接收就好 -->
            <template slot-scope="obj">
              <!-- 通过组件实现操作 -->
            <el-button type="text" size="small">修改</el-button>
            <!-- 文本内容应该是动态的，根据评论状态显示 -->
            <el-button @click='openOrClose(obj.row)' type="text" size="small">{{obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
            </template>
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
    },
    // 实现打开和关闭方法
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      // 因为$confirm也支持promise 成功就进then，失败就进catch
      this.$confirm(`是否确定${mess}评论`, '提示信息').then(() => {
        // 调用打开或关闭接口
        this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put', // 请求类型
          params: {
            article_id: row.id.toString() // 请求参数的文章id，将bigNumber类型的数字转成接口可识别的字符串类型，保持一致
          },
          data: {
            // body参数
            allow_comment: !row.comment_status // 打开还是关闭，跟评论状态相反
          }
        }).then(() => {
          // 成功提示消息，并更新数据
          this.$message.success(`${mess}评论成功`)
          this.getComment() // 拉取数据
        }).catch(() => {
          // 失败进入catch
          this.$message.error(`${mess}评论失败`)
        })
      })
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
