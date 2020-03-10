<template>
<!-- 发布页面publish的二级子组件，负责显示单图多图按钮的对应图片显示框 -->
  <div class="cover-image">
      <!-- v-for循环生成图片显示框 -->
      <div class="cover-image-item" v-for="(item,index) in list" :key="index" @click="openDialog">
          <!-- 图片地址就是我们的item 是上层publish传过来的list-->
          <!-- 但此时父组件传过来的item也是一个空字符串，因为还没有选择图片，所以此时要判断item是否有值来显示默认图片或显示传过来的图片 -->
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <el-dialog :visible="dialogVisible" @close='dialogVisible=false'>
          <!-- 这里我们再次封装一个组件，用来显示控制素材图片和上传 -->
          <select-image></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收publish传递过来参数
  data () {
    return {
      // 定义默认图片，如果父组件publish没有数据传出，就显示自己默认的图片
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false // 控制弹层显示或隐藏

    }
  },
  methods: {
    //   1-定义点击图片出现弹层的方法
    openDialog () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang='less' scoped>
    .cover-image {
        display: flex;
        .cover-image-item {
            border: 1px solid #ccc;
            width: 250px;
            height: 250px;
            padding: 15px;
            img {
                width: 100%;
            }
        }
    }
</style>
