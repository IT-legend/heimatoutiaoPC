<template>
  <el-card>
      <!-- 账户信息页 -->
        <bread-crumb slot="header">
        <template slot="title">账户信息</template>
        </bread-crumb>
            <!-- 用表单实现 放置表单容器-->
            <el-form label-width="120px"
            :model="formData"
            :rules="rules"
            ref="myForm">
                <!-- 第一行表单域 用户名-->
                <el-form-item label="用户名" prop="name">
                    <el-input style="width:30%" v-model="formData.name"></el-input>
                </el-form-item>
                <!-- 第二行表单域 用户简介-->
                <el-form-item label="用户简介">
                    <el-input style="width:30%" v-model="formData.intro"></el-input>

                </el-form-item>
                <!-- 第三行表单域 用户邮箱-->
                <el-form-item label="用户邮箱" prop="email">
                    <el-input style="width:30%" v-model="formData.email"></el-input>

                </el-form-item>
                <!-- 第四行表单域 手机号码能看不能改，设置disabled属性即可-->
                <el-form-item label="手机号码">
                    <el-input style="width:30%" disabled="" v-model="formData.mobile"></el-input>

                </el-form-item>
                <!-- 第五行表单域 功能按钮-->
                <el-form-item>
                    <el-button type="primary" @click="saveUser">保存</el-button>
                </el-form-item>
            </el-form>
            <!-- 放置头像 -->
            <img :src="formData.photo ? formData.photo : defaultImg" alt="" class="head-upload">

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
      },
      defaultImg: require('../../assets/img/xhr1.jpg'), // 头像变量
      //   校验规则
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }, { min: 1, max: 7, message: '用户名长度必须为1-7位', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱名不能为空', trigger: 'blur' }, { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确', trigger: 'blur' }]
      }
    }
  },
  methods: {
    //   2-定义保存方法
    saveUser () {
      this.$refs.myForm.validate().then(() => {
        // 校验成功 调接口
        this.$axios({
          url: '/user/profile',
          method: 'patch', // 请求类型
          data: this.formData
        }).then(() => {
          this.$message.success('保存成功')
        }).catch(() => {
          this.$message.error('保存失败')
        })
      })
    },
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
