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
        <div :class="{'examing-title':true,'title-color':titleColor}" @click="test">
          2019年第一学期JAVA期中考试
        </div>
      </div>
    </div>
    <!-- 考试题目 -->
    <div class="exam-topic-list">
      <div class="exam-topic-type">
        <div class="exam-topic-title">
          一、选择题
        </div>
        <div class="exam-topic-all" v-for="(item,index) in 20" :key="index">
          <p>{{index+1}}、0.6332的数据类型是()</p>
          <p><el-radio v-model="radio[index]" label="1">float</el-radio></p>
          <p><el-radio v-model="radio[index]" label="2">double</el-radio></p>
          <p><el-radio v-model="radio[index]" label="3">Float</el-radio></p>
          <p><el-radio v-model="radio[index]" label="4">Double</el-radio></p>
        </div>
      </div>
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
      // 示例答案
      radio: []
    }
  },
  methods: {
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
    getExamData () {
      let sumTime = 120 * 60
      this.formatSeconds(sumTime)
      this.countTime = setInterval(() => {
        sumTime = sumTime - 1
        if (sumTime > 0) {
          this.formatSeconds(sumTime)
        } else {
          this.$message.success('考试时间到')
          clearInterval(this.countTime)
          this.secondTime = '00'
        }
      }, 1000)
    },
    // 测试选择
    test () {
      console.log(this.radio)
    }
  },
  mounted () {
    document.onscroll = () => {
      this.handleTop()
    }
    this.getExamData()
    this.radio = new Array(20)
    this.radio.fill('')
    // console.log(this.radio)
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
  z-index:2400;
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
  margin:80px auto;
  padding:20px 0;
}
.exam-topic-type{
  width:100%;
  // background:orange;
  text-align:left;
}
.exam-topic-title{
  font-size:18px;
  margin-bottom:20px;
}
.exam-topic-all{
  font-size:16px;
  p{
    margin:10px;
  }
}
</style>
