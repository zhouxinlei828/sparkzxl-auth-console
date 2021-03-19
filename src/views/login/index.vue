<template>
  <div
    id="dowebok"
    :class="activeLogin !== true ? 'dowebok' : 'dowebok right-panel-active'"
  >
    <div class="form-container sign-up-container">
      <form action="#">
        <div>
          <img style="width: 40px; height: 40px" src="@/assets/logo.png" />
          <span style="font-size: 20px; font-weight: bold">
            欢迎加入Spark Auth
          </span>
        </div>
        <span>填写个人信息</span>
        <input id="tenant" type="text" name="tenant" placeholder="领域池编码" />
        <input id="account" type="text" name="account" placeholder="账号" />
        <input type="email" placeholder="电子邮箱" />
        <input type="password" placeholder="密码" />
        <button>注册</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form action="/authentication/form" method="post">
        <div>
          <img style="width: 40px; height: 40px" src="@/assets/logo.png" />
          <span style="font-size: 20px; font-weight: bold">Spark Auth</span>
        </div>
        <span>使用帐号登录</span>
        <input
          id="tenantCode"
          type="text"
          name="tenantCode"
          placeholder="领域池编码"
        />
        <input id="username" type="text" name="username" placeholder="账户" />
        <input
          id="password"
          type="password"
          name="password"
          placeholder="密码"
        />
        <a href="#">忘记密码？</a>
        <button id="login" type="submit">登录</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>已有帐号？</h1>
          <p>请使用您的帐号进行登录</p>
          <button id="signIn" class="ghost">登录</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>没有帐号？</h1>
          <p>立即注册加入我们，和我们一起开始旅程吧</p>
          <el-button @click="changeRegister">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeLogin: true,
      }
    },
    methods: {
      changeRegister() {
        this.activeLogin = true
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
    border: 1px solid $base-color-default;
    background: $base-color-default;
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
<script></script>
<style lang="scss" scoped>
  .login-container {
    height: 100vh;
    background: url('~@/assets/login_images/background.jpg') center center fixed
      no-repeat;
    background-size: cover;

    .title {
      font-size: 54px;
      font-weight: 500;
      color: rgba(14, 18, 26, 1);
    }

    .title-tips {
      margin-top: 29px;
      font-size: 26px;
      font-weight: 400;
      color: rgba(14, 18, 26, 1);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .login-btn {
      display: inherit;
      width: 220px;
      height: 60px;
      margin-top: 5px;
      border: 0;

      &:hover {
        opacity: 0.9;
      }
    }

    .login-form {
      position: relative;
      max-width: 100%;
      margin: calc((100vh - 425px) / 3) 10% 10%;
      overflow: hidden;

      .forget-password {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-pass {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }
    }

    .tips {
      margin-bottom: 10px;
      font-size: $base-font-size-default;
      color: $base-color-white;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 34px;
        font-weight: bold;
        color: $base-color-blue;
        text-align: center;
      }
    }

    .svg-container {
      position: absolute;
      top: 14px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-password {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        margin: 20px 0;
        color: #454545;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 2px;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          left: 18px;
          font-size: $base-font-size-small;
          line-height: 18px;
          color: $base-color-red;
        }
      }

      .el-input {
        box-sizing: border-box;

        input {
          height: 58px;
          padding-left: 45px;
          font-size: $base-font-size-default;
          line-height: 58px;
          color: $base-font-color;
          background: #f6f4fc;
          border: 0;
          caret-color: $base-font-color;
        }
      }
    }
  }
</style>
