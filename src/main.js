import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


// import serves from './network/interceptor'
Vue.prototype.$reqs = axios
Vue.config.productionTip = false
Vue.use(ElementUI);

axios.defaults.headers.common['Authorization'] = store.state.token;

// let serves = axios.create({
//     baseURL:'http://localhost:3000',
//     timeout: 20000, // 请求超时时间
//     crossDomain: true,//设置cross跨域
//     withCredentials: true,//设置cross跨域 并设置访问权限 允许跨域携带cookie信息
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded'
//     }
//   })
axios.defaults.baseURL = 'http://localhost:3000/'
// serves.defaults.headers.common['Authorization'] = store.state.token;
axios.interceptors.request.use(
  config => {
    if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization=store.state.token
    }
    return config
  },
  err => {
    console.log('不存在token')
    return Promise.reject(err)
  })
// http response 拦截器
axios.interceptors.response.use(
  response => {
    //拦截响应，做统一处理 
    if (response.data.status) {
      switch (response.data.status) {
        case 403:
          store.getters.clearToken
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
      }
    }
    return response
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  })

  axios.get('http://localhost:3000/forum/token').then((res) => {
    console.log(res)
  })
  

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

new Vue({
  el: '#app',
  router,
  store,
  // serves,
  render: h => h(App)
})
