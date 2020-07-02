<template>
  <div>
    <Nav @getfullname='getfullname'></Nav>
    <div class="post_page">
     
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.name" name="names" style="width:360px;"></el-input>
        </el-form-item>
        <E @change="change"></E>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">发布</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      
    </div>
  </div>
</template>

<script>
import E from "components/wangeditor.vue";
import axios from "axios";
import Nav from "components/nav/nav.vue";

export default {
  data() {
    return {
      fileList: [],
      picurl: "",
      tittle: "",
      content: "",
      form: {
        //form里面的参数
        name: ""
      },
      param: "", //表单要提交的参数
      src: "", //展示图片的地址
      fullname:''
    };
  },
  components: {
    E,
    Nav
  },
  methods: {
    getfullname(val){
      this.fullname = val
      // console.log('输出全名',this.fullname)
    },
    scuess() {
      this.$message("发布成功");
    },
    error() {
      this.$message("标题和内容不能为空");
    },
    change(val) {
      this.content = val;
    },
    // onUploadChange(file) {
    //   const isIMAGE =
    //     file.raw.type === "image/jpeg" || file.raw.type === "image/png";
    //   const isLt1M = file.size / 1024 / 1024 < 1;

    //   if (!isIMAGE) {
    //     this.$message.error("只能上传jpg/png图片!");
    //     this.files = [];
    //     return false;
    //   }
    //   if (!isLt1M) {
    //     this.$message.error("上传文件大小不能超过 1MB!");
    //     this.files = [];
    //     return false;
    //   }
    //   var reader = new FileReader();
    //   reader.readAsDataURL(file.raw);
    //   let _this = this;
    //   reader.onload = function(e) {
    //     //图片的base64数据
    //     _this.picurl = this.result;
    //   };
    // },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handleProgress(file, x) {
    //   console.log(file, x);
    // },
    // handleChange(file, fileList) {
    //   this.fileList = fileList.slice(-3);
    // },
    // beforeupload(file) {
    //   console.log(file);
    //   //重新写一个表单上传的方法
    //   this.param = new FormData();
    //   this.param.append("file", file, file.name);
    //   return false;
    // },
    //覆盖默认的上传行为
    httprequest() {},
    onSubmit() {
      this.param = new FormData();
      //表单提交的事件
      var names = this.form.name;
      var content = this.content;
      var author = this.fullname;
      var authorid = this.$store.state.u_id
      console.log("id:",authorid)
      if (names == "" || content == '') {
        console.log('为空哦')
        this.error()
      }else{
      //下面append的东西就会到form表单数据的fields中；
      this.param.append("name", names);
      this.param.append("content", content);
      this.param.append("authorid", authorid);
      this.param.append("author", author);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      console.log("submit");
      const _this = this
      this.$reqs.post("/forum/posting/saveall", this.param, config).then(function(result) {
        if(result.data.msg === 200){
          _this.scuess()
          _this.$router.replace({path:'/home'})
        }
      });
      }
      
    }
  }
  // methods ouside
};
</script>

<style scoped>
@import "~assets/css/posting/posting.css";
</style>