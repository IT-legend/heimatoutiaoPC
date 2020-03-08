<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">
            发布文章
        </template>
      </bread-crumb>
      <!-- 表单组件 -->
      <el-form style="margin-left:50px" label-width="100px">
          <!-- 第一行 标题行 -->
          <el-form-item label="标题">
              <!-- 放置输入框组件 -->
              <el-input placeholder='请输入标题' style="width:60%">
              </el-input>
          </el-form-item>
          <!-- 第二行 内容行 -->
          <el-form-item label="内容">
              <!-- 输入文本域组件 -->
              <el-input placeholder="请输入内容" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <!-- 第三行 封面行 -->
          <el-form-item label="封面">
              <!-- 放置单选组件 -->
              <el-radio-group>
                  <el-radio>单图</el-radio>
                  <el-radio>三图</el-radio>
                  <el-radio>多图</el-radio>
                  <el-radio>自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <!-- 第四行 频道行 -->
          <el-form-item label="频道">
              <!-- 放置下拉菜单组件 -->
              <el-select placeholder="请选择频道"></el-select>
          </el-form-item>
          <!-- 第五行 按钮行 -->
          <el-form-item >
              <!-- 放置两个按钮组件 发表和存入草稿-->
              <el-button type="primary">发表文章</el-button>
              <el-button>存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
