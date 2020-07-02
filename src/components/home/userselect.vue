<template>
  <div class="user_select">
    <div class="item2">
      <img src="~assets/img/3-用户2.png" alt width="15px" height="15px" />
      <router-link to="/usercenter">个人中心</router-link>
    </div>
    <div class="item2">
      <img src="~assets/img/收藏.png" alt width="15px" height="15px" />
      <span @click="tofocus">我的关注</span>
    </div>

    <div class="item2">
      <img src="~assets/img/历史记录icon.png" alt width="15px" height="15px" />
      <span>浏览记录</span>
    </div>
    <div class="item2">
      <img src="~assets/img/3-提示.png" alt width="15px" height="15px" />
      <span>信息反馈</span>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    tofocus(){
     
    }
  }
};
</script>

<style scoped>
@import '~assets/css/home/userselect.css'
</style>