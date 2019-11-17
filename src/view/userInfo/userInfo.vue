<template>
  <div class="user-info">
    <!-- <div class="line-title">
      <div class="title-position">欢迎你！{{loginInfo.name}}同学</div>
    </div> -->
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
            <!-- <el-input v-model="userForm.birth" placeholder="请选择生日日期"></el-input> -->
            <el-date-picker
              v-model="dateTime"
              type="date"
              placeholder="请选择你的生日">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="手机：" prop="pass">
            <el-input v-model="userForm.phone" placeholder="请输入你的手机号码"></el-input>
          </el-form-item>
          <el-form-item label="QQ：" prop="pass">
            <el-input v-model="userForm.qq" placeholder="请输入你的qq号码"></el-input>
          </el-form-item>
          <el-form-item label="qq邮箱：" prop="pass">
            <el-input v-model="userForm.email" placeholder="请输入你的qq邮箱"></el-input>
          </el-form-item>
          <el-form-item label="现居地址：" prop="pass">
            <el-input type="textarea" :rows="3" resize="none" v-model="userForm.address" placeholder="请输入你的现居地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="certainClick">确定修改</el-button>
            <el-button @click="setBeginInfo">重置</el-button>
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
        id: 0,
        name: '',
        password: '',
        sex: '',
        birth: '',
        phone: '',
        qq: '',
        email: '',
        address: ''
      },
      loginInfo: {},
      beginData: {},
      dateTime: ''
    }
  },
  methods: {
    // 获取学生个人信息
    getStudentInfo () {
      let data = this.loginInfo
      this.$http.post('/studentApi/student/getStudentInfo', data).then(res => {
        if (res.body.msg === 'success') {
          this.userForm = res.body.data[0]
          this.beginData = JSON.parse(JSON.stringify(res.body.data[0]))
          this.dateTime = res.body.data[0].birth
        } else {
          console.log('获取个人信息失败！')
        }
      })
    },
    // 点击确定修改按钮
    certainClick () {
      this.$confirm('确定修改个人信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.setStudentInfo()
      }).catch(() => {
        console.log('取消删除')
      })
    },
    // 修改个人信息
    setStudentInfo () {
      if (this.dateTime !== '' && this.dateTime !== null) {
        this.userForm.birth = this.$utils.formatTime(this.dateTime)
      } else {
        this.userForm.birth = ''
      }
      let data = this.userForm
      this.$http.post('/studentApi/student/setStudentInfo', data).then(res => {
        if (res.body.msg === 'success') {
          this.$message.success('恭喜你！修改个人信息成功')
          this.getStudentInfo()
        } else {
          console.log('未知错误！修改个人信息失败')
        }
      })
    },
    // 重置
    setBeginInfo () {
      this.userForm = JSON.parse(JSON.stringify(this.beginData))
    }
  },
  mounted () {
    if (sessionStorage.studentInfo) {
      this.loginInfo = JSON.parse(sessionStorage.studentInfo)
    }
    this.getStudentInfo()
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
<style lang="scss">
.el-textarea__inner{
  font-size:14px!important;
  font-family:'Avenir', Helvetica, Arial, sans-serif!important;
}
</style>
