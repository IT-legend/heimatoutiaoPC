<template>
  <!-- 发布页面publish的三级子组件 负责显示图片，控制图片的上传等-->
  <el-tabs v-model="activeName">
      <el-tab-pane label="素材库" name="material">
          <!-- 只做查询全部的素材 -->
          <!-- 1-定义外层容器 用来装图片素材数据 -->
          <div class="select-image-list">
              <!-- 循环素材图片 -->
              <el-card v-for="item in list" :key="item.id" class="image-card">
                  <!-- 放入img显示素材图片 -->
                  <img :src="item.url" alt="">
              </el-card>
          </div>
            <!-- 2-定义分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height:80px">
                <el-pagination background layout="prev,pager,next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize"
                @current-change='changePage'></el-pagination>
            </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传素材" name="upload">上传素材</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  // 定义变量，当前激活的便签
  data () {
    return {
      activeName: 'material', // 当前激活的变量
      list: [], // 当前全部素材的列表数据
      //   定义分页变量
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      }
    }
  },
  methods: {
    //   1-定义获取用户图片素材方法
    getAllImage () {
      this.$axios({
        url: '/user/images', // 请求地址
        params: {
          collect: false, // 我们查询全部素材，这里选择false
          page: this.page.currentPage, // 接口查询当前页码
          per_page: this.page.pageSize // 接口查询每页多少条
        }
      }).then(result => {
        //   拿到接口数据并赋值给我们定义的list
        this.list = result.data.results
        // 将数据总数赋值给我们的页码变量
        this.page.total = result.data.total_count
      })
    },
    // 2-改变页码方法
    changePage (newPage) {
    //   将新页码赋值给我们的当前页码
      this.page.currentPage = newPage
      //   重新获取数据
      this.getAllImage()
    }
  },
  created () {
    //   1-调用获取图片素材方法
    this.getAllImage()
  }
}
</script>

<style lang='less' scoped>
.select-image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .image-card {
        width: 150px;
        height: 150px;
        margin: 15px 0;
        img {
            width: 100%;
        }
    }
}
</style>
