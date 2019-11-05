import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@V/index/index'
import OnlineExam from '@V/onlineExam/onlineExam'
import StartExam from '@V/onlineExam/StartExam'
import SearchPoint from '@V/showPoints/searchPoint'
import UserInfo from '@V/userInfo/userInfo'
import AboutUs from '@V/aboutUs/aboutUs'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    // 在线考试
    {
      path: '/onlineExam',
      name: 'OnlineExam',
      component: OnlineExam
    },
    // 开始考试
    {
      path: '/startExam',
      name: 'StartExam',
      component: StartExam
    },
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // 成绩查询
    {
      path: '/searchPoint',
      name: 'SearchPoint',
      component: SearchPoint
    },
    // 个人中心
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    // 关于我们
    {
      path: '/aboutUs',
      name: 'AboutUs',
      component: AboutUs
    }
  ]
})
