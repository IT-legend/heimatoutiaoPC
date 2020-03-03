// 专门处理路由权限的问题
import router from '@/router'
// 注册全局前置守卫
router.beforeEach(function (to, from, next) {
  // next() //表示放过
  // next(false) //表示拦截
  // next(新地址) // 表示跳转到新页面
  if (to.path.startsWith('/home')) {
    //   判断to要去的页面是否以home开头，是的话给钥匙
    const token = window.localStorage.getItem('user-token')
    if (token) {
      // 如果是，放过
      next()
    } else {
      // 如果不是，返回登录页
      next('/login')
    }
  } else {
    //   不是home开头，放过
    next()
  }
})
