<template>
  <div class="layout-aside">
      <!-- 1.头部图片 -->
      <div class="logo">
          <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <!-- 2.导航菜单 -->
      <el-menu background-color="#323745" text-color="#ccc">
          <el-menu-item>
              <!-- 2.1固定子菜单 首页-->
              <i class="el-icon-s-home"></i>
              <span>首页</span>
          </el-menu-item>
          <!-- 2.2二级菜单 -->
          <el-submenu>
              <template slot="title">
                  <!-- 一级菜单title是具名插槽 -->
              <i class="el-icon-menu"></i>
              <span>内容管理</span>
              </template>
              <!-- 二级菜单选项 是匿名插槽-->
              <el-menu-item>
                  发布文章
              </el-menu-item>
              <el-menu-item>
                  内容列表
              </el-menu-item>
              <el-menu-item>
                  评论列表
              </el-menu-item>
              <el-menu-item>
                  素材管理
              </el-menu-item>
          </el-submenu>
          <!-- 2.3二级菜单 -->
          <el-submenu>
              <template slot="title">
               <!-- 一级菜单title是具名插槽 -->
              <i class="el-icon-star-on"></i>
              <span>粉丝管理</span>
              </template>
              <!-- 二级菜单选项 -->
              <el-menu-item>
                  图文数据
              </el-menu-item>
              <el-menu-item>
                  粉丝概况
              </el-menu-item>
              <el-menu-item>
                  粉丝画像
              </el-menu-item>
              <el-menu-item>
                  粉丝列表
              </el-menu-item>
          </el-submenu>
          <el-menu-item>
              <!-- 2.4固定子菜单 账户信息-->
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
