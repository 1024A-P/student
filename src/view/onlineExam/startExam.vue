<template>
  <div class="start-exam-main">
    <!-- 倒计时 -->
    <div :class="{'exam-time':true,'make-top':changeTop}">
      <div class="count-all-time">
        <div class="compute-time">
          {{hourTime}} 时
        </div>
        <div class="compute-time">
          {{minuteTime}} 分
        </div>
        <div class="compute-time">
          {{secondTime}} 秒
        </div>
        <div :class="{'examing-title':true,'title-color':titleColor}">
          {{examDetail.paperName}}
        </div>
      </div>
    </div>
    <!-- 考试题目 -->
    <div class="exam-topic-list">
      <!-- 选择题 -->
      <div class="exam-topic-type">
        <div class="exam-topic-title">
          选择题（本大题共{{examDetail.choiceCount/examDetail.choicePoint}}小题，每小题{{examDetail.choicePoint}}分，满分{{examDetail.choiceCount}}分）
        </div>
        <div class="exam-topic-all" v-for="(item,index) in choiceList" :key="index">
          <!-- 单选 -->
          <div v-if="item.type==='1'">
            <p>
              {{index+1}}、{{item.txtName}}
            </p>
            <p v-for="(pitem, pindex) in item.options" :key="pindex" class="p-font">
              <el-radio v-model="choiceAnswer[index]" :label="pindex">
                {{$utils.turnEng(pindex)+'. '+pitem}}
              </el-radio>
            </p>
          </div>
          <!-- 多选 -->
          <div v-if="item.type==='2'">
            <p>
              {{index+1}}、{{item.txtName}}<span v-show="item.type==='2'">(不定项)</span>
            </p>
            <el-checkbox-group v-model="choiceAnswer[index]">
              <p style="padding-left:10px">
                <el-checkbox :label="pindex" v-for="(pitem, pindex) in item.options" :key="pindex" style="display:block;margin-bottom:10px">
                  {{$utils.turnEng(pindex)}}.&ensp;{{pitem}}
                </el-checkbox>
              </p>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <!-- 判断题 -->
      <div class="exam-topic-type">
        <div class="exam-topic-title">
          判断题（本大题共{{examDetail.judgeCount/examDetail.judgePoint}}小题，每小题{{examDetail.judgePoint}}分，满分{{examDetail.judgeCount}}分）
        </div>
        <div class="exam-topic-all" v-for="(item,index) in judgeList" :key="index">
          <p>{{index+1}}、{{item.txtName}}</p>
          <p class="p-font">
            <el-radio v-model="judgeAnswer[index]" :label="1">正确</el-radio>
            <el-radio v-model="judgeAnswer[index]" :label="2">错误</el-radio>
          </p>
        </div>
      </div>
    </div>
    <!-- 交卷按钮 -->
    <div class="submit-btn">
      <el-button type="primary" @click="clickSubmit">确定交卷</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StartExam',
  data () {
    return {
      // 考试标题颜色变化
      titleColor: false,
      // 倒计时置顶
      changeTop: false,
      // 时分秒
      hourTime: '00',
      minuteTime: '00',
      secondTime: '00',
      // 定时器以便于清除
      countTime: '',
      // 考试详情
      examDetail: {},
      // 选择题列表
      choiceList: [],
      // 判断题列表
      judgeList: [],
      // 选择题答案
      choiceAnswer: [],
      // 判断题答案
      judgeAnswer: [],
      // 交卷或者关闭页面需要提交的数据
      uploadAnswer: {
        stuId: 0,
        examId: 0,
        makerId: 0,
        wastedTime: 0,
        maker: '',
        stuName: '',
        paperName: '',
        status: 0,
        finishDate: '',
        choiceAnswer: [],
        judgeAnswer: [],
        otherAnswer: ''
      }
    }
  },
  methods: {
    // 获取考试详情
    getExamDetail (id) {
      let data = {
        id: id
      }
      this.$http.post('/studentApi/student/getExamDetail', data).then(res => {
        if (res.body.msg === 'success') {
          // 获取选择题id
          let choiceId = res.body.data[0].choiceId
          if (choiceId !== '[]') {
            this.getChoiceList(choiceId)
          }
          // 获取判断题id
          let judgeId = res.body.data[0].judgeId
          if (judgeId !== '[]') {
            this.getJudgeList(judgeId)
          }
          this.examDetail = res.body.data[0]
          this.$alert('你已进入考试，请在规定时间内完成该考试！切勿关闭浏览器或者离开当前页面', '开始考试', {
            confirmButtonText: '确定',
            type: 'warning',
            callback: action => {
              this.startCountTime(this.examDetail.wastedTime)
            }
          })
        } else {
          console.log('未知错误！获取考试详情错误')
        }
      })
    },
    // 获取选择题列表
    getChoiceList (arr) {
      let data = arr
      this.$http.post('/studentApi/student/getChoiceList', data).then(res => {
        if (res.body.msg === 'success') {
          this.choiceList = res.body.data
          for (let i in this.choiceList) {
            this.choiceList[i].options = this.handleOptions(this.choiceList[i].options)
            if (this.choiceList[i].type === '1') {
              this.choiceAnswer[i] = ''
            } else {
              this.choiceAnswer[i] = []
            }
          }
        } else {
          console.log('未知错误！获取选择题列表失败')
        }
      })
    },
    // 获取判断题列表
    getJudgeList (arr) {
      let data = arr
      this.$http.post('/studentApi/student/getJudgeList', data).then(res => {
        if (res.body.msg === 'success') {
          this.judgeList = res.body.data
        } else {
          console.log('未知错误！获取选择题列表失败')
        }
      })
    },
    // 处理选项中单引号为双引号
    handleOptions (options) {
      let result = JSON.parse(options.replace(/'/g, '"'))
      return result
    },
    // 计时器置顶
    handleTop () {
      // console.log(document.documentElement.scrollTop)
      if (document.documentElement.scrollTop !== 0) {
        this.changeTop = true
        this.titleColor = true
      } else {
        this.changeTop = false
        this.titleColor = false
      }
    },
    // 计时器倒计时方法
    formatSeconds (value) {
      let secondTime = parseInt(value) // 秒
      let minuteTime = 0 // 分
      let hourTime = 0 // 小时
      if (secondTime > 60) { // 如果秒数大于60，将秒数转换成整数
        // 获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60)
        // 获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60)
        // 如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
          // 获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60)
          // 获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60)
        }
      }
      if (hourTime < 10) {
        this.hourTime = '0' + hourTime
      } else {
        this.hourTime = String(hourTime)
      }
      if (minuteTime < 10) {
        this.minuteTime = '0' + minuteTime
      } else {
        this.minuteTime = String(minuteTime)
      }
      if (secondTime < 10) {
        this.secondTime = '0' + secondTime
      } else {
        this.secondTime = String(secondTime)
      }
    },
    // 获取考试时间并作倒计时处理
    startCountTime (wastedTime) {
      let sumTime = wastedTime * 60
      this.formatSeconds(sumTime)
      this.countTime = setInterval(() => {
        sumTime = sumTime - 1
        if (sumTime > 0) {
          this.formatSeconds(sumTime)
        } else {
          this.submitAnswer()
          clearInterval(this.countTime)
          this.secondTime = '00'
        }
        this.uploadAnswer.wastedTime = wastedTime - Math.ceil(sumTime / 60)
      }, 1000)
    },
    // 点击交卷
    clickSubmit () {
      this.$confirm('确定提交试卷', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.submitAnswer()
      }).catch(() => {
        console.log('暂不交卷')
      })
    },
    // 确定交卷
    submitAnswer () {
      for (let i in this.choiceAnswer) {
        if (typeof (this.choiceAnswer[i]) === 'object') {
          this.choiceAnswer[i] = this.choiceAnswer[i].sort()
        }
      }
      this.uploadAnswer.stuId = this.studentInfo.id
      this.uploadAnswer.stuName = this.studentInfo.name
      this.uploadAnswer.examId = this.examDetail.id
      this.uploadAnswer.paperName = this.examDetail.paperName
      this.uploadAnswer.makerId = this.examDetail.makerId
      this.uploadAnswer.maker = this.examDetail.maker
      this.uploadAnswer.finishDate = this.$utils.getFormatDate()
      this.uploadAnswer.choiceAnswer = this.choiceAnswer
      this.uploadAnswer.judgeAnswer = this.judgeAnswer
      this.uploadAnswer.otherAnswer = ''
      this.uploadAnswer.status = 2
      this.uploadAnswer.studentId = this.studentInfo.stuId
      this.uploadAnswer.paperId = this.examDetail.paperId
      let data = this.uploadAnswer
      this.$http.post('/studentApi/student/uploadAnswer', data).then(res => {
        if (res.body.msg === 'success') {
          this.$message.success('已提交试卷，考试结束')
          this.$toPage('/onlineExam')
        } else {
          console.log('发生未知错误！提交试卷失败！')
        }
      })
    }
  },
  mounted () {
    if (sessionStorage.studentInfo) {
      this.studentInfo = JSON.parse(sessionStorage.studentInfo)
    }
    document.onscroll = () => {
      this.handleTop()
    }
    let id = this.$route.query.id * 1
    this.getExamDetail(id)
    window.onbeforeunload = event => {
      event.returnValue = ''
    }
  },
  beforeDestroy () {
    clearInterval(this.countTime)
  }
}
</script>
<style lang="scss" scoped>
.start-exam-main{
  width:100%;
  min-height:600px;
  padding-bottom:40px;
  // background:skyblue;
}
.exam-time{
  width:100%;
  height:80px;
  background:white;
  position:fixed;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
  top:100px;
  transition:top ease 1s,background ease 1s;
  // text-align: left;
  overflow:hidden;
  z-index:200;
}
// 置顶
.make-top{
  top:0;
  background:#2c323b;
}
.count-all-time{
  margin:0 auto;
  width:1200px;
  height:100%;
  // background:skyblue;
  text-align:right;
}
.compute-time{
  display:inline-block;
  width:80px;
  height:50px;
  // background:rgb(197,30,95);
  // background:#F56C6C;
  background:#409EFF;
  margin-left:10px;
  margin-top:15px;
  border-radius:8px;
  text-align:center;
  line-height:50px;
  color:white;
  font-size:22px;
}
.examing-title{
  height:40px;
  line-height:40px;
  // background:#409EFF;
  color:white;
  float:left;
  margin-top:20px;
  color:#303133;
  font-size:20px;
}
.title-color{
  color:white;
}
// 考试习题
.exam-topic-list{
  width:1200px;
  // height:500px;
  // background:skyblue;
  margin:80px auto 0 auto;
  padding:20px 0;
}
.exam-topic-type{
  width:100%;
  // background:orange;
  text-align:left;
  margin-bottom:30px;
}
.exam-topic-title{
  font-size:18px;
  margin-bottom:20px;
  font-weight: bold;
}
.exam-topic-all{
  font-size:16px;
  p{
    margin:10px;
    font-size:14px;
  }
}
.p-font{
  padding-left:10px;
}
.submit-btn{
  width:1200px;
  margin:0 auto;
  text-align: left;
}
</style>
