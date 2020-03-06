// 封装请求工具，实际上就是对axios进行二次封装
// 配置拦截器以及其他内容
import axios from 'axios'
import router from '@/router' // 导入路由实例
import JSONBig from 'json-bigint' // 导入bigint组件，用于处理json大数字错误问题
// 写入拦截器以及其他操作
// 配置axios的公共请求头地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 对axios的返回数据进行自定义处理，用json-bigint替代原来的json
// transformResponse要返回处理后的结果
axios.defaults.transformResponse = [function (data) {
  // 1.原本的json转换方法会错误
  // const res = JSON.parse(data)
  // return res
  // 2.所以这里用json-bigint来转化
  // const res = JSONBig.parse(data)
  // return res
  // 3.这里需要判断一下，data是否为空，空的就不能转化
  return data ? JSONBig.parse(data) : {}
}]
// 请求拦截器的开发设置
axios.interceptors.request.use(function (config) {
// 成功时执行第一个 成功时参数会带有一个config，表示所有axios的请求信息
// 需要在第一个函数中，将配置进行返回，返回的配置会当做请求参数进行请求
// 统一在返回之前注入token
  const token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  return config
}, function (error) {
// 失败时执行第二个 axios支持promise的 如果失败应该直接reject
// 失败时会有一个错误，直接reject错误即可，这样reject就会直接进入到axios的catch中
  return Promise.reject(error)
}
)

// 响应拦截器的开发设置
axios.interceptors.response.use(function (response) {
// 回调函数第一个参数是响应体，成功时执行
// 在拦截器中需要将数据返回
// 在这里我们要对数据进行结构操作，将嵌套的data数据释放出来，这样调用就不用加两个data了
// 这里用三元将数据拆了一层
  return response.data ? response.data : {} // 有的接口没有任何的响应数据
}, function (error) {
// 失败的时候执行
// error是错误对象，包含了错误的状态码和验证码
// 401出现表示：拿错token、token过期、token格式不对。。。
// 因为之前导航守卫已经检查了是否有token，所以这里以应该是token错误
// 粗暴型更换token：会登录页面
  if (error.response.status === 401) {
    localStorage.removeItem('user-token') // 删除token
    // 回登陆页，导入router实例，然后直接push回登录页
    router.push('/login')
  }
  return Promise.reject(error) // 所有的axios调用，catch依然可以拿到错误
})

// 导出二次封装后的工具
export default axios
