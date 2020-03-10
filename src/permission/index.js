// 专门处理路由权限的问题
import router from '@/router'
import progress from 'nprogress' // 引入进度条包
import 'nprogress/nprogress.css' // 引入进度条样式文件
// 注册全局前置守卫
router.beforeEach(function (to, from, next) {
  // 在路由发生变化时
  // 开启进度条
  progress.start()

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
// 在全局的后置守卫的位置关闭，此时页面已经完成跳转
router.afterEach(() => {
  // setTimeout(() => progress.done(), 1000)
  // 关闭进度条
  progress.done()
})
