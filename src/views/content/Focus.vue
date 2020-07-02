<template>
  <div class="focus">
      <div v-for="item in focuslist">
        <div class="item" v-for="x in item" @click="tofocus(x[0]._id)">
          <div>{{x[0].tittle}}</div>
          <div>{{x[0].author}}</div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      id:this.$route.query.userid,
      focusnewsid:[],
      focusnewsidlist:[],
      focuslist:[],
    }
  },
  
  methods: {
    tofocus(x){
      this.$router.push({
        path: "/newsdetails",
        query: { id: x }
      }
      )
    }
  },
  mounted(){
    axios.post('/forum/focuslist',
    {
      id: this.id
    }).then( res => {
      this.focusnewsid = res.data.data
      // console.log(res.data.data)
      this.focusnewsid.forEach((value,key,arr) => {
        this.$set(this.focusnewsidlist,key,value.focusnewsid)
         
    });
      this.focusnewsidlist.forEach((val,key,arr) => {
        axios.post('/forum/posting/getpostbyid',{
          id:val
        }).then(res => {
          this.$set(this.focuslist,key,res.data)
 
          console.log(this.focuslist)
        })
      })
    })
  },
//   watch: {
//   $route(to ,from){
//     console.log(to)
//     console.log(from)
//   }
// },
// beforeRouteEnter:(to,from,next)=>{
//         next(vm=>{
//             alert("hello" + vm.id);
//         })
//     }
}
</script>

<style scoped>
.item{
  display: flex;
  justify-content: space-between;
  margin: 5px 0 0 5px;
  user-select: none;
}
</style>