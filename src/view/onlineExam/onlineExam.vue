<template>
  <div class="online-exam">
    <div class="table-box">
      <wj-table :tableData="examList" @change="pageAction">
        <el-table-column prop="paperId" label="试卷号" align="center"></el-table-column>
        <el-table-column prop="paperName" label="试卷名" align="center"></el-table-column>
        <el-table-column prop="maker" label="出卷人" align="center"></el-table-column>
        <el-table-column prop="examTime" label="开考时间" align="center"></el-table-column>
        <el-table-column label="考试时长" align="center">
          <template slot-scope="so">
            {{so.row.wastedTime + '分钟'}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="开始考试" align="center">
          <template slot-scope="so">
            <span v-show="so.row.status==='1'">尚未开考</span>
            <el-button v-show="so.row.status==='2'" size="mini" type="primary" @click="startExam(so.row.id)">开始</el-button>
            <span v-show="so.row.status==='3'">已考完</span>
          </template>
        </el-table-column>
      </wj-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OnlineExam',
  data () {
    return {
      examList: {
        isloading: false,
        page: 1,
        total: 0,
        size: 10,
        list: []
      },
      exList: [],
      examAllList: [],
      studentInfo: {},
      // 存储所有考试id
      examIdAll: []
    }
  },
  methods: {
    startExam (id) {
      this.$confirm('确定开始考试？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$toPage('/startExam', {
          id: id
        })
      }).catch(() => {
        console.log('取消考试')
      })
    },
    // 获取考生考试状态
    getExamStatus () {
      let data = {
        stuId: this.studentInfo.id,
        examId: this.examIdAll
      }
      this.$http.post('/studentApi/student/getExamStatus', data).then(res => {
        if (res.body.msg === 'success') {
          let ob = res.body.data
          // 根据是否存在该考生对应的考试答案，有的话就说明已经考完，则让列表数据中的 status 设为 3
          for (let i in this.examAllList) {
            for (let j in ob) {
              if (this.examAllList[i].id === ob[j].examId) {
                this.examAllList[i].status = '3'
              }
            }
          }
        } else {
          console.log('未知错误！获取学生考试状态')
        }
      })
    },
    // 获取考试列表
    getExamList () {
      this.examList.isloading = true
      this.$http.post('/studentApi/student/getExamList').then(res => {
        if (res.body.msg === 'success') {
          this.examAllList = res.body.data
          this.setExamList()
          this.getExamStatus()
          this.examList.isloading = false
        } else {
          this.examAllList = []
          this.examList.isloading = false
        }
      })
    },
    setExamList () {
      // console.log(this.studentId)
      for (let i in this.examAllList) {
        let stuId = JSON.parse(this.examAllList[i].stuId)
        stuId.some((item) => {
          if (item === this.studentInfo.id) {
            this.exList.push(this.examAllList[i])
            return true
          }
        })
        this.examIdAll.push(this.examAllList[i].id)
      }
      // 处理数据集
      this.examList.list = this.$utils.getTableData(this.exList, this.examList.page, this.examList.size)
      this.examList.total = this.exList.length
    },
    // 列表分页
    pageAction (page) {
      this.examList.page = page
      this.examList.list = this.$utils.getTableData(this.exList, this.examList.page, this.examList.size)
    }
  },
  mounted () {
    if (sessionStorage.studentInfo) {
      this.studentInfo = JSON.parse(sessionStorage.studentInfo)
    }
    this.getExamList()
  }
}
</script>
<style lang="scss" scoped>
.online-exam{
  width:1200px;
  min-height:600px;
  // background:skyblue;
  margin:0 auto;
  padding:50px 0 30px 0;
}
.table-box{
  border:1px solid #ebebeb;
  padding:20px 0;
  // box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
