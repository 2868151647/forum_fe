import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
// 持久化存储
const vuexLocal = new VuexPersistence({
  localStorage: window.localStorage,
  reducer: state => ({
    token: state.token, // 这个就是存入localStorage的值
    u_id:state.u_id
  })
})
const store = new Vuex.Store({
  state: {
    token: "",
    u_id:''
    // Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserId(state, u_id){
      state.u_id = u_id
    }
    
  },
  getters:{
      getToken(state) {
      if (!state.token) {
        // state.token = localStorage.getItem('token')
      }
      return state.token
      },
      clearAll(){
        localStorage.clear()
      }
  },
  actions: {},
  plugins: [vuexLocal.plugin]
})

export default store