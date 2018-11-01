<template>
  <div class="container">
    <Button type="primary" open-type='getUserInfo' @getuserinfo="getUserInfo">登录</Button>
    <div v-if="userInfo.nickName">
      <h5>{{userInfo.nickName}}</h5>
      <img :src="userInfo.avatarUrl" style="width:50px;height:50px"/>
    </div>
  </div>
</template>

<script>
import card from "@/components/card"
import { login } from '@/api/login'

export default {
  data() {
    return {
    }
  },
  components: {
    card
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    getUserInfo(e) {
      if (!e.target.rawData) {
        console.log("拒绝授权")
        return
      }
      console.log("同意授权")
      // 获取code
      wx.login({
        success: res => {
          // 此时微信端已生成session_key
          console.log('获临时凭证code', res.code)
          let code = res.code
          wx.getUserInfo({
            withCredentials: true,
            success: res => {
              // 登录请求参数
              let body = {
                rawData: res.rawData || '',
                signature: res.signature || '',
                encryptedData: res.encryptedData || '',
                iv: res.iv || '',
                code: code || ''
              }
              login(body).then(res => {
                if (res.code === 100) {
                  // 保存userInfo
                  this.$store.dispatch('setUserInfo', res.data)
                  // 保存Token
                  wx.setStorageSync('token', res.data.token || '')
                } else {
                  wx.showToast({ title: '登录失败', icon: 'none' })
                }
              })
            }
          })
        }
      })

    }
  },

  created() { }
};
</script>

<style scoped>
</style>
