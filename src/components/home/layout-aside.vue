<template>
  <div class="layout-aside">
      <!-- 头部图片 -->
      <div class="logo">
          <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <!-- 导航菜单 开启路由模式-->
      <el-menu :router='true' background-color="#323745" text-color="#ccc">
          <el-menu-item index="/home">
              <!-- 固定子菜单 首页-->
              <i class="el-icon-s-home"></i>
              <span>首页</span>
          </el-menu-item>
          <!-- 二级菜单 -->
          <el-submenu index='1'>
              <template slot="title">
                  <!-- 一级菜单title是具名插槽 -->
              <i class="el-icon-menu"></i>
              <span>内容管理</span>
              </template>
              <!-- 二级菜单选项 是匿名插槽-->
              <el-menu-item index="/home/publish">
                  发布文章
              </el-menu-item>
              <el-menu-item index="/home/articles">
                  内容列表
              </el-menu-item>
              <el-menu-item index="/home/comment">
                  评论列表
              </el-menu-item>
              <el-menu-item index="/home/material">
                  素材管理
              </el-menu-item>
          </el-submenu>
          <!-- 二级菜单 -->
          <el-submenu index='2'>
              <template slot="title">
               <!-- 一级菜单title是具名插槽 -->
              <i class="el-icon-star-on"></i>
              <span>粉丝管理</span>
              </template>
              <!-- 二级菜单选项 -->
              <el-menu-item index="/home/picture">
                  图文数据
              </el-menu-item>
              <el-menu-item index="/home/fans">
                  粉丝概况
              </el-menu-item>
              <el-menu-item index="/home/fansPic">
                  粉丝画像
              </el-menu-item>
              <el-menu-item index="/home/fanslIST">
                  粉丝列表
              </el-menu-item>
          </el-submenu>
          <el-menu-item index="/home/account">
              <!-- 固定子菜单 账户信息-->
              <i class="el-icon-user-solid"></i>
              <span>账户信息</span>
          </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    .layout-aside {
        background-color: #2e2f32;
        height: 100vh; //高度撑高
        width: 220px;
        .logo {
            text-align: center;
            padding: 10px 0;
            img {
                height: 30px;
            }
        }
        .el-menu {
            border-right: 0;
        }
    }
</style>
