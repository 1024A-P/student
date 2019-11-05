<template>
  <div class="online-exam">
    <div class="table-box">
      <wj-table :tableData="examList">
        <el-table-column prop="examId" label="试卷号" align="center"></el-table-column>
        <el-table-column prop="name" label="试卷名" align="center"></el-table-column>
        <el-table-column prop="maker" label="出卷人" align="center"></el-table-column>
        <el-table-column prop="startTime" label="开考时间" align="center"></el-table-column>
        <el-table-column prop="status" label="开始考试" align="center">
          <template slot-scope="so">
            <span v-show="so.row.status===1">尚未开考</span>
            <el-button v-show="so.row.status===2" size="mini" type="primary" @click="startExam(1)">开始</el-button>
            <span v-show="so.row.status===3">已结束</span>
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
        total: 40,
        size: 10,
        list: [
          {
            examId: 'e1024',
            name: 'JAVA期中考试',
            maker: '林小夕老师',
            startTime: '2019-10-24 09:00:00',
            status: 1
          },
          {
            examId: 'e1023',
            name: 'C#期中考试',
            maker: '林小夕老师',
            startTime: '2019-10-24 09:00:00',
            status: 3
          },
          {
            examId: 'e1028',
            name: 'C++期中考试',
            maker: '林小夕老师',
            startTime: '2019-10-24 09:00:00',
            status: 1
          },
          {
            examId: 'e1024',
            name: 'JAVA期中考试',
            maker: '林小夕老师',
            startTime: '2019-10-24 09:00:00',
            status: 2
          },
          {
            examId: 'e1023',
            name: 'C#期中考试',
            maker: '林小夕老师',
            startTime: '2019-10-24 09:00:00',
            status: 3
          },
          {
            examId: 'e1028',
            name: 'C++期中考试',
            maker: '林小夕老师',
            startTime: '2019-10-24 09:00:00',
            status: 1
          },
          {
            examId: 'e1024',
            name: 'JAVA期中考试',
            maker: '林小夕老师',
            startTime: '2019-10-24 09:00:00',
            status: 2
          },
          {
            examId: 'e1023',
            name: 'C#期中考试',
            maker: '林小夕老师',
            startTime: '2019-10-24 09:00:00',
            status: 1
          },
          {
            examId: 'e1028',
            name: 'C++期中考试',
            maker: '林小夕老师',
            startTime: '2019-10-24 09:00:00',
            status: 3
          },
          {
            examId: 'e1024',
            name: 'JAVA期中考试',
            maker: '林小夕老师',
            startTime: '2019-10-24 09:00:00',
            status: 1
          }
        ]
      }
    }
  },
  methods: {
    startExam (id) {
      this.$toPage('/startExam')
    }
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
