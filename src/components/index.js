// 这里使用vue.use的方式来注册component组件
import LayoutAside from './home/layout-aside.vue'
import LayoutHeader from './home/layout-header.vue'

export default {
  install: function (Vue) {
    // 注册全局组件Vue，这样在任意位置都可以直接使用它上面的方法，组件等
    Vue.component('layout-aside', LayoutAside) // 注册左侧导航组件
    Vue.component('layout-header', LayoutHeader) // 注册右侧头部组件
  }
}
