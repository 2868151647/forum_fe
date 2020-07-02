<template>
  <div class="login_page">
    <div class="login_box">
      <div class="login_left">
        <p class="exit1">×</p>
        <div class="login_left_info">
          <h1>LOGIN</h1>
          <input type="text" placeholder="请输入账号" id="username" v-model="account" />
          <input type="password" placeholder="请输入密码" class="pwd" v-model="password" />
          <button class="button_left_next">进入</button>
          <button class="button_left" @click="login()">登录</button>
          <!-- <button class="button_left_show" hidden>确认</button> -->
        </div>
      </div>
      <div class="login_right">
        <p class="exit2">×</p>
        <div class="login_right_info">
          <h1 class="sign_up">SIGN UP</h1>
          <input type="text" placeholder="请输入6-15位纯数字作为账号" v-model="registeraccount" />
          <input type="email" placeholder="请输入邮箱" v-model="registeremail"  />
          <div class="yanzhengma">
            <input type="text" class="inpyzm" placeholder="输入验证码" v-model="inputyanzhengma" />
            <button class="getcode" @click="email">点击获取</button>
          </div>
          <input type="password" placeholder="请输入8-16位数字和字母混合组合作为密码" v-model="registerpassword" />
          <input type="password" placeholder="请确认密码" v-model="registerpassword1" />
          <input type="text" placeholder="请输入验证码">
          <button class="button_right_next">进入</button>
          <button class="button_right" @click="registervalidation">注册</button>
          <!-- <button class="button_right_show">确认</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Decrypt, Encrypt } from "../utils/encryption";
import $ from 'jquery'
import "common/login";
import axios from "axios";
// import serves from '../network/interceptor.js'
export default {
  data() {
    return {
      account: "",
      password: "",
      enacc: "",
      enpwd: "",
      registeraccount: "",
      registerpassword: "",
      registeremail: "",
      registerpassword1: "",
      yanzhengma:'',
      inputyanzhengma:''
    };
  },
  methods: {
    login() {
      // console.log('xxx')
      // console.log(Encrypt(this.password))
      // console.log(Decrypt(Encrypt(this.password)))
      axios
        .post("http://localhost:3000/forum/login", {
          account: this.account,
          password: Encrypt(this.password)
        })
        .then(res => {
          console.log(res);
          if (res.data.status === 200 && res.status === 200) {
            console.log("登录成功");
            this.$store.commit("setToken", res.data.token);
            this.$store.commit("setUserId", res.data.u_id);
            // console.log(this.$store.state.token)
            // console.log(this.$store.state.u_id)
            this.$router.push("/home");
          } else {
            console.log("用户名或密码错误");
          }
        });
    },
    clearAll() {
      this.$store.getters.clearAll;
    },
    email() {
      var regemail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (regemail.test(this.registeremail) == false) {
        this.$message("邮箱格式错误");
      } else {
        axios
          .post("/forum/email", {
            email: this.registeremail
          })
          .then(res => {
            console.log(res.data.code);
            this.yanzhengma = res.data.code
            this.$message("请前往邮箱确认");
          });
      }
    },
    registervalidation() {
      var regacc = /^\d{6,15}$/;
      //6-15位数字
      console.log("注册数字：", regacc.test(this.registeraccount));
      var regpwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      //数字夹杂字母8-16位
      console.log("注册数字：", regpwd.test(this.registerpassword));
      var regemail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      //邮箱验证
      console.log("注册邮箱：", regemail.test(this.registeremail));
      if (regacc.test(this.registeraccount) == false) {
        this.$message("账号格式错误");
      } else if (regpwd.test(this.registerpassword) == false) {
        this.$message("密码格式错误");
      } else if (this.registerpassword1 !== this.registerpassword) {
        this.$message("两次密码请确认一致");
      } else if (this.inputyanzhengma != this.yanzhengma) {
        this.$message("验证码错误");
        //邮箱不唯一
      } else {
        //验证账号 邮箱验证
        var registeraccount = this.registeraccount
        var registerpassword = this.registerpassword
        var registeremail = this.registeremail
        axios
          .post("/forum/register", {
            account: registeraccount
          })
          .then(res => {
            console.log(res.data.data);
            if (res.data.data == "fail") {
                //进行注册
                axios.post('/forum/regisyercreate',{
                    account:registeraccount,
                    password:registerpassword,
                    email:registeremail
                }).then(res => {
                    console.log(res.data)
                    if(res.data.msg === 200){
                        this.$message('注册成功')
                        this.$router.go(0)
                    }
                })
            } else {
              this.$message("账号存在");
            }
          });
      }
    }
  },
  mounted() {
    // this.$router.go(0)
    // const oscript = document.createElement('script')
    // oscript.type = 'text/javascript'
    // oscript.src = 'common/login.js'
    // document.body.appendChild(oscript)
  },
};
</script>

<style scoped>
@import "../assets/css/login.css";
</style>