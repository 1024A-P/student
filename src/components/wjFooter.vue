<template>
  <div class="app-footer">
    <div class="index-footer">
      <!-- 左边内容 -->
      <div class="footer-left">
        <div class="sys-info">
          <p><span class="bottom-span">电话：</span>020-8331093</p>
          <p><span class="bottom-span">企业邮箱：</span>jkglxy@24cn.com</p>
          <p><span class="bottom-span">qq邮箱：</span>1023032504@qq.com</p>
          <p><span class="bottom-span">邮编：</span>522000</p>
          <p><span class="bottom-span">地址：</span>广东省广州市天河区广汕一路21号中山大学新华学院</p>
        </div>
        <div class="space-line"></div>
      </div>
      <!-- 右边内容 -->
      <div class="footer-right">
        <div class="two-code-img">
          <div class="code-img-menu">
            <img src="~@A/images/two_code/two-code-1.jpg">
          </div>
          <p>官方公众号</p>
        </div>
        <div class="two-code-img">
          <div class="code-img-menu">
            <img src="~@A/images/two_code/two-code-1.jpg">
          </div>
          <p>联系人微信</p>
        </div>
        <div class="two-code-img">
          <div class="code-img-menu">
            <img src="~@A/images/two_code/two-code-1.jpg">
          </div>
          <p>联系人QQ</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.app-footer{
  width:100%;
  height:300px;
  background:#2c323b;
}
.index-footer{
  width:1200px;
  height:100%;
  margin:0 auto;
  // background:white;
  display:flex;
  overflow:hidden;
}
.footer-left{
  flex:1;
  height:100%;
  // background-color:white;
  overflow:hidden;
  margin-top:50px;
}
.sys-info{
  width:90%;
  // height:200px;
  // background:orange;
  float:left;
  color:white;
  font-size:14px;
  p{
    text-align:left;
    margin-bottom:20px;
  }
}
.bottom-span{
  display:inline-block;
  width:100px;
  text-align:left;
  margin-right:20px;
}
.space-line{
  width:2px;
  height:100px;
  background:white;
  float:right;
  margin-top:40px;
}
.footer-right{
  flex:1;
  height:100%;
  // background-color:aqua;
  text-align:right;
}
.two-code-img{
  display:inline-block;
  // width:140px;
  height:140px;
  // background-color:orange;
  margin-top:80px;
  margin-left:60px;
  p{
    text-align:center;
    margin:0;
    margin-top:10px;
    font-size:14px;
    color:white;
  }
}
.code-img-menu{
  width:100px;
  height:100px;
  background:skyblue;
}
</style>
