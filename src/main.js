import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui' // 引入模块
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
Vue.config.productionTip = false
Vue.use(Element) // 全局注册element模块，所有的位置都可以使用组件 这样就能为所欲为了
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
