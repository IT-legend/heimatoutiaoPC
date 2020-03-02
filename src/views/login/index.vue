<template>
  <div class="login bg">
      <!-- 登陆表单 -->
      <el-card class="login-card">
        <!-- 表单内容 -->
        <!-- 1.头部logo部分 -->
        <div class="logo">
        <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 2.表单 绑定model属性 绑定rules属性（表单验证规则）-->
        <el-form :model='loginForm' :rules='loginRules' style="margin-top:7px">
          <!-- 表单容器 全部设置prop属性 prop表示要校验的字段名-->
          <el-form-item prop="mobile">
            <!-- 2.1填写手机号表单域 绑定mobile-->
            <el-input v-model='loginForm.mobile' placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <!-- 2.2填写手机验证码表单域 绑定code-->
            <el-input v-model='loginForm.code' style='width:60%;float:left' placeholder="请输入验证码"></el-input>
            <el-button style='float:right;width:30%' plain="">发送验证码</el-button>
          </el-form-item>
          <el-form-item prop="checked">
            <!-- 2.3服务条款表单域 绑定checked-->
            <el-checkbox v-model='loginForm.checked'>
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
  data () {
    return {
      // 登陆表单的数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否同意用户授权
      },
      // 定义表单的验证规则
      loginRules: {
        // required为true表示必填，required只能校验null、undefined和空字符串，但不能校验布尔值
        mobile: [{ required: 'true', message: '您的手机号码不能为空！' }, { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码！' }],
        code: [{ required: 'true', message: '您的验证码不能为空！' }, { pattern: /^\d{6}$/, message: '请输入正确的验证码！' }],
        // 自定义校验
        checked: [{
          validator: function (rule, value, callback) {
          // rule是当前的校验规则
          // value是当前要校验的字段的值
          // callback是回调函数，无论成功还是失败都会执行
          // 成功=>callback，失败=>callback(new Error)
            value ? callback() : callback(new Error('请先阅读服务条款'))
          }
        }]
      }
    }
  }
}
</script>

<style lang='less' scoped>
// 给标签添加了scoped属性，当前样式就默认只会对本页面生效
// 想用less写法，必须给style标签添加lang属性
  .login {
    // background-image: url('../../assets/img/hizei.jpg');

    height: 100vh; // 当前屏幕可视区域分为100份
    // background-size: cover;
    display: flex; // 采用flex布局
    justify-content: center; // 水平居中
    align-items: center; // 垂直居中
  &:before {
    content: ''; //必写，不然不显示
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/hizei.jpg');
    background-size: cover;
    filter: blur(1px);
  }
  .login-card {

    z-index: 2;
    width: 400px;
    height: 300px;
    background-color: rgba(137,175,155,.5); // 卡片模块设为透明背景
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
