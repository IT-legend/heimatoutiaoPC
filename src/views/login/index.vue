<template>
  <div class="login bg">
      <!-- 登陆表单 -->
      <el-card class="login-card">
        <!-- 表单内容 -->
        <!-- 1.头部logo部分 -->
        <div class="logo">
        <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 2.表单 -->
        <el-form style="margin-top:7px">
          <!-- 表单容器 -->
          <el-form-item>
            <!-- 2.1填写手机号表单域 -->
            <el-input placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <!-- 2.2填写手机验证码表单域 -->
            <el-input style='width:60%;float:left' placeholder="请输入验证码"></el-input>
            <el-button style='float:right;width:30%' plain="">发送验证码</el-button>
          </el-form-item>
          <el-form-item>
            <!-- 2.3服务条款表单域 -->
            <el-checkbox>
              <span>我已经阅读同意用户协议和服务条款</span>
            </el-checkbox>
          </el-form-item>
          <!-- 2.4按钮表单域 -->
          <el-form-item>
            <el-button style='width:100%;' type="primary" plain="">登陆</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
// 给标签添加了scoped属性，当前样式就默认只会对本页面生效
// 想用less写法，必须给style标签添加lang属性
  .login {
    background-image: url('../../assets/img/sunwukong.jpg');

    height: 100vh; // 当前屏幕可视区域分为100份
    background-size: cover;
    display: flex; // 采用flex布局
    justify-content: center; // 水平居中
    align-items: center; // 垂直居中
  .login-card {
    width: 400px;
    height: 300px;
    background-color: rgba(0,0,0,.5); // 卡片模块设为透明背景
    text-align: center; // 内部组件为居中对齐
    .logo {
      text-align: center;
      img {
        height: 30px;
      };
    }
  }
  };

</style>
