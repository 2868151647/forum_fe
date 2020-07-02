<template>
  <div>
    <!-- a -->
    <el-button class="talk" type="primary" @click="dialogVisible = true;handleuserchatroom()" >进入聊天室</el-button>
    <el-dialog
      title="聊天室"
      :visible.sync="dialogVisible"
      width="70%"
      @close='rehandleuserchatroom'
      >
      <el-button>在线人数：1</el-button>
      <div class="chattable">    
          <el-table :data="talkmsg" style="width:100%" height="300">
            <el-table-column property='content' width="700"></el-table-column>
            <el-table-column property='name'    width="100"></el-table-column>
            <!-- <el-table-column property= 'date' label="日期" width="100"></el-table-column> -->
          </el-table>
        <el-input :rows="2" placeholder="请输入内容" v-model="talkinput"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendtalkmessage">发送</el-button>
      </span>
    </el-dialog>
    <!-- a -->
    <Nav @getfullname="getfullname" @getdata='getdata'></Nav>
    <div class="newsdetails">
      <div class="tit_box">
      <div class="tittle">{{ newsdata.tittle }}</div>
      </div>
      <div class="msg">
        {{ newsdata.author }}
        {{ new Date(newsdata.date).getFullYear() }}/{{ new Date(newsdata.date).getMonth()+1 }}/{{ new Date(newsdata.date).getDate() }}/{{ new Date(newsdata.date).getHours() }}:{{ new Date(newsdata.date).getMinutes() }}

      </div>
      <div v-html="newsdata.content"></div>
      <el-button size="mini" class="good">点赞</el-button>
      <el-button size="mini" @click="focus">关注该贴</el-button>
      <div class="comment">
        <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea"></el-input>
        <el-button type="primary" size="mini" @click="commentclick">评论</el-button>
      </div>
      <p>评论</p>
      <ul v-for="(i,index) in commentsmsg">
        <div class="commentdt">
          {{ i.content }} 
          </hr>
          <br>
          <p>{{ i.name }} / {{ new Date(newsdata.date).getFullYear() }}/{{ new Date(newsdata.date).getMonth()+1 }}/{{ new Date(newsdata.date).getDate() }}/{{ new Date(newsdata.date).getHours() }}:{{ new Date(newsdata.date).getMinutes() }}</p>
          <i class="el-icon-caret-top">赞</i>
          <i class="el-icon-caret-bottom">踩</i>
          <i class="el-icon-chat-line-round" @click="showAndHide(index)">回复</i>
          <i class="el-icon-chat-round" @click="showreply(i._id),showAndHidereply(index)">查看回复</i>
          <div v-for="reply in showreplymsg" v-bind:class="{ active:index !== current1}" class="reply">
            <div>{{reply.content}}</div>
            <div>{{reply.authorname}}</div>
          </div>
          <div v-bind:class="{ active:index !== current}" class="reply" >
            <el-input placeholder="请输入内容" size="small" v-model="replycontent"></el-input>
            <el-button size="small" @click="uploadreply(i._id)">发布</el-button>
          </div>
        </div>
        <hr>
      </ul>
      
    </div>
    
  </div>
</template>

