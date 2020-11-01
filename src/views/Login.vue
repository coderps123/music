<template>
  <div class="login-wrap">
    <div class="login-box">
      <div class="logo">
        <img src="../assets/images/logo-a.png" alt="">
      </div>
      <h2>NICE MUSIC</h2>
      <el-form ref="form" :model="formData" label-width="0" :rules="formRules">
        <el-form-item prop="phone">
          <div class="item">
            <i class="iconfont iconshouji"></i>
            <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <div class="item">
            <i class="iconfont iconmima"></i>
            <el-input v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="login-botton">
          <el-button @click="_submit">登录</el-button>
        </el-form-item>
        <div class="register">
          <router-link to="/register" tag="a">注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from "vuex"
  export default {
    name: "Login",
    components: {
    },
    data() {
      return {
        formData: {
          phone: "",
          password: ""
        },
        formRules: {
          phone: [
            {required: true, message: '手机号都没有吗?', trigger: 'blur'},
            {min: 11, max: 11, message: '格式不对', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码没有吗?', trigger: 'blur'},
            {min: 6, max: 16, message: '格式不对', trigger: 'blur'}
          ]
        },
        parallax: 'depth'
      }
    },
    methods: {
      // 表单提交
      _submit() {
        this.$refs.form.validate(valid => {
          if (!valid) {
            return this.$message.error("表单验证错误")
          }
          try {
            let params = {
              ...this.formData,
              timeStamp: new Date().valueOf()
            }
            this.$api.login(params).then(res => {
              if (res.status === 200 && res.statusText === "OK") {
                if (res && res.data.code === 200) {
                  window.localStorage.setItem('cookie', res.data.cookie)
                  window.localStorage.setItem("token", res.data.token)
                  window.localStorage.setItem("profile", JSON.stringify(res.data.profile))
                  this.setProfile(window.localStorage.getItem("profile"))
                  this.$message.success("登陆成功")
                  this.$router.replace("/")
                }
              }
            }).catch(err => {
              this.$message.info("服务器似乎出现了问题")
            })
          } catch (err) {
            this.$message.info("服务器似乎出现了问题")
          }
        })
      },
      // 获取用户信息
      async _getUserDetail(uid) {
        let res = this.$api.getUserDetail(uid)
        console.log(res)
      },
      ...mapMutations([
        "setProfile",
      ])
    }
  }
</script>

<style lang="less">
  .login-wrap {
    width: 100%;
    height: 100vh;
    background: #5dd5c8 url("../assets/images/newbg1.png") center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1001;
    overflow: hidden; // 解决高度塌陷问题
    .login-box {
      width: 350px;
      height: 486px;
      margin: 100px auto;
      border-radius: 10px;
      box-shadow: 1px 2px 15px rgba(0, 0, 0, .3);
      background: url("../assets/images/logbg.jpg") bottom center no-repeat #fff;

      .logo {
        display: flex;
        justify-content: center;
        padding: 50px 0 0;

        img {
          width: 55px;
        }
      }

      h2 {
        text-align: center;
        font-weight: 400;
        padding-bottom: 50px;
      }

      .item {
        border: 1px solid #DCDFE6;
        border-radius: 5px;
        margin: 0 25px;

        i {
          position: absolute;
          left: 25px;
          width: 40px;
          text-align: center;
          z-index: 10;
        }

        .el-input {
          display: block;
          padding: 0 25px;

          .el-input__inner {
            display: block;
            border: 0;
            padding: 0 10px;
          }
        }

      }
      .el-form-item__error{
         margin-left: 40px;
       }
      .login-botton{
        margin: 30px 25px 0;
        .el-button{
          display: block;
          width: 100%;
          font-size: 15px;
          background-color: #5dd5c8;
          color: #fff;
        }
      }
      .register{
        padding-right: 24px;
        margin-top: 10px;
        a{
          float: right;
        }
      }
    }
  }
</style>
