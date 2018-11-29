<template>
  <div class="wrapper">
    <!-- 封面图 -->
    <swiper class="swiper" :indicator-dots="true" indicator-color='#000' indicator-active-color='#ff9900' :autoplay="true" :circular="true">
      <div v-for="(item,index) in detail.publicityImages" :key='index'>
        <swiper-item>
          <img :src="item" class="swiper" />
        </swiper-item>
      </div>
    </swiper>
    <!-- 浏览数 -->
    <div class="viewNum">浏览110</div>

    <div class="title-wrapper">
      <div class="detail-label">{{detail.name}}</div>
      <div class="detail-label-bg"></div>
      <div class="title-img">
        <img :src="detail.cover" class="title-icon" />
      </div>
      <div class="title-msg">
        <div>
          <span>{{detail.title}}</span>
        </div>
        <div class="title-people">
          <div class="startTime">
            <i-icon type="clock" size="25" />
            <span class="title-time">{{detail.activityTime}}</span>
          </div>
          <div class="title-person">人数：<span style='color:red'>{{detail.totalNum}}</span> / {{preTotalNum}}</div>
        </div>
        <div class="title-people">
          <div class="address-flex">
            <i-icon type="coordinates" size="25" class="address-icon" color="rgb(103, 202, 241)" />
            <span class="address-info">{{detail.address}}</span>
          </div>
          <div class="view-address">查看地图</div>
        </div>
      </div>
      <div>
      </div>
    </div>

    <div>
      <div class="detail-score">
        <div class="item">
          <i class="iconfont mf-jiangpai"></i>
          <span class="vertail">信誉：{{detail.score}}</span>
        </div>
        <div class="item">
          <i class="iconfont mf-18"></i>
          <span class="vertail">年龄：{{detail.ageTag}}</span>
        </div>
      </div>
      <div class="detail-score">
        <div class="item">
          <i class="iconfont mf-qian"></i>
          <span class="vertail">人均：{{detail.perPay}}</span>
        </div>
        <div class="item">
          <i class="iconfont mf-qunzu"></i>
          <span class="vertail">人数：{{preTotalNum}}</span>
        </div>
      </div>
      <div>
        <i-alert type="warning" show-icon>
          <div slot="desc">{{tip}}</div>
        </i-alert>
      </div>
    </div>
    <!-- 全局提醒 -->
    <i-message id="message" />
  </div>
</template>

<script>

import { $Message, $Toast } from '~/iview/base/index'
import { getActivityDetail } from '@/api/activity'

export default {
  components: {},
  data() {
    return {
      tip: '报名成功后不可随意爽约，除了会扣除信誉值，爽约一次将收到警告；爽约两次将暂时停止使用权限。聚会组队成功将以短线通知参与者。',
      detail: {
      }
    }
  },
  watch: {

  },
  computed: {
    preTotalNum() {
      return this.detail.preBoyNum + this.detail.preGirlNum
    },
    coverMap() {
      return this.$store.state.activityCoverMap
    }
  },
  methods: {
    // 活动详情
    getActivityDetail(activityId) {
      getActivityDetail(activityId).then(res => {
        if (res.code === 100) {
          res.data.cover = this.coverMap[res.data.type]
          this.detail = res.data
          console.log('detail', this.detail)
        } else {
          $Message({
            type: 'error',
            content: res.msg
          })
        }
      })
    }
  },
  onLoad() {
    // 获取活动ID
    let activityId = this.$root.$mp.query.id
    // 获取活动详情
    this.getActivityDetail(activityId)
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
}
.swiper {
  width: 750rpx;
  height: 350rpx;
}
.viewNum {
  position: absolute;
  top: 290rpx;
  right: 20rpx;
  width: 150rpx;
  height: 50rpx;
  line-height: 50rpx;
  font-size: 30rpx;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  text-align: center;
}
.title-wrapper {
  position: relative;
  display: flex;
  padding: 40rpx 30rpx 10rpx 30rpx;
  border-bottom: 20rpx solid rgba(0, 0, 0, 0.05);
}
.title-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300rpx;
  text-align: center;
}
.title-msg {
  display: flex;
  flex-direction: column;
}
.title-people {
  display: flex;
  justify-content: space-between;
  height: 80rpx;
}
.title-icon {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
}
.vertical {
  vertical-align: middle;
}
.startTime {
  color: rgba(0, 0, 0, 0.5);
  line-height: 80rpx;
}
.title-time {
  font-size: 30rpx;
  vertical-align: middle;
}
.title-person {
  font-size: 30rpx;
  line-height: 80rpx;
  color: rgba(0, 0, 0, 0.7);
}
.address-icon {
  display: inline-block;
}
.address-info {
  display: inline-block;
  font-size: 35rpx;
  width: 350rpx;
  line-height: 60rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: text-bottom;
  color: rgb(103, 202, 241);
}
.address-flex {
  display: flex;
  width: 415rpx;
}
.view-address {
  font-size: 25rpx;
  border: 1rpx solid rgb(103, 202, 241);
  width: 115rpx;
  line-height: 50rpx;
  height: 50rpx;
  text-align: center;
  border-radius: 10rpx;
  color: rgb(103, 202, 241);
  margin-top: 7rpx;
}
.detail-label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 25rpx;
  width: 50rpx;
  height: 50rpx;
  text-align: center;
  line-height: 50rpx;
  transform: rotate(-45deg);
  z-index: 10;
}
.detail-label-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-width: 80rpx 80rpx 0 0;
  border-style: solid;
  border-color: #ff9900 transparent transparent transparent;
}
.detail-score {
  display: flex;
  padding: 30rpx 30rpx 0 30rpx;
}
.item {
  font-size: 30rpx;
  color: rgba(0, 0, 0, 0.7);
  flex: 1;
}
.vertail {
  vertical-align: text-bottom;
  padding-left: 5rpx;
}
</style>
