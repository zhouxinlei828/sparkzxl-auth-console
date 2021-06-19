<template>
  <div :class="activeLogin === true ? 'dowebok' : 'dowebok right-panel-active'">
    <div class="form-container sign-up-container">
      <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
        size="medium"
      >
        <div style="line-height: 40px">
          <img style="height: 40px" src="@/assets/logo.png" />
          <span class="title">
            {{ systemName }}
          </span>
          <br />
          <span>填写注册人信息</span>
        </div>
        <el-form-item prop="account" required>
          <el-input
            v-model="registerForm.account"
            placeholder="请输入账户或者手机号"
            class="edit-form-item"
          />
        </el-form-item>
        <el-form-item prop="email" required>
          <el-input
            v-model="registerForm.email"
            placeholder="请输入邮箱"
            class="edit-form-item"
          />
        </el-form-item>
        <el-form-item required>
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            class="edit-form-item"
          />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleRegister">
            注 册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-container sign-in-container">
      <el-form ref="loginForm" :model="form" :rules="rules" size="medium">
        <div style="line-height: 40px">
          <img style="height: 40px" src="@/assets/logo.png" />
          <span class="title">
            {{ systemName }}
          </span>
          <br />
          <span>使用帐号登录</span>
        </div>
        <el-form-item prop="username" required>
          <el-input
            v-model="form.username"
            placeholder="请输入账户或者手机号"
            class="edit-form-item"
          />
        </el-form-item>
        <el-form-item prop="password" required>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            class="edit-form-item"
          />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleLogin">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>已有帐号？</h1>
          <p>请使用您的帐号进行登录</p>
          <button id="signIn" class="ghost" @click="changeLogin">登录</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>没有帐号？</h1>
          <p>立即注册加入我们，和我们一起开始旅程吧</p>
          <button class="ghost" @click="changeRegister">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { userRegister } from '@/api/login'
  import { getParameter } from '@/api/parameter'
  export default {
    data() {
      return {
        form: {
          username: null,
          password: null,
        },
        systemName: null,
        registerForm: {
          username: null,
          email: null,
          password: null,
        },
        activeLogin: true,
        rules: {
          username: [
            { required: true, message: '账户不能为空', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ],
        },
        registerRules: {
          account: [
            { required: true, message: '账户不能为空', trigger: 'blur' },
          ],
          email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
          ],
        },
      }
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || '/'
        },
        immediate: true,
      },
    },
    created() {
      this.getParameter('system_name')
    },
    methods: {
      getParameter(data) {
        getParameter({ code: data }).then((response) => {
          this.systemName = response.data.value
        })
      },
      changeRegister() {
        this.activeLogin = false
      },
      changeLogin() {
        this.activeLogin = true
      },
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$store
              .dispatch('user/login', this.form)
              .then((result) => {
                if (result.loginStatus) {
                  let routerPath
                  if (result.tenantStatus) {
                    routerPath = '/tenant/pool'
                  } else {
                    routerPath =
                      this.redirect === '/404' ||
                      this.redirect === '/401' ||
                      this.redirect === '/tenant/pool'
                        ? '/index'
                        : this.redirect
                  }
                  this.$router.push(routerPath).catch(() => {})
                }
              })
              .catch(() => {})
          } else {
            return false
          }
        })
      },
      handleRegister() {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            this.loading = true
            userRegister(this.registerForm).then((response) => {
              const responseData = response.data
              if (responseData) {
                this.$message.success('注册成功')
              } else {
                this.$message.error('注册失败')
              }
            })
          } else {
            return false
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    background: #f6f5f7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  h1 {
    font-weight: bold;
    margin: 0;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  .title {
    display: inline-block;
    overflow: hidden;
    font-size: 20px;
    line-height: 55px;
    color: $base-title-color;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    font-family: 'Comic Sans MS', serif;
  }
  .dowebok {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: calc(100vh - 50vh);
    top: calc(100vh - 80vh);
    left: calc(100vh - 57vh);
    height: calc(100vh - 40vh);
  }

  .form-container form {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .warning-message {
    text-align: left;
    width: 100%;
    color: red;
  }

  .social-container {
    margin: 20px 0;
  }

  .social-container a {
    border: 1px solid #ddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
  }

  .social-container a:hover {
    background-color: #eee;
  }

  .form-container input {
    background: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    outline: none;
  }

  button {
    border-radius: 20px;
    border: 1px solid $base-login-color;
    background: $base-login-color;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
  }

  button:active {
    transform: scale(0.95);
  }

  button:focus {
    outline: none;
  }

  button.ghost {
    background: transparent;
    border-color: #fff;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    z-index: 1;
    opacity: 0;
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .overlay {
    background: #005bea;
    background: linear-gradient(to right, #005bea, #006bea) no-repeat 0 0 /
      cover;
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateY(0);
    transition: transform 0.6s ease-in-out;
  }

  input:focus {
    border: 1px solid #005bea;
    line-height: 20px;
  }

  .overlay-panel {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
    height: 100%;
    width: 50%;
    text-align: center;
    transform: translateY(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-right {
    right: 0;
    transform: translateY(0);
  }

  .overlay-left {
    transform: translateY(-20%);
  }

  /* Move signin to right */
  .dowebok.right-panel-active .sign-in-container {
    transform: translateY(100%);
  }

  /* Move overlay to left */
  .dowebok.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  /* Bring signup over signin */
  .dowebok.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  }

  /* Move overlay back to right */
  .dowebok.right-panel-active .overlay {
    transform: translateX(50%);
  }

  /* Bring back the text to center */
  .dowebok.right-panel-active .overlay-left {
    transform: translateY(0);
  }

  /* Same effect for right */
  .dowebok.right-panel-active .overlay-right {
    transform: translateY(20%);
  }
</style>
