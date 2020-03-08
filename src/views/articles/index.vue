<template>
  <el-card class="articles">
      <bread-crumb slot="header">
        <template slot="title">文章列表</template>
      </bread-crumb>
      <!-- 搜索工具栏 筛选 -->
      <!-- 插入el-form表单容器 -->
      <el-form style="padding-left:50px">
          <!-- 第一项 -->
          <el-form-item label='文章状态：'>
              <!-- 放置单选框组 -->
              <!-- 第一种监听值改变的方式 change-->
              <!-- <el-radio-group @change='changeCondition' v-model="searchForm.status"> -->
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
              <!-- 第一种监听值改变的方式 change-->
              <!-- <el-select @change='changeCondition' v-model='searchForm.channel_id' placeholder="请选择频道"> -->
              <el-select v-model='searchForm.channel_id' placeholder="请选择频道">
                  <!-- 下拉选项 通过接口获取 -->
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <!-- 第三项 日期选择器-->
          <el-form-item label='日期范围：'>
              <!-- 日期范围选择组件 要设置type属性为daterange-->
              <!-- 第一种监听值改变的方式 change-->
              <!-- <el-date-picker @change="changeCondition" value-format='yyyy-MM-dd' type='daterange' v-model="searchForm.dateRange"></el-date-picker> -->
              <el-date-picker value-format='yyyy-MM-dd' type='daterange' v-model="searchForm.dateRange"></el-date-picker>
          </el-form-item>
      </el-form>
      <!-- 开始怼文章的主体结构 flex布局-->
      <!-- 1.表头 -->
      <el-row class='total' type="flex" align="middle">
          <span>共找到10000条符合条件的内容</span>
      </el-row>
      <!-- 2.列表内容 -->
      <!-- article-item作为循环项 -->
        <div class="article-item" v-for="item in list" :key="item.id.toString()">
            <!-- 2.1左侧内容 -->
            <div class="left">
                <!-- 文章封面有的有值有的没值，这里我们需要给它添加一个默认值 -->
                <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
                <div class="info">
                    <span>{{ item.title }}</span>
                    <el-tag :type='item.status | filterType' class="tag">{{ item.status | filterStatus }}</el-tag>
                    <span class="date">{{ item.pubdate }}</span>
                </div>
            </div>
            <!-- 2.2右侧内容 -->
            <div class="right">
                <span @click="$router.push(`/home/publish/${item.id.toString()}`)"><i class="el-icon-edit-outline"></i>修改</span>
                <!-- 需要传递参数，传入要删除的id -->
                <span @click="delMaterial(item.id.toString())"><i class="el-icon-delete"></i>删除</span>
            </div>
        </div>
        <!-- 放入分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height:80px">
          <el-pagination background layout="prev,pager,next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize"
          @current-change='changePage'></el-pagination>
        </el-row>
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
      channels: [], // 专门来接收频道的数据
      list: [], // 接收文章列表的数据
      //   地址对应的文件变成了变量，在编译时就会拷贝到对应的位置
      defaultImg: require('../../assets/img/default.gif'),
      // 定义分页对象
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  // 第二种监听方式：watch深度监听data中的数据变化
  watch: {
    searchForm: {
      deep: true, // 固定写法，表示深度检测searchForm中的数据变化
      // 固定写法，数据变化触发更新
      handler () {
        // 统一调用改变条件方法
        this.page.currentPage = 1 // 只要条件变化，页面归1
        this.changeCondition()
      }
    }
  },
  //   定义过滤器
  filters: {
    //   过滤器一：处理显示文本
    filterStatus (value) {
      // 对五个状态进行过滤
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    // 过滤器二：处理标签类型样式
    filterType (value) {
      // 根据当前状态的值，显示不同类型的tag标签
      switch (value) {
        case 0:
          return 'warning' // 草稿的时候就警告
        case 1:
          return 'info' // 待审核
        case 2:
          return ''
        case 3:
          return 'danger' // 失败就错误
      }
    }
  },
  methods: {
    delMaterial (id) {
      this.$confirm('Are you sure?', '提示信息').then(() => {
        // 表示确定删除
        // 调接口删除数据
        this.$axios({
          method: 'delete',
          url: `/articles/${id}` // 接口地址
        }).then(() => {
          // this.getArticles() // 这么写会舍去页码条件
          this.changeCondition()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    // 页码改变事件
    changePage (newPage) {
      // 将最新页码给当前页码
      this.page.currentPage = newPage // 最新页码赋值
      // 页码切换，需要重新组装条件
      this.changeCondition()
    },
    // 定义条件改变事件
    changeCondition () {
      // 当触发了此方法的时候 表单数据已经变成最新的了
      // 组装条件 params
      const params = {
        // 条件变化，回第一页
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 5是我们虚构的
        channel_id: this.searchForm.channel_id, // 表单数据
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      // 条件已经组装好，通过调用传给接口
      this.getArticles(params) // 直接调用获取列表方法
    },
    //   定义获取频道数据的方法
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        //   获取频道接口返回的数据
        this.channels = result.data.channels
      })
    },
    //   定义获取文章列表方法
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
      // 将返回数据赋值给我们的数据
        this.list = result.data.results
        // 将页码总数赋值给分页
        this.page.total = result.data.total_count
      })
    }
  },
  //   钩子函数实例化后调用
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang='less' scoped>
    .articles{
        .total{
            height: 60px;
            border-bottom: 1px dashed #ccc;
        }
        // 对文章循环项进行样式的编写
        .article-item {
            display:flex;
            justify-content: space-between;
            padding: 20px 0;
            border-bottom: 1px soild #ccc;
            .left {
                display: flex;
                img {
                    width: 180px;
                    height: 100px;
                    border-radius: 4px;
                }
                .info {
                    display: flex;
                    flex-direction: column;
                    height: 100px;
                    justify-content: space-around;
                    margin-left: 10px;
                    .date {
                        color:#999;
                        font-size: 12px;
                    }
                    .tag {
                        width: 60px;
                        text-align: center;
                    }
                }
            }
            .right {
                span {
                    font-size: 14px;
                    margin-right: 8px;
                    cursor: pointer;
                    user-select: none;
                }
            }

        }
    }

</style>
