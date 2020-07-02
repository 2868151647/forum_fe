import axios from 'axios'  //引入axios
//下面这两个不一定需要引入，看你项目需要拦截的时候做什么操作，但是一般都需要引入store
import store from '../store/index'  //引入store
import router from '../router/index'  //引入router

let serves = axios.create({
  // baseURL:'localhost:3000/forum/api/verifyToken',
  timeout: 20000, // 请求超时时间
  crossDomain: true,//设置cross跨域
  withCredentials: true,//设置cross跨域 并设置访问权限 允许跨域携带cookie信息
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
})

// serves.request({
//   method:'post',
//   url:'localhost:3000/forum/api/verifyToken'
// })

serves.interceptors.request.use(
  config => {
    console.log("xxx")
    if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      console.log('存在token')
      console.log(config.headers.authorization)
      config.headers.authorization = store.state.token  //请求头加上token
      console.log(config.headers.authorization)
    }
    return config
  },
  err => {
    console.log('不存在token')
    return Promise.reject(err)
  })

// http response 拦截器
serves.interceptors.response.use(
  response => {
    //拦截响应，做统一处理 
    console.log(response.data.code)
    if (response.data.code) {
      switch (response.data.code) {
        case 403:
          store.state.isLogin = false
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return response
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  })

  export default serves