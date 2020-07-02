<template>
  <div class="home">
    <Nav @getdata="getdata">
      <template v-slot:nav_left>
        
      </template>
      <template v-slot:nav_center>
        <div class="search">
        <el-row class="demo-autocomplete">
          <el-col :span="12">
            <el-autocomplete size='small' style="width:250px"
              class="inline-input"
              v-model="state2"
              :fetch-suggestions="querySearch"
              placeholder=""
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
        <button class="search_btn" type="submit" @click="newsdetails(newsid)">搜索</button>
        </div>
      </template>
    </Nav>
    <div class="frame">
      <div class="main_left">
        <Content :userid="userid"></Content>
      </div>
      <div class="main_right">
        <Side></Side>
        <UserSelect></UserSelect>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "components/nav/nav.vue";
import Content from "components/home/content.vue";
import Side from "components/home/side.vue";
import UserSelect from "components/home/userselect.vue";
import serves from "../network/interceptor.js";
import store from "../store/index";
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      username: "测试",
      userid: "",
      restaurants: [],
      state2: "",
      gettittle1:[],
      gettittle2:[],
      newsid:''
    };
  },
  components: {
    Nav,
    Content,
    Side,
    UserSelect
  },
  methods: {
   
    getdata(val) {
      this.userid = val._id;
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      axios.post("/forum/posting/getallpost").then(res => {
       this.gettittle1 = res.data.data.postings
       this.gettittle1.forEach((value,key,arr) => {
         this.$set(this.gettittle2,key,{value:value.tittle,id:value._id})
       })
    //   this.focusnewsid.forEach((value,key,arr) => {
    //     this.$set(this.focusnewsidlist,key,value.focusnewsid)
         
    // });
      // console.log(res.data.data.postings.date)
      console.log(this.gettittle2);
    });
    return this.gettittle2
    
    },
    handleSelect(item) {
      console.log(item);
      this.newsid = item.id
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
    this.restaurants = this.loadAll();
  }
};
</script>

<style scoped>
@import "~assets/css/home/home.css";
</style>