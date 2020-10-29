<template>
  <div class="register-wrapper">
    <div class="register-box">
      <div class="logo">
        <img src="../assets/images/logo-a.png" alt="">
      </div>
      <h2>NICE MUSIC</h2>
      <el-form ref="form" :model="formData" label-width="0" :rules="formRules">
        <el-form-item prop="nickname">
          <div class="item">
            <i class="iconfont iconnicheng"></i>
            <el-input v-model="formData.nickname" placeholder="请输入昵称"></el-input>
          </div>
        </el-form-item><el-form-item prop="phone">
          <div class="item phone">
            <i class="iconfont iconshouji"></i>
            <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
            <span @click="_getCaptcha">发送验证码</span>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <div class="item">
            <i class="iconfont iconmima"></i>
            <el-input v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="captcha">
          <div class="item">
            <i class="iconfont iconyanzhengma"></i>
            <el-input v-model="formData.captcha" placeholder="请输入验证码"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="login-botton">
          <el-button @click="_submit">注册</el-button>
        </el-form-item>
        <div class="register">
          <router-link to="/login" tag="a">登录</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    components: {
    },
    data() {
      return {
        formData: {
          phone: "",
          password: "",
          captcha: "",
          nickname: ""
        },
        formRules: {
          nickname: [
            {required: true, message: '起名都不会吗?', trigger: 'blur'},
            {min: 2, max: 16, message: '长度在2-16为字符之间', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '手机号都没有吗?', trigger: 'blur'},
            {min: 11, max: 11, message: '格式不对', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码也懒得写?', trigger: 'blur'},
            {min: 6, max: 16, message: '格式不对', trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: '验证码收不到?', trigger: 'blur'},
            {min: 4, max: 6, message: '格式不对', trigger: 'blur'}
          ],
        },
        parallax: 'depth',
        verifyData: false,
        captchaData: false
      }
    },
    methods: {
      // 表单提交
      _submit() {
        this.$refs.form.validate(valid => {
          if (!valid) {
            return this.$message.error("表单验证不通过")
          }
          if (!this.captchaData) {
            return this.$message.error("都没有获取验证码, 你搞个锤子哦!")
          }
          // 先验证验证码
          this._verifyCaptcha()
          if (!this.verifyData) {
            return this.$message.error("验证码都不对, 你搞个锤子哦!")
          }
          // 验证验证码成功后
          if (this.verifyData) {
            try {
              this.$api.register(this.formData).then(res => {
                if (res.data.code === 200) {
                  this.$message.success("总算注册成功喽")
                  this.$router.replace("/login")
                }
                return this.$message.error("赶紧起个别人想不到的名字吧!")
              })
            } catch (err) {
              console.log(err)
            }
          }
        })
      },
      // 发送验证码
      async _getCaptcha() {
        let res = await this.$api.getCaptcha(this.formData.phone)
        this.captchaData = res.data.data
      },
      // 验证验证码
      async _verifyCaptcha() {
        let params = {
          phone: this.formData.phone,
          captcha: this.formData.captcha
        }
        let res = await this.$api.verifyCaptcha(params)
        this.verifyData = res.data.data
      }
    }
  }
</script>

<style lang="less">
  .register-wrapper {
    width: 100%;
    height: 100vh;
    background: #5dd5c8 url("../assets/images/newbg1.png") center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    overflow: hidden; // 解决高度塌陷问题
    .register-box {
      width: 350px;
      height: 486px;
      margin: 100px auto;
      border-radius: 10px;
      box-shadow: 1px 2px 15px rgba(0, 0, 0, .3);
      background: url("../assets/images/logbg.jpg") bottom center no-repeat #fff;

      .logo {
        display: flex;
        justify-content: center;
        padding: 10px 0 0;

        img {
          width: 55px;
        }
      }

      h2 {
        text-align: center;
        font-weight: 400;
        padding-bottom: 10px;
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
      .phone{
        position: relative;
        span{
          position:absolute;
          top: 50%;
          right: 8px;
          transform: translate(0, -50%);
          background-color: rgba(229, 221, 217, 0.64);
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          border-radius: 6px;
          padding: 0 8px;
          cursor: pointer;
        }
        i{
          left: 0;
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
