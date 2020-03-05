// 封装请求工具，实际上就是对axios进行二次封装
// 配置拦截器以及其他内容
import axios from 'axios'
// 写入拦截器以及其他操作
// 配置axios的公共请求头地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
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
// 在这里我们要对数据进行结构操作，将嵌套的data数据释放出来
// 这里用三元将数据拆了一层
  return response.data ? response.data : {} // 有的接口没有任何的响应数据
}, function () {
// 失败的时候执行

})

// 导出二次封装后的工具
export default axios
