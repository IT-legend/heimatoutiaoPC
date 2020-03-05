<template>
<!-- 1.使用elment自带的布局组件 el-row和el-col-->
<!-- 设置flex布局，居中对齐 -->
  <el-row align='middle' type='flex' class="layout-header">
     <!-- 2.两个col等分成两列 一共24份，12就是一半 :span='12'-->
     <!-- 2.1左侧列 -->
     <el-col class='left' :span="12">
         <!-- 3.图标就是i标签 -->
         <i class="el-icon-s-unfold"></i>
         <span>全球渣男联盟</span>
     </el-col>
     <!-- 2.2.右侧列 -->
     <el-col class='right' :span="12">
         <!-- 再次放置一个row组件 align属性（element自带）设置为垂直对齐 justify属性设置右侧对齐end-->
         <el-row type="flex" justify="end" align="middle">
         <!-- 里面放置图片作为头像 -->
         <img :src="userInfo.photo" alt="">
         <!-- 下拉菜单 改默认经过触发为点击触发-->
         <el-dropdown @command = 'clickMenu' trigger="click">
             <!-- 下拉菜单显示的内容 -->
             <span>{{userInfo.name}}</span>
             <!-- 下拉内容需要做具名插槽 -->
             <el-dropdown-menu slot="dropdown">
                 <!-- 专门做下拉的组件 -->
                 <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                 <el-dropdown-item command='git'>我的仓库</el-dropdown-item>
                 <el-dropdown-item command='lgout'>退出登录</el-dropdown-item>
             </el-dropdown-menu>
         </el-dropdown>
         </el-row>
     </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {} // 用户个人信息数据
    }
  },
  methods: {
    clickMenu (command) {
    //   处理点击的三种不同情况
      if (command === 'info') {
        //   1.点击了个人信息
      } else if (command === 'git') {
        //   2.点击git地址跳转到我的git仓库
        window.location.href = 'https://github.com/IT-legend/heimatoutiaoPC'
      } else if (command === 'lgout') {
        //   3.退出系统：
        // 1.删除token
        window.localStorage.removeItem('user-token') // 删除localStorage中某个选项
        // 2.用编程式导航，跳转回登录页
        this.$router.push('/login')
      }
    }
  },
  created () {
    // 获取个人信息
    this.$axios({
      url: '/user/profile' // 请求地址
    }).then(res => {
      // 加载成功，将数据赋值给userInfo
      this.userInfo = res.data
    })
  }
}
</script>

<style lang='less' scoped>
    .layout-header {
        height: 45px;
        .left {
            i {
                font-size: 20px;
            }
        }
        .right {
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 5px;
            }
        }
    }
</style>
