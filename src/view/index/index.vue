<template>
  <div class="app-index">
    <!-- 跑马灯 -->
    <el-carousel :interval="4000" arrow="always" height="500px" trigger="click">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.idView">
      </el-carousel-item>
    </el-carousel>
    <!-- 主体 -->
    <div class="body-content">
      <div class="content-block">
        <div class="block-title">在线考试</div>
        <div class="el-icon-monitor block-tuan"></div>
        <div class="block-sm">
          我们提供了在线考试系统方便考生在线考试
        </div>
        <div class="block-line">
          <div class="block-inline-line"></div>
        </div>
      </div>
      <div class="content-block">
        <div class="block-title">成绩查询</div>
        <div class="el-icon-search block-tuan"></div>
        <div class="block-sm">
          当考完试后，我们提供了在线查询成绩服务
        </div>
        <div class="block-line">
          <div class="block-inline-line"></div>
        </div>
      </div>
      <div class="content-block">
        <div class="block-title">个人中心</div>
        <div class="el-icon-user block-tuan"></div>
        <div class="block-sm">
          这是让你修改你的个人信息
        </div>
        <div class="block-line">
          <div class="block-inline-line"></div>
        </div>
      </div>
      <div class="content-block">
        <div class="block-title">关于</div>
        <div class="el-icon-postcard block-tuan"></div>
        <div class="block-sm">
          可以让你了解到我们该系统的业务
        </div>
        <div class="block-line">
          <div class="block-inline-line"></div>
        </div>
      </div>
    </div>
    <!-- 提交意见 -->
    <div class="submit-suggest-body">
      <div class="submit-suggest-index">
        <div class="submit-suggest-title el-icon-edit">
            &ensp;提出改进意见
        </div>
        <div class="suggest-body-main">
          <!-- 右侧图片 -->
          <div class="submit-suggest-img">
            <div>
              <img src="~@A/images/body_nice/test-body.jpg">
            </div>
          </div>
          <!-- 表单 -->
          <div class="submit-suggest-form">
            <el-form label-position="right" label-width="180px" :model="sugForm">
              <el-form-item
                label="你的姓名"
                :rules="[{ required: true, message: '请输入你的姓名', trigger: 'blur' }]">
                <el-input v-model="sugForm.name"></el-input>
              </el-form-item>
              <el-form-item
                label="所在专业"
                :rules="[{ required: true, message: '请输入你的所在专业', trigger: 'blur' }]">
                <el-input v-model="sugForm.major"></el-input>
              </el-form-item>
              <el-form-item
                label="所在班级"
                :rules="[{ required: true, message: '请输入你的所在班级', trigger: 'blur' }]">
                <el-input v-model="sugForm.class"></el-input>
              </el-form-item>
              <el-form-item
                label="需改进的地方"
                :rules="[{ required: true, message: '请输入改进意见', trigger: 'blur' }]">
                <el-input type="textarea" rows="8" resize="none" v-model="sugForm.suggest"></el-input>
              </el-form-item>
              <el-form-item style="text-align:left">
                <el-button plain>重置</el-button>
                <el-button type="primary">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      bannerList: [
        {id: 0, idView: require('../../assets/images/banner/banner_1.jpg')},
        {id: 1, idView: require('../../assets/images/banner/banner_2.jpg')},
        {id: 2, idView: require('../../assets/images/banner/banner_3.jpg')}
      ],
      // 意见表单
      sugForm: {
        name: '',
        major: '',
        class: '',
        suggest: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-index{
  width:100%;
  overflow:hidden;
}
// 跑马灯
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.banner-list{
  width:100%;
  height:100%;
}
.body-content{
  width:1200px;
  // background:skyblue;
  margin:120px auto;
  display:flex;
}
.content-block{
  flex:1;
  // height:300px;
  box-sizing: border-box;
  // background:orange;
  // border-bottom:1px solid rgb(200,200,200);
  cursor:pointer;
  .block-title{
    // background:skyblue;
    font-size:20px;
    color:#44454B;
    margin-bottom:26px;
  }
  .block-tuan{
    width:116px;
    height:116px;
    // background:skyblue;
    line-height:100px;
    font-size:50px;
    box-sizing: border-box;
    border:8px solid rgb(240,240,240);
    border-radius:50%;
    color:rgb(170, 170, 170);
    transform:rotate(0);
    transition:border-color ease 1s,transform linear 0.6s;
  }
  .block-sm{
    font-size:12px;
    color:#8E8E8E;
    // background:skyblue;
    margin:26px 0 20px 0;
    transition:color ease 1s;
  }
  .block-line{
    width:280px;
    height:1px;
    background-color:rgb(197, 196, 196);
    margin:0 auto;
  }
  .block-inline-line{
    width:0;
    height:1px;
    background-color:#44454B;
    transition:width ease 0.6s;
  }
  &:hover .block-tuan{
    border-color:rgb(174, 175, 180);
    transform:rotate(360deg);
  }
  &:hover .block-sm{
    color:#44454B;
    font-weight:bold;
  }
  &:hover .block-inline-line{
    width:100%;
  }
}
// 提交意见
.submit-suggest-body{
  width:100%;
  // height:500px;
  background:rgb(249,249,249);
  overflow:hidden;
}
.submit-suggest-index{
  width:1200px;
  // height:460px;
  // background:skyblue;
  margin:0 auto;
  padding:20px;
}
.submit-suggest-title{
  font-size:24px;
  text-align:left;
  color:rgb(125, 126, 138);
  width:100%;
  height:80px;
  line-height:80px;
  margin: 0 auto;
  // border-bottom:2px solid rgb(236, 232, 232);
}
.suggest-body-main{
  // background:skyblue;
  display:flex;
}
.submit-suggest-form{
  flex:1;
  // background:orange;
}
.submit-suggest-img{
  flex:1;
  height:400px;
  text-align: left;
  padding-top:20px;
  // background:#475669;
}
</style>
<style lang="scss">
.el-carousel__indicator.is-active button{
  // background-color:rgb(39, 235, 205);
  background-color:#fff;
}
.el-carousel__button{
  height:6px;
  border-radius:4px;
}
.el-carousel__arrow{
  width:50px;
  height:50px;
  background-color:rgba(31,45,61,0.2);
  font-size:14px;
}
.el-carousel__arrow:hover{
  background-color:rgba(31,45,61,0.3);
}
</style>
