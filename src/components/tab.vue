<template>
    <div class="wrapper">
        <div class="item bg" @click='chooseCity'><i class="iconfont mf-zuobiao"></i><span class="vertial zb">{{city}}</span><i class="iconfont mf-down"></i></div>
        <div class="item"><span class="vertial">最快开启</span></div>
        <div class="item"><span class="vertial">离我最近</span></div>
        <div class="item"><span class="vertial">参与人数</span></div>
    </div>
</template>
<script>
export default {
    props: {

    },
    computed: {
        city() {
            return this.$store.state.address.addStr ? this.$store.state.address.addStr : '全国'
        }
    },
    data() {
        return {
        }
    },
    created() {

    },
    methods: {
        chooseCity() {

        }
    }
}
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 710rpx;
  height: 50rpx;
  padding: 10rpx 40rpx 10rpx 20rpx;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
  line-height: 50rpx;
  font-size: 25rpx;
}
.item {
}
.vertial {
  vertical-align: top;
  padding-left: 5rpx;
}
.bg {
  width: 120rpx;
  background: #ff9900;
  border-radius: 15rpx;
  padding: 0 10rpx;
  color: #fff;
}
.zb {
  display: inline-block;
  width: 48rpx;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
}
</style>

