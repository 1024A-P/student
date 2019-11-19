<template>
  <div class="app-header">
    <!-- 顶部背景 -->
    <div :class="{'app-bg-header':true}">
      <div class="app-main-header">
        <!-- logo -->
        <div class="app-logo">
          <img src="~@A/images/logo/logo.jpg" width="60" class="top-logo">
          <span style="float:right">健康学院考试系统</span>
        </div>
        <div class="app-right">
          <!-- 右侧导航 -->
          <div class="app-menu">
            <ul>
              <li :class="{'isActive':activeIndex===1}" @click="jumpRoute(1)">
                首页
                <div
                  :class="{'under-border':true,'border-active':activeIndex===1}">
                </div>
              </li>
              <li :class="{'isActive':activeIndex===2}" @click="jumpRoute(2)">
                在线考试
                <div class="exam-head-num" v-show="examNum!==0">
                  <el-badge :value="examNum" class="item">
                  </el-badge>
                </div>
                <div
                  :class="{'under-border':true,'border-active':activeIndex===2}">
                </div>
              </li>
              <li :class="{'isActive':activeIndex===3}" @click="jumpRoute(3)">
                成绩查询
                <div
                  :class="{'under-border':true,'border-active':activeIndex===3}">
                </div>
              </li>
              <li :class="{'isActive':activeIndex===4}" @click="jumpRoute(4)">
                个人中心
                <div
                  :class="{'under-border':true,'border-active':activeIndex===4}">
                </div>
              </li>
              <li :class="{'isActive':activeIndex===5}" @click="jumpRoute(5)">
                关于
                <div
                  :class="{'under-border':true,'border-active':activeIndex===5}">
                </div>
              </li>
            </ul>
          </div>
          <!-- 右侧用户 -->
          <div class="app-user" v-show="false">
            林小夕
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      // 导航样式
      activeIndex: 1,
      examList: [],
      examAllId: [],
      examNum: 0,
      studentInfo: 0
    }
  },
  methods: {
    // 跳转
    jumpRoute (index) {
      this.activeIndex = index
      switch (index) {
        case 1:
          this.$toPage('/')
          break
        case 2:
          this.$toPage('/onlineExam')
          break
        case 3:
          this.$toPage('/searchPoint')
          break
        case 4:
          this.$toPage('/userInfo')
          break
        case 5:
          this.$toPage('/aboutUs')
          break
        default:
          break
      }
    },
    // 主页点击跳转
    indexClick () {
      this.$root.eventHandle.$on('INDEX_CLICK', to => {
        this.jumpRoute(to)
      })
    },
    // 根据路由名字默认显示active样式
    getRouteName () {
      let name = this.$route.name
      switch (name) {
        case 'Index':
          this.activeIndex = 1
          break
        case 'OnlineExam':
          this.activeIndex = 2
          break
        case 'StartExam':
          this.activeIndex = 2
          break
        case 'SearchPoint':
          this.activeIndex = 3
          break
        case 'UserInfo':
          this.activeIndex = 4
          break
        case 'AboutUs':
          this.activeIndex = 5
          break
        default:
          break
      }
    },
    // 获取答案的考试状态
    getExamStatus () {
      let data = {
        stuId: this.studentInfo.id,
        examId: this.examAllId
      }
      this.$http.post('/studentApi/student/getExamStatus', data).then(res => {
        if (res.body.msg === 'success') {
          let ob = res.body.data
          // 根据是否存在该考生对应的考试答案，有的话就说明已经考完，则让列表数据中的 status 设为 3
          this.examNum = this.examNum - ob.length
          if (this.examNum === 0) {
            this.introContent = this.studentInfo.name + '同学，你今天没有考试哦！'
          } else {
            this.introContent = this.studentInfo.name + '同学，你今天有' + this.examNum + '场考试，记得考试哦！'
          }
        } else {
          console.log('未知错误！获取学生考试状态')
        }
      })
    },
    // 获取所有考试的id和stuId
    getExamList () {
      this.$http.post('/studentApi/student/getAllExamId').then(res => {
        if (res.body.msg === 'success') {
          this.examList = res.body.data
          this.setExamList()
        } else {
          this.examList = []
        }
      })
    },
    setExamList () {
      // console.log(this.studentId)
      for (let i in this.examList) {
        let stuId = JSON.parse(this.examList[i].stuId)
        stuId.some((item) => {
          if (item === this.studentInfo.id) {
            this.examAllId.push(this.examList[i].id)
            this.examNum += 1
            return true
          }
        })
      }
      this.getExamStatus()
    }
  },
  mounted () {
    this.indexClick()
    this.getRouteName()
    if (sessionStorage.studentInfo) {
      this.studentInfo = JSON.parse(sessionStorage.studentInfo)
    }
    this.getExamList()
  },
  beforeDestroy () {
    this.$root.eventHandle.$off('INDEX_CLICK')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.app-header{
  width:100%;
  height:100px;
  // position:fixed;
  // top:0;
  z-index:9999;
  // background:url('~@A/images/top_background/list-top.png') no-repeat center;
}
.app-bg-header{
  width:100%;
  height:100%;
  // background:palevioletred;
  overflow:hidden;
  background:#2c323b;
  // transition:background ease 1.2s;
}
// 窗口下拉时改变背景颜色
.app-bg-change{
  background:#2c323b;
}
.app-main-header{
  width:1200px;
  height:100%;
  margin:0 auto;
  overflow:hidden;
}
.app-logo{
  height:100%;
  line-height:100px;
  color:white;
  font-size:30px;
  text-align:left;
  float:left;
  overflow:hidden;
}
.top-logo{
  border-radius:50%;
  margin-top:20px;
  margin-right:15px;
  float:left;
}
.app-right{
  height:100%;
  float:right;
  overflow:hidden;
}
.app-menu{
  overflow:hidden;
  height:100%;
  float:left;
  ul{
    width:100%;
    height:100%;
    // background:paleturquoise;
    overflow:hidden;
    margin:0;
    padding:0;
    li{
      float:left;
      list-style-type: none;
      width:120px;
      height:100px;
      line-height:100px;
      color:white;
      cursor:pointer;
      position:relative;
      // background:rgba(0, 0, 0, 0);
      // transition: background ease 0.7s;
      // &:hover{
      //   // background:rgba(0,0,0,0.3);
      //   background:#0c8ed9;
      // }
      .under-border{
        height:4px;
        border-radius:10px;
        background-color:#0c8ed9;
        position:absolute;
        bottom:15px;
        width:0;
        left:10px;
        transition:width ease 0.6s;
      }
      &:hover{
        color:#2daaf3;
      }
      &:hover .under-border{
        width:100px;
      }
      .border-active{
        width:100px;
      }
      .exam-head-num{
        position:absolute;
        top:-8px;
        right:0;
      }
    }
    .isActive{
      color:#2daaf3;
    }
  }
}
.app-user{
  // width:138px;
  height:24px;
  // background:skyblue;
  // display: inline-block;
  padding-left:40px;
  float:right;
  margin:38px 0;
  border-left:1px solid white;
  line-height:24px;
  color:white;
  // text-align:right;
  font-size:14px;
}
</style>
<style lang="scss">
.el-badge__content{
  border:none!important;
}
</style>
