<template>
  <div class="content1">
          <div class="item1">
            <div>
              <img src="~assets/img/小楼icon.png" alt="" width="25px" height="25px">
            </div>
            <span @click="toPosting">发帖</span>
          </div>
          <div class="item1">
            <div>
              <img src="~assets/img/其他记录.png" alt="" width="25px" height="25px">
            </div>
            <span>草稿</span>
          </div>

          <div class="item1">
            <div>
              <img src="~assets/img/评论icon.png" alt="" width="25px" height="25px">
            </div>
            <span>板块</span>
          </div>
    </div>
</template>

<script>
export default {
  methods:{
    toPosting(){
       this.$router.push({path:'/posting'})
    }
  }
}
</script>

<style scoped>
@import '~assets/css/home/side.css'
</style>