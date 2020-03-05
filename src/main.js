import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 引入权限模块
import Element from 'element-ui' // 引入模块
import axios from '@/utils/request' // 引入二次封装后的axios
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less' // 引入样式=>初始化工作搞定
import Components from '@/components' // 引入我们的自定义组件目录
Vue.config.productionTip = false
Vue.use(Element) // 全局注册element模块，所有的位置都可以使用组件 这样就能为所欲为了
Vue.use(Components) // 注册开发自定义组件

Vue.prototype.$axios = axios // 将axios赋值给vue对象的原型属性，之后就可以直接this调用axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
