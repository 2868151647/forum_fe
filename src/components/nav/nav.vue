<template>
  <div id="nav">
    <div class="frame">
      <div class='nav_left'>
        <slot name="nav_left">
          <div @click="itemClick1">首页</div>
        </slot>
      </div>
      <div class="nav_center">
        <slot name="nav_center">
          
        </slot>
      </div>
      <div class="nav_right">
        <slot name="nav_right">
        <span>欢迎用户:</span>
         <span>{{ user_name }}</span>
         <span class="exit" @click="clearLocalStorage">退出</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import store from "store/index";
import axios from "axios";
export default {
  data() {
    return {
      user_name: "",
    }
  },
  methods:{
    
    itemClick1(){
      this.$router.push({path:'/home'})
    },
    clearLocalStorage(){
      this.$store.getters.clearAll
      this.$router.push('/login')
    },
     getName(ft_name, fa_name) {
      this.user_name = fa_name + ft_name;
    }
  },
  props:{
   
  },
  mounted() {
    axios.post('http://localhost:3000/forum/users/' + store.state.u_id)
    .then( res => {
      let ft_name = res.data.data.first_name;
      let fa_name = res.data.data.family_name;
      this.getName(ft_name,fa_name)
      this.$emit('getfullname', this.user_name)
      this.$emit('getdata',res.data.data)
      // console.log(this.user_name)
    })
  },
}
</script>

<style scoped>
@import "~assets/css/nav.css";
</style>