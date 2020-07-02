<template>
  <div class="usercenter">
    <Nav @getdata="getdata"></Nav>
    <div class="usermsg">
      <div class="firstname">
        <p>名：</p>
        <el-input placeholder="请输入内容" v-model="userdata.first_name"></el-input>
      </div>
      <div class="familyname">
        <p>姓：</p>
        <el-input placeholder="请输入内容" v-model="userdata.family_name"></el-input>
      </div>
      <div class="age">
        <p>年龄：</p>
        <el-input placeholder="请输入内容" v-model="userdata.age"></el-input>
      </div>
      <div class="account">
        <p>账号：</p>
        <el-input placeholder="请输入内容" :disabled="true" v-model="userdata.account"></el-input>
      </div>
      <div class="pwd">
        <p>密码：</p>
        <el-input placeholder="请输入内容" :disabled="true" type="password" v-model="userdata.password"></el-input>
      </div>
      <div class="email">
        <p>邮箱：</p>
        <el-input placeholder="请输入内容" :disabled="true" v-model="userdata.email"></el-input>
      </div>
      <div class="code">
        <p>邀请码：</p>
        <el-input placeholder="" :disabled="true" v-model="userdata.invitecode"></el-input>
        <el-button @click="getinvitecode" size="mini">获取</el-button>
      </div>
      <div class="subbtn">
      <el-button type="primary" @click="update">修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "components/nav/nav.vue";
import axios from "axios";
export default {
  data() {
    return {
      userdata:''
    };
  },
  components: {
    Nav
  },
  methods: {
    getdata(val){
      this.userdata = val
      console.log(this.userdata)
    },
    update() {
      axios.post('/forum/users/updatebyid',{
        firstname:this.userdata.first_name,
        familyname:this.userdata.family_name,
        age:this.userdata.age,
        id:this.userdata._id
      }).then(res => {
        if(res.data.msg == 200){
          this.$message('修改成功')
        }
      })
    },
    getinvitecode(){
      axios.post('/forum/users/getinvitecode',{
        firstname:this.userdata.first_name,
        familyname:this.userdata.family_name,
        age:this.userdata.age,
        id:this.userdata._id
      }).then(res => {
        console.log('suc')
        this.$router.go(0)
      })
    }
  },
  mounted(){
    
  }
};
</script>

<style scoped>
.usermsg {
  margin-top: 15px;
  margin-left: 12%;
  width: 80%;
  display: flex;
  flex-direction: column;
  height: 80vh;
  background-color: white;
  align-items: center;
}
.usermsg div{
  display: flex;
  width: 500px;
  /* margin-left: 20px; */
}
.usermsg p{
  width: 100px;
}
.usermsg .firstname{
  margin-top: 20px;
  margin-left: 20px;
}
.usermsg .familyname{
  margin-top: 20px;
  margin-left: 20px;
}
.usermsg .age{
  margin-top: 20px;
  margin-left: 20px;
}
.usermsg .email{
  margin-top: 20px;
  margin-left: 20px;
}
.usermsg .code{
  margin-top: 20px;
  margin-left: 40px;
}
.usermsg .pwd{
  margin-top: 20px;
  margin-left: 20px;
}
.usermsg .account{
  margin-top: 20px;
  margin-left: 20px;
}
.usermsg div p{
  text-align: center;
}
.subbtn{
   display: flex;
   justify-content: center;
   margin-top: 20px;
}
</style>