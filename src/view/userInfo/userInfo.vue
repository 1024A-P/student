<template>
  <div class="user-info">
    <div class="line-title">
      <div class="title-position">欢迎你！陈大叔同学</div>
    </div>
    <div class="form-position">
      <div class="user-info-form">
        <el-form :model="userForm" status-icon ref="ruleForm" label-width="84px" label-position="right">
          <el-form-item label="姓名：" prop="pass">
            <el-input v-model="userForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="pass">
            <el-input type="password" v-model="userForm.password"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="pass">
            <el-radio-group v-model="userForm.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日：" prop="pass">
            <el-input v-model="userForm.birth"></el-input>
          </el-form-item>
          <el-form-item label="手机：" prop="pass">
            <el-input v-model="userForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="QQ：" prop="pass">
            <el-input v-model="userForm.qq"></el-input>
          </el-form-item>
          <el-form-item label="qq邮箱：" prop="pass">
            <el-input v-model="userForm.email"></el-input>
          </el-form-item>
          <el-form-item label="现居地址：" prop="pass">
            <el-input v-model="userForm.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">确定修改</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      userForm: {
        name: '陈大叔',
        password: '1023032504',
        sex: '1',
        birth: '1997-10-24',
        phone: '17612047283',
        qq: '1023032504',
        email: '1023032504@qq.com',
        address: '广东省广州市天河区广汕一路221号'
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.user-info{
  width:100%;
  min-height:600px;
  // background:skyblue;
  margin:0 auto;
  padding:30px 0;
  overflow:hidden;
  text-align:left;
}
// 公共标题 (前面带一竖线的标题)
.line-title{
  display: inline-block;
  height: 30px;
  line-height: 24px;
  font-size: 28px;
  // font-style:italic;
  color:#999999;
  // border-bottom:2px solid #eceaea;
  width:100%;
  padding-bottom:20px;
  box-shadow: 0 9px 12px 0 rgba(71, 71, 71, 0.1);
}
.title-position{
  width:1200px;
  margin:0 auto;
  // background:skyblue;
}
.form-position{
  width:1200px;
  // background:skyblue;
  margin:0 auto;
}
.user-info-form{
  // background:skyblue;
  padding-top:40px;
  width:400px;
}
</style>
