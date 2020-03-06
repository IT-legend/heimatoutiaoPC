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
      <!-- el-row可以布局 将按钮放入-->
      <el-row type="flex" justify="end">
      <!-- 放置一个上传组件 上传组件必须要求传action属性，不然就报错-->
      <el-upload :show-file-list='false' :http-request='upLoadImg' action="">
        <!-- 需要上传一个内容，点击就会弹出上传文件框 -->
        <el-button size='small' type="primary">上传素材</el-button>
      </el-upload>
      </el-row>
      <!-- 放置标签页 -->
      <el-tabs v-model="activeName" @tab-click="changeTab">
          <!-- 子选项 -->
          <el-tab-pane label="全部素材" name="all">
              <!-- 子选项内容 -->
              <div class="img-list">
                  <!-- 循环获取数据 -->
                  <el-card class='img-card' v-for='item in list' :key="item.id">
                      <!-- 放置图片，赋值图片地址 -->
                      <img :src="item.url" alt="">
                      <el-row class="operate" type="flex" justify="space-around" align="middle">
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-delete"></i>
                      </el-row>
                  </el-card>
              </div>
          </el-tab-pane>
          <el-tab-pane label="收藏素材" name="collect">
              <!-- 子选项内容 -->
              <div class="img-list">
                  <!-- 循环获取数据 -->
                  <el-card class='img-card' v-for='item in list' :key="item.id">
                      <!-- 放置图片，赋值图片地址 -->
                      <img :src="item.url" alt="">
                  </el-card>
              </div>
          </el-tab-pane>
      </el-tabs>
      <el-row type="flex" justify="center" style="height:80px" align="middle">
          <!-- 放置分页组件 -->
          <!-- total总条数 -->
          <!-- current-page 当前页码 -->
          <!-- page-size 每页多少条 -->
          <!-- 监听分页组件的切换事件 -->
          <el-pagination background :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize" layout="prev,pager,next" @current-change='changePage'></el-pagination>

      </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前默认选中的页签
      list: [], // 接收全部素材
      page: {
        currentPage: 1, // 默认第一页
        total: 0, // 当前页数
        pageSize: 8 // 每页多少条
      }
    }
  },
  methods: {
    // 定义一个上传素材的方法
    upLoadImg (params) {
      // params.file就是我要传的图片文件
      // 由于接口参数类型要求是formData，所以这里我们先实例化一个formdata
      const data = new FormData()
      // 加入文件参数
      data.append('image', params.file)
      // 开始发送上传请求
      this.$axios({
        url: '/user/images', // 请求接口
        method: 'post', // 上传或者新增一般为post类型
        data
      }).then(() => {
        // 成功就重新拉取数据
        this.getMaterial()
      }).catch(() => {
        this.$message.error('上传失败')
      })
    },
    //   监听页码的切换
    changePage (newPage) {
      //   传入新页码
      this.page.currentPage = newPage
      this.getMaterial()
    },
    //   获取素材
    getMaterial () {
      this.$axios({
        url: '/user/images', // 请求地址
        params: {
          collect: this.activeName === 'collect', // 获取不收藏的数据=获取全部数据
          page: this.page.currentPage,
          per_page: this.page.pageSize

        }, // get参数，也就是query参数
        data: {} // data参数，放的是body参数

      }).then(result => {
        //   将获取到的数据赋值给list
        this.list = result.data.results
        // 将图片数据总条数赋值给total
        this.page.total = result.data.total_count
      })
    },
    // 定义切换页码显示不同数据的方法
    changeTab () {
      this.page.currentPage = 1
      // 定义监听页签切换的方法
      this.getMaterial() // 直接调用获取素材的方法
    }
  },
  //   钩子函数：实例化后调用获取素材数据
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less'>
    .img-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        .img-card {
            position: relative;
            width: 220px;
            height: 240px;
            margin: 20px 20px;
            img {
                width: 100%;
                height: 100%;
            }
            .operate {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                background-color: #ccc;
                height: 50px;
                font-size: 25px;
            }
        }
    }
</style>
