<template>
  <div class="login-page">
    <div class="login-container">
      <div class="main-container--cont">
        <div class="left-logo-cont">

        </div>
        <div class="right-container">
          <div class="inner-cont">
            <div class="login-header-cont">
              <div class="login-title-cont">
                <p class="title-text">{{ loginTitle[currentType] }}</p>
              </div>
              <div class="extra-meta">
                <span @click="toggleType">{{extraMetaText[currentType]}}</span>
              </div>
            </div>
            <div class="login-form-cont" v-if="currentType==='login'">
              <el-form :model="loginForm" ref="loginForm"  label-position="right"
                :rules="loginFormRules"
              >
                <el-form-item prop="username">
                  <qg-form-item labelText="USER NAME" :isRequired="true" >
                    <qg-input @validate-field="handleBlurQgFormInput('loginForm', 'username')" placeholder="Please input your nickname..." v-model="loginForm.username"></qg-input>
                  </qg-form-item>
                </el-form-item>
                <el-form-item prop="password"
                @keyup.native="handleLogin($event)">
                  <qg-form-item labelText="PASSWORD" :isRequired="true">
                    <qg-input type="password" @validate-field="handleBlurQgFormInput('loginForm', 'password')" placeholder="Please input your password..." v-model="loginForm.password"></qg-input>
                  </qg-form-item>
                  
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleSubmit" style="width:100%">LOGIN IN</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="register-form-cont" v-show="currentType==='register'">
              <el-form :model="registerForm" ref="registerForm" :rules="registerFormRules">
                <el-form-item prop="username">
                  <qg-form-item labelText="NICK NAME" :isRequired="true">
                    <qg-input
                    @validate-field="handleBlurQgFormInput('registerForm', 'username')"
                    placeholder="Please input your nick name"
                    v-model="registerForm.username"
                    ></qg-input>
                  </qg-form-item>
                </el-form-item>
                <el-form-item prop="email">
                  <qg-form-item labelText="EMAIL"
                    :isRequired="true"
                  >
                    <qg-input
                      @validate-field="handleBlurQgFormInput('registerForm', 'email')"
                      placeholder="Please input your email"
                      v-model="registerForm.email"
                    ></qg-input>
                  </qg-form-item>
                </el-form-item>
                <el-form-item prop="password">
                  <qg-form-item
                    labelText="PASSWORD"
                    :isRequired="true"
                  >
                    <qg-input
                      @validate-field="handleBlurQgFormInput('registerForm', 'password')"
                      placeholder="Please input your password"
                      v-model="registerForm.password"
                      type="password"
                    ></qg-input>
                  </qg-form-item>
                </el-form-item>
                <el-form-item prop="re_password">
                  <qg-form-item
                    labelText="CONFIRM PASSWORD"
                    :isRequired="true"
                  >
                    <qg-input
                      @validate-field="handleBlurQgFormInput('registerForm', 're_password')"
                      placeholder="Please confirm your password"
                      v-model="registerForm.re_password"
                      type="password"
                    ></qg-input>
                  </qg-form-item>
                </el-form-item>
                <!-- <el-form-item prop="gender">
                  <qg-form-item
                    labelText="GENDER"
                    :isRequired="true"
                  >
                    <el-radio-group v-model="registerForm.gender">
                    <el-radio label=1>MAN</el-radio>
                    <el-radio label=0>FEMALE</el-radio>
                  </el-radio-group>
                  </qg-form-item>
                </el-form-item> -->
                <el-form-item>
                  <el-button type="primary" @click="handleRegisterSubmit" style="width:100%">Sign Up</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const checkUsername = (rule, value, callback) => {
        if (!value) {
          callback(new Error('Nickname can not be empty'))
        } 
        var regCh = /^[\u4e00-\u9fa50-9a-zA-Z_]{1,}$/
        if(!regCh.test(value)) {
          callback(new Error('Nickname just includes chinese、English、Number and Underline'))
        } else if (value.length > 10) {
          callback(new Error('Length cannot be greater than 10'))
        } else {
          callback()
        }
      }
      const checkPassword = (rule, value, callback) => {
        if(!value) {
          callback(new Error('PassWord can not be empty'))
        }
        if (value.length < 6) {
          callback(new Error('The password can not less than 6'))
        }
        let reg = /^[0-9a-zA-Z_]{1,}$/
        if(!reg.test(value)){
          callback(new Error('Passwords can only consist of numbers, letters and underscores'))
        } else {
          callback()
        }
      }
      const checkRePassword = (rule, value, callback) => {
        if(!value) {
          callback(new Error('Please input password again'))
        } else if (value !== this.registerForm.password) {
          callback(new Error('The two password inputs are inconsistent'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginFormRules: {
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          password: [
            { validator: checkPassword, trigger: 'blur' }
          ]
        },
        loginTitle: {
          login: 'WELCOME',
          register: 'CREATE AN ACCOUNT'
        },
        extraMetaText: {
          login: 'Sign Up',
          register: 'Sign In'
        },
        currentType: 'login',
        registerForm: {
          username: '',
          password: '',
          re_password: '',
          email: ''
        },
        registerFormRules: {
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          password: [
            { validator: checkPassword, trigger: 'blur' }
          ],
          re_password: [
            { validator: checkRePassword, trigger: 'blur' }
          ],
          email: [
            { required: true, message: 'Please input your email', trigger: 'blur' },
            { type: 'email', message: 'Please enter the correct email address', trigger: ['blur'] }
          ]
        }
      }
    },
    mounted () {
      document.getElementsByTagName('body')[0].style.backgroundColor = '#697699';
      this.$once('hook:beforeDestroy', () => {
        document.getElementsByTagName('body')[0].style.backgroundColor = '#ffffff';
      })
    },
    methods: {
      toggleType() {
        if(this.currentType === 'login') {
          this.$refs.loginForm.clearValidate()
          this.currentType = 'register'
        }else {
          this.$refs.registerForm.clearValidate()
          this.currentType = 'login'
        }
      },
      handleBlurQgFormInput (formname, name) {
        if (formname) {
          this.$refs[formname].validateField(name)
        }
      },
      handleLogin (e) {
        if (e.keyCode == 13) {
          this.handleSubmit();
        }
      },
      handleSubmit() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$axios.post('/signin', {
              name: this.loginForm.username,
              password: this.loginForm.password
            }).then(res=> {
              if (res.code == 0) {
                localStorage.setItem('token', res.data.token)
                this.$router.push('/')
              } else {
                this.$message.closeAll()
                this.$message.success(res.msg)
              }
            })
          }
        })
      },
      handleRegisterSubmit () {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.$axios.post('/signup',this.registerForm).then(res=>{
              if (res.code == 0) {
                this.$message.closeAll()
                this.$message.success('注册成功')
              } else {
                this.$message.closeAll()
                this.$message.error(res.message)
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
.login-page {
  .el-form-item {
    margin-bottom: 32px
  }
  .register-form-cont {
    .el-form-item {
    margin-bottom: 24px
    }
  }
}
</style>
<style lang="scss" scoped>
.login-page {
  height: 100vh;
}
.login-container {
  max-width: 1100px;
  min-width: 310px;
  width: 80%;
  height: 660px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  .main-container--cont {
    display: flex;
    $leftLogoContWidth: 500px;
    height: 100%;
    .left-logo-cont {
      max-width: $leftLogoContWidth;
      width: 40%;
      height: 100%;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: -25%;
        left:-15%;
        width: 130%;
        height: 150%;
        background: #4d4577;
        display: block;
        transform: rotate(8deg);
      }
    }
    .right-container {
      width: calc(100% - 40%);
      height: 100%;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: -25%;
        left:0;
        width: 150%;
        height: 150%;
        background: #ffba33;
        display: block;
        transform: rotate(3deg);
      }
      .inner-cont {
        position: absolute;
        top: 50%;
        width: 300px;
        background: #fff;
        border-radius: 5px;
        overflow: hidden;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 2px 15px 45px -15px #303133;
        transition: all 1s ease;
        &:hover {
        }
        .login-header-cont {
          line-height: 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 0 15px -3px #ccc;
          padding-left: 15px;
          padding-right: 15px;
            user-select: none;
          .login-title-cont {
            .title-text {
              color: #ffba33;
              font-weight: 600;
              font-family: -webkit-pictograph;
            }
          }
          .extra-meta {
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
          }
        }
        .login-form-cont {
          padding: 25px 25px;
        }
        .register-form-cont {
              padding: 25px 25px;
        }
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .login-container {
    .left-logo-cont {
      display: none;
    }
    .right-container {
      flex-grow: 1;
      &::before {
        transform: rotate(0) !important;
      }
    }
  }
}
@media screen and (max-width: 320px) {
  .login-container {
    margin: 0;
  }
}
@media screen and (max-width: 450px) {
  .login-container {
    width: 90%
  }
}
</style>