<template>
  <div class="wrapper">
    <i-card :title="userInfo.nickName" extra="额外内容" :thumb="userInfo.avatar">
      <view slot="content">内容不错</view>
      <view slot="footer">尾部内容</view>
    </i-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  components: {

  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo
    }
  },
  created() {
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
