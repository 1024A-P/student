// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// Element-UI 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 添加全局组件
import Components from '@C'
// import './assets/sass/element-variables.scss'
// 引入公用的方法
import utils from '@U/utils'
// 全局插件
Vue.use({
  install (Vue) {
    // 路由跳转方法
    Vue.prototype.$toPage = function (val, obj) {
      let self = this
      if (typeof val === 'object') {
        obj = val
        val = self.$router.path
      }
      setTimeout(function () {
        self.$router.push({
          path: val,
          query: obj || {}
        })
      }, 0)
    }
  }
})
Vue.use(utils)
Vue.use(Components)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    /*
      用于创建页签事件派发
      派发事件：this.$root.eventHandle.$emit('事件名', '传递的参数')
      事件接收:
      created:function() {
        var self = this
        this.$root.eventHandle.$on('事件名', function(d) {})}
      }
    */
    eventHandle: new Vue()
  }
})
