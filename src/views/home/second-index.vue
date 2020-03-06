<template>
<!-- home页面下的默认二级路由组件 -->
  <div class="homeTwo">
    <!-- element跑马灯 -->
    <el-carousel :interval="4000" type="card" height="220px">
      <el-carousel-item v-for="item in list" :key="item">
         <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list:
      [
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3663511007,1366474142&fm=26&gp=0.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583477232011&di=68823ee4cb24d15927669335249ef89d&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F3%2F5581156b05639.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=83118165,4156422393&fm=26&gp=0.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583477354789&di=e907f58dd6f238825c5c6493be653317&imgtype=0&src=http%3A%2F%2Fdesk.fd.zol-img.com.cn%2Ft_s960x600c5%2Fg5%2FM00%2F02%2F02%2FChMkJlbKxkGIEjWxAAatrBKE4RIAALHigBlp5sABq3E101.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583256058201&di=6d347ea46bb7fe7c483b103f12297731&imgtype=0&src=http%3A%2F%2Fwww.netbian.com%2Fd%2Ffile%2F20140511%2F2f42b589066cb7baba9f8a3ab820dd45.jpg'
      ]
    }
  }
}
</script>

<style lang='less'>
    .homeTwo {
      /* 这里需要用calc计算一下高度的数值 */
        height: calc(100vh - 60px);
        background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583252442884&di=b4fea5f449b7134d699332c32826de89&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb64543a98226cffc7a951157b8014a90f703ea9c.jpg");
        background-size: cover;
        img {
          width: 100%;
          height: 100%;
        }
    }
</style>
