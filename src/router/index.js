import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入主页
import Home from '@/views/home' // 用一种简写的形式替换原有的方式
import HomeTwo from '@/views/home/second-index'
// 引入登录页
import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home' // 强制跳转到home页
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 在一级路由表下的children配置二级路由
    children: [
      {
        path: '', // 二级路由的path什么都不写，代表二级路由的默认组件
        component: HomeTwo
      }, {
        // path: '/home/comment', // 评论列表的地址
        path: 'comment', // 简写方式
        component: () => import('@/views/comment')// 组件需要按需加载
      }, {
        path: 'material',
        component: () => import('@/views/material')
      }, {
        path: 'articles',
        component: () => import('@/views/articles')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
  // {
  //   // 按需加载
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
