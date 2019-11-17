<template>
  <div class="wj-login">
    <div class="wj-login-block">
      <div class="login-image">
      </div>
      <div class="login-form">
        <div class="login-title">健康学院在线考试系统</div>
        <div class="login-user-form">
          <div class="input-stuId">学号</div>
          <el-input v-model="form.stuId" placeholder="请输入你的学号"></el-input>
          <div class="input-stuId">密码</div>
          <el-input v-model="form.password" placeholder="请输入登录密码" type="password"></el-input>
          <div class="save-user-type">
            <el-checkbox v-model="saveType" class="fl">自动登录</el-checkbox>
            <span class="forget-password fr">忘记密码</span>
          </div>
          <div class="login-btn">
            <el-button type="primary" style="width:100%" @click="login"><span :class="{'el-icon-loading':isloading}"></span>登录</el-button>
          </div>
          <div class="teacher-manage">
            <span class="teacher-manage-title">教师系统>></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        stuId: '',
        password: ''
      },
      // 是否自动登录
      saveType: false,
      // 存储session信息
      studentInfo: {
        id: '',
        name: ''
      },
      // 点击登录执行loading图案
      isloading: false
    }
  },
  methods: {
    // 登录
    login () {
      let data = this.form
      this.isloading = true
      this.$http.post('/studentApi/student/login', data).then(res => {
        if (res.body.msg === 'success') {
          this.studentInfo.id = res.body.data[0].id
          this.studentInfo.name = res.body.data[0].name
          this.addUserSession()
          location.reload()
          // console.log(this.studentInfo)
        } else {
          this.$message.error('登录失败！请确保您的信息输入正确')
          this.isloading = false
        }
      })
    },
    // 登录后存储用户信息保存到sessionStorage
    addUserSession () {
      let setting = this.studentInfo
      window.sessionStorage.setItem('studentInfo', JSON.stringify(setting))
    }
  }
}
</script>
<style lang="scss" scoped>
.wj-login{
  width:100%;
  height:100%;
  background:#f5f5f5;
  position: fixed;
  z-index: 250;
  flex-direction:column;
  align-items:center;
  display:flex;
}
.wj-login-block{
  width:1200px;
  background:white;
  box-shadow: 0 0 14px #ccc;
  border-radius:10px;
  margin:auto;
  overflow:hidden;
}
.login-image{
  width:700px;
  height:700px;
  border-radius:10px 0 0 10px;
  background:url('~@A/images/11_gz.jpg') no-repeat center;
  float:left;
}
.login-form{
  width:500px;
  height:420px;
  // background:orange;
  float:right;
  margin:140px 0;
  box-sizing: border-box;
  padding: 30px 20px;
}
.login-title{
  width:100%;
  text-align:center;
  font-size:28px;
  color:#333333;
}
.login-user-form{
  // height:300px;
  margin:0 40px;
  // background:skyblue;
  text-align:left;
  padding:20px 0;
}
.input-stuId{
  font-weight:400;
  font-size:14px;
  color:rgb(51,51,51);
  margin-bottom:10px;
  margin-top:20px;
}
.save-user-type{
  width:100%;
  margin:20px 0 30px 0;
  overflow:hidden;
}
.forget-password{
  color:#33A1FD;
  font-size:14px;
  float:right;
  cursor:pointer;
  &:hover{
    font-weight:bold;
  }
}
.teacher-manage{
  margin-top:10px;
  font-size:14px;
  text-align: right;
  .teacher-manage-title{
    &:hover{
      color:#33A1FD;
      text-decoration: underline;
      cursor:pointer;
    }
  }
}
</style>
<style lang="scss">
// 消息样式 STR
.el-message--warning{
  background-color: #fef8e8;
  border-color: #F4C333;
  .el-icon-warning{
    color: #F4C333;
  }
  .el-message__content{
    color: #333333;
  }
}

.el-message--success{
  background-color: #f1f7f5;
  border-color: #61C09F;
  .el-icon-success{
    color: #61C09F;
  }
  .el-message__content{
    color: #333333;
  }
}

.el-message--error{
  background-color: #ffeeee;
  border-color: #FA5555;
  .el-icon-error{
    color: #FA5555;
  }
  .el-message__content{
    color: #333333;
  }
}

.el-message--info{
  background-color: #fff;
  border-color: #C0C4CC;
  .el-icon-info{
    color: #C0C4CC;
  }
  .el-message__content{
    color: #333333;
  }
}
.el-message{
  min-width: auto;
  padding: 15px 20px;
}
// 消息样式 END
</style>
