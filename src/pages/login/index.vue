<template>
  <div class="wrapper">
    <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2792890150,4122794338&fm=27&gp=0.jpg" class="bg" />
    <button class="login-btn" open-type='getUserInfo' @getuserinfo='getUserInfo'>微信登录</button>
  </div>
</template>

<script>
import { login } from "@/api/login"
import { toAbsPath } from '@/utils/route'

export default {
  methods: {
    // 登录获取用户信息、Token
    getUserInfo(e) {
      if (!e.target.rawData) {
        console.log("拒绝授权")
        return;
      }
      console.log("同意授权")
      // 登录操作
      this.login()
    },
    // 登录操作
    login() {
      // 获取code
      wx.login({
        success: res => {
          // 此时微信端已生成session_key
          console.log("获临时凭证code", res.code)
          let code = res.code
          wx.getUserInfo({
            withCredentials: true,
            success: res => {
              // 登录请求参数
              let body = {
                rawData: res.rawData || "",
                signature: res.signature || "",
                encryptedData: res.encryptedData || "",
                iv: res.iv || "",
                code: code || ""
              }
              login(body).then(res => {
                if (res.code === 100) {
                  // 保存userInfo
                  this.$store.dispatch("setUserInfo", res.data)
                  // 保存Token
                  wx.setStorageSync("token", res.data.token || "")
                  // 跳转至首页
                  wx.switchTab({
                    url: toAbsPath('pages/index/main'),
                    success: res => {
                      // 地理位置授权
                      this.$store.dispatch('setIsLogin', true)
                    }
                  })
                } else {
                  wx.showToast({ title: "登录失败", icon: "none" })
                }
              })
            }
          })
        }
      })
    },
  }
}
</script>

<style scoped>
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 100%;
}
.login-btn {
  width: 180rpx;
  height: 55rpx;
  line-height: 55rpx;
  font-size: 25rpx;
  color: #fff;
  background: #ff9900;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
