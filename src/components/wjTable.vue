<template>
  <div class="wj-table">
    <el-table
      :data="tableData.list"
      style="width:100%;margin-bottom:15px;">
      <slot></slot>
    </el-table>
    <!-- 数据统计 -->
    <div class="data-count">
      当前显示第 {{tableData.page}} 页，共有 {{tableData.total}} 条数据
    </div>
    <!-- 分页 -->
    <div class="page-handle">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tableData.total"
        :page-size="tableData.size"
        @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data () {
    return {
    }
  },
  methods: {
    pageChange (page) {
      this.$emit('change', page)
    }
  },
  props: {
    tableData: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wj-table{
  overflow:hidden;
}
.data-count{
  font-size:10px;
  float:left;
  color:#aca9a9;
  padding-left:10px;
}
.page-handle{
  float:right;
}
</style>
<style lang="scss">
.el-table thead{
  color:rgba(51, 176, 253, 0.699);
}
.el-pager li{
  font-size:12px;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  color:#999999;
}
.el-table td, .el-table th{
  padding:10px 0;
}
</style>
