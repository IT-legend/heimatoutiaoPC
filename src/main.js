import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui' // 引入模块
import axios from 'axiox' // 引入axios
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less' // 引入样式=>初始化工作搞定
Vue.config.productionTip = false
Vue.use(Element) // 全局注册element模块，所有的位置都可以使用组件 这样就能为所欲为了
// 配置axios的公共请求头地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // 将axios赋值给vue对象的原型属性，之后就可以直接this调用axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
