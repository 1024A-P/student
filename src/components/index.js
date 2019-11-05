/**
 * 注册全局组件
 * 命名规则：所有组件名称开头字母大写，驼峰标识
 * 所注册的组件会加一个“xy-”前缀，与element-ui（“el-”开头）区分开
 */
import Header from './wjHeader.vue'
import Footer from './wjFooter.vue'
import Table from './wjTable.vue'
// import LeftHeader from './wjLeftHeader.vue'
// import Input from './wjInput.vue'
// import Select from './wjSelect.vue'
// import Table from './wjTable.vue'
// import Dialog from './wjDialog.vue'
// import Card from './wjCard.vue'
const components = [
  Header,
  Footer,
  Table
  // LeftHeader,
  // Input,
  // Select,
  // Table,
  // Dialog,
  // Card
]
export default {
  install (Vue, opts = {}) {
    components.map(component => {
      Vue.component('wj' + component.name, component)
    })
  }
}
