<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <el-scrollbar style="height:auto">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <ul v-for="i in posts" class="list-item">
        <!-- √ -->
        <div class="item" @click="newsdetails(i._id)">
          <div class="tittle">标题：{{i.tittle}}</div>
        <!-- 图片路径能读取 但不能访问 写个网络请求 把每一张图片都返回一个网络路径 -->
          <!-- <img :src="i.tittleimg" alt=""> -->
          <div v-html=i.content class="item-content"></div>
          <div class="item-bottom">
          <div>{{i.author}}</div>
          <div>{{ new Date(i.date).getFullYear() }}/{{ new Date(i.date).getMonth()+1 }}/{{ new Date(i.date).getDate() }}/{{ new Date(i.date).getHours() }}:{{ new Date(i.date).getMinutes() }}</div>
          </div>
        </div>
      
      <!-- date 需要处理 -->
      
        <!-- 
        {{ i.tittle}}
        {{ i.tittleimg}}
        {{ i.content}}
        {{ i.author}}
        {{ i.authorid}}
        {{ i.date}} 
        -->

      </ul>
    </ul>
    
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
    </el-scrollbar>
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      count: 10,
      loading: false,
      posts:[],
      length:0,
      date:''
    };
  },
  computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
  methods: {
    load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 1000)
      },
      newsdetails(id){
        // console.log(data)
        this.$router.push({
          // name:newsdetails,
          path:'/newsdetails',
          query:{
            id
          }
        })
      },
  },
  mounted() {
    axios.post("/forum/posting/getallpost").then(res => {
      this.posts = res.data.data.postings
      this.length = res.data.data.postings.length
      // console.log(res.data.data.postings.date)
      // console.log(this.posts);
    });
  }
};
</script>

<style scoped>
body .el-scrollbar__wrap {
  overflow-x: hidden;
}
ul{
  padding: 0;
  margin: 0;
  padding-inline-start: 0;
}
.item{
  border-bottom: 1px solid grey;
}
.item .tittle{
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  color: rgb(29, 140, 204);
  line-height: 20px;
  margin: 10px 0 5px 0; 
}
.item-bottom{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
}
.item-content{
  width: 100%;
  height: 50px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #888;
  font-size: 14px;
  line-height: 180%;
 
  
}
.item-content img{
  width: 50%;
  height: 50%;
  margin: 0 auto;
  display: flex;
}
</style>