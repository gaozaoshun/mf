<template>
  <div class="wrapper">
    <map id="myMap" :markers="markers" style="width:100%;height:300px;" :longitude="longitude" :latitude="latitude" show-location scale='16'>
    </map>
  </div>
</template>

<script>
// import QQMap from '~/libs/qqmap-wx-jssdk'
export default {
  data() {
    return {
      map: '',
      longitude: '',
      latitude: '',
      address: '',
    }
  },
  created() {
    // 实例化QQMap
    // this.initMap()
    
  },
  mounted(){
    // 移动选点
    this.moveToLocation()
  },
  destoryed(){
  },
  methods: {
    // initMap() {
    //   this.map = new QQMap({
    //     key: 'AHKBZ-SVHHS-WBKOL-6TCQ4-APJCF-3RBKB'
    //   })
    // },
    moveToLocation() {
      var that = this
      wx.chooseLocation({
        success: res => {
          //选择地点之后返回到原来页面
          wx.navigateBack({
            delta: 1,
            success:()=>{
              // 把地址放到vuex
              this.$store.dispatch('setActivityAddress',res.name)
            }
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  }
}
</script>

<style>
.wrapper {
}
.type {
  margin: 20rpx 40rpx;
  border: 2rpx solid #ff9900;
  border-radius: 5rpx;
  font-size: 30rpx;
  text-align: center;
  height: 80rpx;
  line-height: 80rpx;
  color: #ff9900;
}
.type-name {
  vertical-align: middle;
}
.type-icon {
  vertical-align: top;
}
.required {
  background: rgba(0, 0, 0, 0.1);
}
.require-title {
  padding: 10rpx 0;
}
.required-icon {
  vertical-align: top;
  margin-left: 28rpx;
}
.required-name {
  font-size: 23rpx;
  color: red;
  vertical-align: middle;
}
.required-label {
  color: rgba(0, 0, 0, 0.3);
  font-size: 18rpx;
  letter-spacing: 3rpx;
  vertical-align: middle;
}
.cell-input {
  width: 500rpx;
}
.inline-block {
  display: inline-block;
}
</style>
