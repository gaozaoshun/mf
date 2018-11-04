<template>
  <div class="wrapper">
    <div class="type">
      <i class="iconfont mf-file type-icon"></i>
      <span class="type-name">{{activity.typeName}}</span>
    </div>
    <div class="msg">
      <div class="cover">
        <img :src="activity.cover" class="cover-img">
        <div class="cover-tag">{{activity.totalNum}}人聚</div>
      </div>
      <div class="info">
        <div class="info-title">{{activity.activityName}}</div>
        <div class="info-second">
          <div class="distance-time">
            <i-icon type="time_fill" size="15" color="#80848f" /><span class='verital'> {{distanceTime}}</span></div>
          <div class="distance-len">
            <i-icon type="coordinates_fill" size="15" color="#80848f" /><span class='verital'> {{activity.distance}}</span></div>
          <div class="ratio">
            <i-icon type="group_fill" size="15" color="#80848f" /><span class='verital'> {{ratio}}</span></div>
        </div>
        <div class="address">
          <i-icon type="coordinates" size="15" color="#2b85e4" /><span class='verital'> {{activity.address}}</span></div>
      </div>
    </div>
    <div class="initiator">
      <div class='initiator-imgdiv'>
        <img :src="activity.initiator.avatar" class='initiator-img' />
      </div>
      <div class="initiator-scorediv">
        <i class="iconfont mf-score iinitiator-icon"></i>
        <span class="initiator-score"> {{activity.initiator.score}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { parseToNow } from '@/utils/date'
export default {
  props: {
    activity: {
      type: Object,
      default: {}
    }
  },
  computed: {
    distanceTime() {
      return parseToNow(this.activity.startTime)
    },
    ratio() {
      let curNum = this.activity.curNum
      let totalNum = this.activity.totalNum
      if (curNum === totalNum) {
        return '满员'
      } else {
        return `${curNum} / ${totalNum}`
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 700rpx;
  height: 220rpx;
  border: 1rpx solid rgba(0, 0, 0, 0.1);
  border-radius: 0rpx 15rpx 15rpx 15rpx;
}
.type {
  position: relative;
}
.type-icon {
  position: absolute;
  font-size: 60rpx;
  color: #ff9900;
  top: -23rpx;
  left: -2rpx;
}
.type-name {
  position: absolute;
  font-size: 20rpx;
  top: 0rpx;
  left: 9rpx;
  color: #fff;
  font-weight: 800;
}
.msg {
  display: flex;
  padding: 40rpx;
}
.cover {
  position: relative;
}
.cover-img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}
.cover-tag {
  position: absolute;
  width: 95rpx;
  height: 37rpx;
  border: 1rpx solid #ff9900;
  text-align: center;
  border-radius: 5rpx;
  top: 110rpx;
  left: 11rpx;
  color: #ff9900;
  font-size: 25rpx;
  line-height: 37rpx;
  background: #fff;
}
.info {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0 40rpx;
  font-size: 27rpx;
  height: 150rpx;
  width: 450rpx;
}
.info-title {
  font-size: 40rpx;
}
.info-second {
  display: flex;
  justify-content: space-between;
}
.distance-time,
.distance-len,
.ratio {
  color: #80848f;
}
.address {
  color: #2b85e4;
  text-decoration: underline;
}
.verital {
  vertical-align: middle;
}
.initiator {
  position: absolute;
  width: 135rpx;
  height: 50rpx;
  right: 0;
  bottom: 0;
  color: #ff9900;
  display: flex;
  justify-content: space-between;
  background: rgba(0,0,0,0.1);
  border-radius: 20rpx 0 13rpx 0;
}
.initiator-imgdiv {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50rpx;
}
.initiator-img {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
}
.initiator-scorediv {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25rpx;
  width: 86rpx;
}
.initiator-icon {
}
.initiator-score {
  
}
</style>
