<template>
  <div class="show-points">
    <div class="table-box">
      <wj-table :tableData="pointsData">
        <el-table-column prop="paperId" label="试卷号" align="center"></el-table-column>
        <el-table-column prop="paperName" label="试卷名" align="center"></el-table-column>
        <el-table-column prop="maker" label="出卷人" align="center"></el-table-column>
        <el-table-column label="答题耗时" align="center">
          <template slot-scope="scoped">
            {{scoped.row.wastedTime+'分钟'}}
          </template>
        </el-table-column>
        <el-table-column label="考试分数" align="center">
          <template slot-scope="scoped">
            {{scoped.row.countPoint+'分'}}
          </template>
        </el-table-column>
        <el-table-column label="成绩统计" align="center">
          <template slot-scope="scoped">
            <div v-html="handlePoints(scoped.row.countPoint)"></div>
          </template>
        </el-table-column>
      </wj-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchPoint',
  data () {
    return {
      studentInfo: {},
      pointsData: {
        isloading: false,
        page: 1,
        total: 0,
        size: 10,
        list: []
      },
      pointAllData: []
    }
  },
  methods: {
    // 成绩统计
    handlePoints (points) {
      let result = ''
      if (points < 60) {
        result = '<span style="color:#F56C6C">不及格</span>'
      } else if (points >= 60 && points < 70) {
        result = '<span style="color:#E6A23C">及格</span>'
      } else if (points >= 70 && points < 90) {
        result = '<span style="color:#409EFF">良好</span>'
      } else if (points >= 90) {
        result = '<span style="color:#67C23A">优秀</span>'
      }
      return result
    },
    // 获取该考生成绩列表
    getStudentPoint () {
      this.pointsData.isloading = true
      let data = {
        stuId: this.studentInfo.id
      }
      this.$http.post('/studentApi/student/getStudentPoint', data).then(res => {
        if (res.body.msg === 'success') {
          this.pointAllData = res.body.data
          this.pointsData.isloading = false
          this.pointsData.total = res.body.data.length
          this.pointsData.list = this.$utils.getTableData(this.pointAllData, this.pointsData.page, this.pointsData.size)
        } else {
          this.pointsData.isloading = false
          this.pointsData.total = 0
          this.pointsData.list = []
          this.pointAllData = []
        }
      })
    },
    // 列表分页
    pageAction (page) {
      this.pointsData.page = page
      this.pointsData.list = this.$utils.getTableData(this.pointAllData, this.pointsData.page, this.pointsData.size)
    }
  },
  mounted () {
    if (sessionStorage.studentInfo) {
      this.studentInfo = JSON.parse(sessionStorage.studentInfo)
    }
    this.getStudentPoint()
  }
}
</script>
<style lang="scss" scoped>
.show-points{
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
