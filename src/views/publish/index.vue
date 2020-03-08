<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">
            发布文章
        </template>
      </bread-crumb>
      <!-- 表单组件 -->
      <el-form ref='myForm' :model='publishForm' :rules="publishRules" style="margin-left:50px" label-width="100px">
          <!-- 第一行 标题行 -->
          <el-form-item label="标题" prop="title">
              <!-- 放置输入框组件 -->
              <el-input v-model='publishForm.title' placeholder='请输入标题' style="width:60%">
              </el-input>
          </el-form-item>
          <!-- 第二行 内容行 -->
          <el-form-item label="内容" prop="content">
              <!-- 输入文本域组件 -->
              <el-input v-model='publishForm.content' placeholder="请输入内容" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <!-- 第三行 封面行 -->
          <el-form-item label="封面" prop="cover">
              <!-- 放置单选组件 -->
              <el-radio-group v-model="publishForm.cover.type">
                  <!-- 这里需要给每一个el-radio加label属性 -->
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">多图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <!-- 第四行 频道行 -->
          <el-form-item label="频道" prop="channel_id">
              <!-- 放置下拉菜单组件 -->
              <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
                  <!-- 下拉选项 v-for获得-->
                  <!-- 要写label显示值和value保存值 -->
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <!-- 第五行 按钮行 -->
          <el-form-item >
              <!-- 放置两个按钮组件 发表和存入草稿-->
              <!-- true是草稿，false就不是草稿 -->
              <el-button @click='publish(false)' type="primary">发表文章</el-button>
              <el-button @click="publish(true)">存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      //   发布表单数据
      publishForm: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // -1是自动，0是无图，1是单图，3是三图
          imgaes: [] // 字符串数组，对应type
        }, // 文章封面
        channel_id: null // 频道id
      },
      //   发布表单的校验规则
      publishRules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }, { min: 5, max: 30, message: '标题应该在5-30个字符之间', trigger: 'blur' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      }
    }
  },
  methods: {
    //   定义方法获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels' // 接口
      }).then(result => {
        this.channels = result.data.channels // 将接口数据赋值给本地数据
      })
    },
    // 发布文章按钮定义手动校验表单的方法
    publish (draft) {
      // this.$refs 来获取el-form实例，实现调用方法
    //   validate两种调用方式：1，回调形式 2，promise形式
      this.$refs.myForm.validate().then(() => {
        //   进入这里表示校验成功了，调接口
        this.$axios({
          url: '/articles', // 请求地址
          methods: 'post', // 请求类型
          params: {
            draft
          }, // query参数
          data: this.publishForm // body参数
        }).then(() => {
          this.$message.success('发布成功')
          this.$router.push('/home/articles') // 发布成功，跳转到文章列表
        }).catch(() => {
          this.$message.error('发布失败')
        })
      })
    },
    created () {
    //   调用获取频道数据的方法
      this.getChannels()
    }
  }
}
</script>

<style>

</style>
