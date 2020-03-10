<template>
<!-- 发布页面publish的二级子组件，负责显示单图多图按钮的对应图片显示框 -->
  <div class="cover-image">
      <!-- v-for循环生成图片显示框 -->
      <div class="cover-image-item" v-for="(item,index) in list" :key="index" @click="openDialog(index)">
          <!-- 图片地址就是我们的item 是上层publish传过来的list-->
          <!-- 但此时父组件传过来的item也是一个空字符串，因为还没有选择图片，所以此时要判断item是否有值来显示默认图片或显示传过来的图片 -->
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <el-dialog :visible="dialogVisible" @close='dialogVisible=false'>
          <!-- 这里我们再次封装一个组件，用来显示控制素材图片和上传 -->
          <!-- 这里需要监听自定义事件：监听谁就在谁的标签上写@ -->
          <select-image @selectOneImg='receiveImg'></select-image>
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
      dialogVisible: false, // 控制弹层显示或隐藏
      selectIndex: -1 // 定义变量用来接收当前点击了哪个图片的index索引

    }
  },
  methods: {
    //   1-定义点击图片出现弹层的方法
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index // 记录点击了哪张图片
    },
    // 2-接收三级组件中传来的数据url
    receiveImg (url) {
    //   拿到三级组件中点击的那个图片的地址，但是我们作为二级组件不能更改，数据是只读的，所以这里需要再次往上传递，传到publish中才能进行更改
    // 这里拿到了index索引，我们需要将它传出去
      this.$emit('selectTwoImg', url, this.selectIndex) // 将三级组件传过来的数据再次传递给publish父组件
      //   点击选好图片后关闭弹层
      this.dialogVisible = false
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
                height:100%
            }
        }
    }
</style>
