<template>
  <el-card>
      <!-- 账户信息页 -->
    <bread-crumb slot="header">
        <template slot="title">账户信息</template>
    </bread-crumb>
            <!-- 用表单实现 放置表单容器-->
            <el-form label-width="120px">
                <!-- 第一行表单域 用户名-->
                <el-form-item label="用户名">
                    <el-input style="width:30%" v-model="formData.name"></el-input>
                </el-form-item>
                <!-- 第二行表单域 用户简介-->
                <el-form-item label="用户简介">
                    <el-input style="width:30%" v-model="formData.intro"></el-input>

                </el-form-item>
                <!-- 第三行表单域 用户邮箱-->
                <el-form-item label="用户邮箱">
                    <el-input style="width:30%" v-model="formData.email"></el-input>

                </el-form-item>
                <!-- 第四行表单域 手机号码能看不能改，设置disabled属性即可-->
                <el-form-item label="手机号码">
                    <el-input style="width:30%" disabled="" v-model="formData.mobile"></el-input>

                </el-form-item>
                <!-- 第五行表单域 功能按钮-->
                <el-form-item>
                    <el-button type="primary">保存</el-button>
                </el-form-item>
            </el-form>
            <!-- 放置头像 -->
            <img src="../../assets/img/xhr1.jpg" alt="" class="head-upload">

  </el-card>
</template>
<script>
export default {
  data () {
    return {
      // 定义个人信息数据
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    //   1-定义获取用户信息方法
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        //   将获取到的数据赋值给我们的表单数据
        this.formData = result.data
      })
    }
  },
  created () {
    //   调用获取数据方法
    this.getUserInfo()
  }
}
</script>

<style>
.head-upload {
    position: absolute;
    right: 200px;
    top: 150px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
}
</style>
