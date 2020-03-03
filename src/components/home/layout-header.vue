<template>
<!-- 1.使用elment自带的布局组件 el-row和el-col-->
  <el-row align='middle' type='flex' class="layout-header">
     <!-- 2.两个col等分成两列 :span='12'-->
     <!-- 2.1左侧列 -->
     <el-col class='left' :span="12">
         <!-- 3.图标就是i标签 -->
         <i class="el-icon-s-unfold"></i>
         <span>黑马程序员</span>
     </el-col>
     <!-- 2.2.右侧列 -->
     <el-col class='right' :span="12">
         <!-- 再次放置一个row组件 align属性（element自带）设置为垂直对齐 justify属性设置右侧对齐end-->
         <el-row type="flex" justify="end" align="middle">
         <!-- 里面放置图片作为头像 -->
         <img src="../../assets/img/sunwukong.jpg" alt="">
         <!-- 下拉菜单 改默认经过触发为点击触发-->
         <el-dropdown trigger="click">
             <!-- 下拉菜单显示的内容 -->
             <span>cc</span>
             <!-- 下拉内容需要做具名插槽 -->
             <el-dropdown-menu slot="dropdown">
                 <!-- 专门做下拉的组件 -->
                 <el-dropdown-item>啦啦啦</el-dropdown-item>
                 <el-dropdown-item>滴滴滴</el-dropdown-item>
                 <el-dropdown-item>嘿嘿嘿</el-dropdown-item>
             </el-dropdown-menu>
         </el-dropdown>
         </el-row>
     </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    .layout-header {
        height: 60px;
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