<script>
import Nav from "components/nav/nav.vue";
import axios from "axios";
export default {
  data() {
    return {
      dialogVisible: false,
      comid: "",
      textarea: "231",
      fullname: "",
      commentsmsg: "",
      newsdata: "",
      replydata:false,
      current:-1,
      current1:-1,
      replycontent:"",
      showreplymsg:[],
      navdata:'',
      talkmsg:[],
      talkinput:'msg',
      timer:''
    };
  },
  components: {
    Nav
  },
  methods: {
    closeDialog(){
      this.dialogVisible = false
    },
    handleuserchatroom(){
      //更新id
      axios.post('/forum/users/chatroomactive',{
        userid:this.navdata._id,
        newsid:this.newsdata._id
      }).then(res =>{
        console.log('更新id',res.data)
      })
      // 查询在线人数
      // axios.post('/forum/users/selectchat',{
      //   newsid:this.newsdata._id
      // }).then(res => {
      //   console.log('在线人数：',res.data);
      // })
      this.timer = setInterval(() => {
        //获取数据列表
        axios.post('/forum/chatroom/select',{
          newsid:this.newsdata._id
        }).then(res =>{
          console.log(res.data)
          this.talkmsg = res.data.data
        })
      }, 1000);
    },
    rehandleuserchatroom(){
      //清除id
      // axios.post('/forum/users/rechatroomactive',{
      //   userid:this.navdata._id,
      // }).then(res =>{
      // })
      clearInterval(this.timer);
    },
    sendtalkmessage(){
      //发送数据信息到后端
      // console.log(this.newsdata._id)
      // console.log(this.talkinput)
      axios.post('/forum/chatroom',{
        name:this.fullname,
        content:this.talkinput,
        newsid:this.newsdata._id
      }).then(res => {
        console.log(res.data)
      })
    },
    getdata(val){
      this.navdata = val
    },
    focus(){
      axios.post('/forum/focuscreate',{
        focusnewsid:this.newsdata._id,
        userid:this.navdata._id
      }).then( res => {
        console.log(res.data)
      })
    },
    commentclick() {
      // console.log(this.textarea)
      axios
        .post("/forum/comment/create", {
          name: this.fullname,
          content: this.textarea,
          replyid: this.newsdata._id
        })
        .then(res => {
          // console.log(res.data.msg);
          if (res.data.msg == 200) {
            // 刷新
          }
        });
    },
    getfullname(val) {
      this.fullname = val;
      // console.log('输出全名',this.fullname)
    },
    showAndHide (index) {
      this.current = index
    },
    showAndHidereply(index){
      this.current1 = index
    },
    uploadreply(id){
      axios
      .post('/forum/reply/create',{
        content:this.replycontent,
        name:this.fullname,
        replyto:id,
      }).then(res =>{
        console.log(res.data)
        //刷新
      })
    },
    showreply(id){
      console.log(id)
      axios
      .post('/forum/reply/selectbyid',{
        id:id
      })
      .then(res => {
        // console.log(res.data.data)
        this.showreplymsg = res.data.data
        // console.log(this.showreplymsg)
      })
    }
  },
  mounted: function() {
    this.comid = this.$route.query.id;
    // 根据id查询帖子内容并进行展示
    axios
      .post("/forum/posting/getpostbyid", {
        id: this.$route.query.id
      })
      .then(res => {
        this.newsdata = res.data.data[0];
        // console.log(res.data.data);
        // console.log(res.data.data[0].tittle);
      });
    //根据id查询回复内容展示
    axios
      .post("/forum/comment/all", {
        id: this.$route.query.id
      })
      .then(res => {
        // console.log("返回值：", res.data);
        this.commentsmsg = res.data.comments;
        // console.log("趣味无穷：", this.commentsmsg);
      });
  }
    
};
</script>

<style scoped>
.dialogbox{
  width: 100%;
  height: 280px;
  border: 1px solid rgb(77, 75, 75);
  margin-top: 5px;
  overflow: auto;
 
}
.comment {
  display: flex;
}
.newsdetails {
  height: auto;
  width: 80%;
  margin-left: 12%;
  /* text-align: center; */
}
.reply{
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgb(182, 179, 179);
}
.reply div{
  margin-top: 15px;
  
}
.active{
  display: none;
}
.talk{
  position: fixed;
  margin-left: 10px;
  margin-top: 600px;
 
}
.tittle{
  width: 100%;
  margin:13px auto;
  font-size: 20px;
}
.tit_box{
  width: 100%;
  text-align: center;
}
.chattable{
  position: relative; 
  overflow: auto;
}
</style>