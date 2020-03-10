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
                  <img :src="item.url" alt="" @click="clickImg(item.url)">
              </el-card>
          </div>
            <!-- 2-定义分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height:80px">
                <el-pagination background layout="prev,pager,next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize"
                @current-change='changePage'></el-pagination>
            </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传素材" name="upload">
          <!-- 3-放置上传组件 必须写入action属性，否则报错-->
          <!-- http-request自定义上传 会传入一个params参数-->
          <el-upload action="" class="uploadImg" :http-request="uploadImg" :show-file-list='false'>
              <!-- 放置一个元素用来点击，进行上传 -->
              <i class="el-icon-circle-plus"></i>
          </el-upload>
      </el-tab-pane>
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
    },
    // 3-点击图片时触发
    clickImg (url) {
      // 将点击图片接收到的url参数传递给上层组件
      this.$emit('selectOneImg', url)// 将url参数传出去
    },
    // 4-自定义上传素材方法
    uploadImg (params) {
      // 调用上传接口
      const data = new FormData()
      // 加入文件参数
      data.append('image', params.file)
      // 开始发送上传请求
      this.$axios({
        url: '/user/images', // 请求接口
        method: 'post', // 上传或者新增一般为post类型
        data
      }).then(result => {
        // 上传成功，接口返回一个上传成功的图片url地址，拿到url之后要上传给父组件
        this.$emit('selectOneImg', result.data.url)// 将url参数传出去
      }).catch(() => {
        this.$message.error('上传失败')
      })
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
.uploadImg {
    display: flex;
    justify-content: center;
    i {
        font-size: 30px;
        padding: 50px;
        border: 2px dashed #ccc;
        border-radius: 4px;
    }
}
</style>
