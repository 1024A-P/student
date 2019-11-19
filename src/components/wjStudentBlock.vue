<template>
  <div class="student-block">
    <el-tooltip
      class="item"
      effect="dark"
      :value="showTip"
      :content="introContent"
      placement="right-start">
      <div class="block-body" @click="onlineExam">
        <div class="student-image">
          <img src="@A/images/test.png" height="80px">
        </div>
        <div class="message-gif">
          <img src="@A/images/timg.gif" width="60px">
        </div>
      </div>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  name: 'StudentBlock',
  data () {
    return {
      showTip: false,
      timerFirst: null,
      timerSecond: null,
      examList: [],
      examAllId: [],
      examNum: 0,
      studentInfo: {},
      introContent: ''
    }
  },
  methods: {
    // 获取答案的考试状态
    getExamStatus () {
      let data = {
        stuId: this.studentInfo.id,
        examId: this.examAllId
      }
      this.$http.post('/studentApi/student/getExamStatus', data).then(res => {
        if (res.body.msg === 'success') {
          let ob = res.body.data
          // 根据是否存在该考生对应的考试答案，有的话就说明已经考完，则数量就减去返回的数组长度
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
    },
    onlineExam () {
      this.$root.eventHandle.$emit('INDEX_CLICK', 2)
    }
  },
  mounted () {
    this.timerFirst = setTimeout(() => {
      this.showTip = true
      this.timerSecond = setTimeout(() => {
        this.showTip = false
      }, 5000)
    }, 1000)
    if (sessionStorage.studentInfo) {
      this.studentInfo = JSON.parse(sessionStorage.studentInfo)
    }
    this.getExamList()
  },
  beforeDestroy () {
    clearTimeout(this.timerFirst)
    clearTimeout(this.timerSecond)
  }
}
</script>
<style lang="scss" scoped>
.student-block{
  height:100px;
  width:120px;
  position:absolute;
  top:20px;
  left:20px;
  z-index:240;
  text-align: left;
  .student-image{
    width:80px;
    margin-top:20px;
  }
}
.block-body{
  width:100%;
  height:100%;
  position: relative;
  overflow:hidden;
  cursor: pointer;
}
.message-gif{
  position:absolute;
  top:0;
  right:0;
  width:60px;
}
</style>
