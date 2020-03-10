<template>
  <div class="cover-image">
      <!-- v-for循环生成图片显示框 -->
      <div class="cover-image-item" v-for="(item,index) in list" :key="index">
          <!-- 图片地址就是我们的item 是上层publish传过来的list-->
          <!-- 但此时父组件传过来的item也是一个空字符串，因为还没有选择图片，所以此时要判断item是否有值来显示默认图片或显示传过来的图片 -->
          <img :src="item ? item : defaultImg" alt="">
      </div>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收publish传递过来参数
  data () {
    return {
      // 定义默认图片，如果父组件publish没有数据传出，就显示自己默认的图片
      defaultImg: require('../../assets/img/pic_bg.png')

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
