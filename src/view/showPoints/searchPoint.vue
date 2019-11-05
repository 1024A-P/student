<template>
  <div class="show-points">
    <div class="table-box">
      <wj-table :tableData="pointsData">
        <el-table-column prop="examId" label="试卷号" align="center"></el-table-column>
        <el-table-column prop="name" label="试卷名" align="center"></el-table-column>
        <el-table-column prop="maker" label="出卷人" align="center"></el-table-column>
        <el-table-column label="答题耗时" align="center">
          <template slot-scope="scoped">
            {{scoped.row.wasteTime+'分钟'}}
          </template>
        </el-table-column>
        <el-table-column prop="points" label="考试分数" align="center"></el-table-column>
        <el-table-column label="成绩统计" align="center">
          <template slot-scope="scoped">
            <div v-html="handlePoints(scoped.row.points)"></div>
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
      pointsData: {
        isloading: false,
        page: 1,
        total: 40,
        size: 10,
        list: [
          {
            examId: 'e1024',
            name: 'JAVA期中考试',
            maker: '林小夕老师',
            wasteTime: 98,
            points: 80
          },
          {
            examId: 'e1023',
            name: 'C#期中考试',
            maker: '林小夕老师',
            wasteTime: 91,
            points: 73
          },
          {
            examId: 'e1028',
            name: 'C++期中考试',
            maker: '林小夕老师',
            wasteTime: 14,
            points: 81
          },
          {
            examId: 'e1024',
            name: 'JAVA期中考试',
            maker: '林小夕老师',
            wasteTime: 55,
            points: 62
          },
          {
            examId: 'e1023',
            name: 'C#期中考试',
            maker: '林小夕老师',
            wasteTime: 62,
            points: 93
          },
          {
            examId: 'e1028',
            name: 'C++期中考试',
            maker: '林小夕老师',
            wasteTime: 87,
            points: 41
          },
          {
            examId: 'e1024',
            name: 'JAVA期中考试',
            maker: '林小夕老师',
            wasteTime: 102,
            points: 92
          },
          {
            examId: 'e1023',
            name: 'C#期中考试',
            maker: '林小夕老师',
            wasteTime: 75,
            points: 71
          },
          {
            examId: 'e1028',
            name: 'C++期中考试',
            maker: '林小夕老师',
            wasteTime: 46,
            points: 53
          },
          {
            examId: 'e1024',
            name: 'JAVA期中考试',
            maker: '林小夕老师',
            wasteTime: 68,
            points: 99
          }
        ]
      }
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
    }
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
