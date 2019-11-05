<template>
  <div class="about-us">
    <!-- <img src="~@A/images/body_nice/test_3.jpg" width="100%"> -->
    <div class="header-banner">
      <div :class="{'header-title':true,'header-auto-opacity':moveSet}">
        基于Web的健康学院考试系统
      </div>
      <!-- 关于我们标题 -->
      <div :class="{'about-us-title':true,'about-move-active':moveSet}">
        关于我们<span style="font-size:30px;color:#e8e8e8"> / about us</span>
        <p>→&emsp;界面简洁</p>
        <p>→&emsp;操作简单</p>
        <p>→&emsp;响应速度快</p>
        <p>→&emsp;可扩展性高</p>
      </div>
    </div>
    <!-- 功能介绍 -->
    <div class="body-intru">
      <div class="intru-block">
        <div class="dh-left">“</div>
        <div class="intru-content">
          <p class="p-top">
            At vero eos at accusamus etiusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint!
          </p>
          <p class="p-bottom">界面简洁</p>
        </div>
      </div>
      <div class="intru-block">
        <div class="dh-left">“</div>
        <div class="intru-content">
          <p class="p-top">
            At vero eos at accusamus etiusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint!
          </p>
          <p class="p-bottom">操作简单</p>
        </div>
      </div>
      <div class="intru-block">
        <div class="dh-left">“</div>
        <div class="intru-content">
          <p class="p-top">
            At vero eos at accusamus etiusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint!
          </p>
          <p class="p-bottom">响应速度快</p>
        </div>
      </div>
      <div class="intru-block">
        <div class="dh-left">“</div>
        <div class="intru-content">
          <p class="p-top">
            At vero eos at accusamus etiusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint!
          </p>
          <p class="p-bottom">可扩展性高</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AboutUs',
  data () {
    return {
      // 标题特效
      moveSet: false,
      // 计时器
      moveTime: null
    }
  },
  methods: {

  },
  mounted () {
    this.moveTime = setTimeout(() => {
      this.moveSet = true
    }, 500)
    console.log(123)
  },
  beforeDestroy () {
    clearTimeout(this.moveSet)
  }
}
</script>
<style lang="scss" scoped>
.about-us{
  width:100%;
  // min-height:900px;
  margin:0 auto;
  overflow:hidden;
  text-align:left;
}
.header-banner{
  width:100%;
  height:735px;
  background:url('~@A/images/body_nice/test_3.jpg') no-repeat center;
  position:relative;
}
.header-title{
  border-radius:20px;
  padding:20px 40px;
  font-size:50px;
  position:absolute;
  right:20%;
  // background:rgba(0,0,0,.6);
  color:white;
  top:5%;
  text-shadow: -6px -6px 1px rgba(54, 54, 54, 0.16);
  font-style:italic;
  opacity: 0;
  transition:opacity ease 1s;
}
.header-auto-opacity{
  opacity: 1;
}
.about-us-title{
  font-size:50px;
  color:white;
  // font-weight:bold;
  background:rgba(255,255,255,0);
  border-radius:20px;
  width:auto;
  padding:40px;
  width:400px;
  text-align:left;
  position:absolute;
  right:-480px;
  top:21%;
  p{
    font-size:26px;
    text-align: left;
  }
  transition: right ease-out 1.2s,background linear 1.2s;
}
.about-move-active{
  right:19%;
  background:rgba(0,0,0,.6)
}
.body-intru{
  width:1200px;
  height:260px;
  // background:skyblue;
  margin:0 auto;
  display:flex;
  padding:80px 0;
}
.intru-block{
  flex:1;
  height:100%;
  // background:orange;
}
.dh-left{
  float:left;
  height:100%;
  width:20%;
  // background:blueviolet;
  font-size:60px;
  font-weight:bold;
  text-align: center;
}
.intru-content{
  width:80%;
  height:100%;
  float:left;
  // background:brown;
  p{
    margin:0;
  }
}
.p-top{
  height:86%;
  // background:cadetblue;
  padding:20px;
  font-size:14px;
  line-height:30px;
  box-sizing: border-box;
  color:#8a8787;
}
.p-bottom{
  font-size:16px;
  height:14%;
  padding-left:20px;
  font-weight:bold;
}
</style>
