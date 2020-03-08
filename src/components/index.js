// 这里使用vue.use的方式来注册component组件
import LayoutAside from './home/layout-aside.vue'
import LayoutHeader from './home/layout-header.vue'
import Breadcrumb from './common/bread-crumb.vue' // 引入我们自己定义的面包屑公共组件
import VueQuillEditor from 'vue-quill-editor' // 引入富文本编辑器
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install: function (Vue) {
    // 注册全局组件Vue，这样在任意位置都可以直接使用它上面的方法，组件等
    Vue.component('layout-aside', LayoutAside) // 注册左侧导航组件
    Vue.component('layout-header', LayoutHeader) // 注册右侧头部组件
    Vue.component('bread-crumb', Breadcrumb) // 注册面包屑组件
    Vue.use(VueQuillEditor) // 注册富文本编辑器
  }
}
