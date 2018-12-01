<template>
  <div class="wrapper">
    <!-- 封面图 -->
    <swiper
      class="swiper"
      :indicator-dots="true"
      indicator-color='#000'
      indicator-active-color='#ff9900'
      :autoplay="true"
      :circular="true"
    >
      <div
        v-for="(item,index) in detail.publicityImages"
        :key='index'
      >
        <swiper-item>
          <img
            :src="item"
            class="swiper"
          />
        </swiper-item>
      </div>
    </swiper>
    <!-- 浏览数 -->
    <div class="viewNum">浏览110</div>

    <div class="title-wrapper">
      <div class="detail-label">{{detail.name}}</div>
      <div class="detail-label-bg"></div>
      <div class="title-img">
        <img
          :src="detail.cover"
          class="title-icon"
        />
      </div>
      <div class="title-msg">
        <div>
          <span>{{detail.title}}</span>
        </div>
        <div class="title-people">
          <div class="startTime">
            <i-icon
              type="clock"
              size="25"
            />
            <span class="title-time">{{detail.activityTime}}</span>
          </div>
          <div class="title-person">人数：<span style='color:red'>{{detail.totalNum}}</span> / {{preTotalNum}}</div>
        </div>
        <div class="title-people">
          <div class="address-flex">
            <i-icon
              type="coordinates"
              size="25"
              class="address-icon"
              color="rgb(103, 202, 241)"
            />
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
          <span class="vertail">人数：{{detail.preBoyNum}}男 {{detail.preGirlNum}}女</span>
        </div>
      </div>
      <div>
        <i-alert
          type="warning"
          show-icon
        >
          <div slot="desc">{{tip}}</div>
        </i-alert>
      </div>
    </div>
    <!-- 报名人数 -->
    <div class="light">
      <div class="light-title">
        <div class="light-center">
          <i class="iconfont mf-liangdian light-icon"></i>
          <span class="light-info">报名人数：{{detail.totalNum}}/{{preTotalNum}}</span>
        </div>
      </div>
      <div class="light-content">
        <div>
          <span>发起者</span>
          <div class="publisher">
            <img
              :src="detail.publisherImageUrl"
              class="head-icon"
            >
            <span class="publish-name">{{detail.publisherName}}<i
                class="iconfont"
                :class="detail.publisherGender===1?'mf-nan sex-man':'mf-nv sex-nv'"
              ></i></span>
          </div>
        </div>
        <div>
          <span>参与者</span>
          <div>
            <div
              class="publisher"
              v-for="(item,index) in detail.participatorList"
              :key="index"
            >
              <img
                :src="item.imageUrl"
                class="head-icon"
              >
              <span class="publish-name">{{item.name}}<i
                  class="iconfont"
                  :class="item.gender===1?'mf-nan sex-man':'mf-nv sex-nv'"
                ></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 聚会亮点 -->
    <div class="light">
      <div class="light-title">
        <div class="light-center">
          <i class="iconfont mf-liangdian light-icon"></i>
          <span class="light-info">聚会亮点</span>
        </div>
      </div>
      <div class="light-content">
        <rich-text :nodes='detail.brightSpot'></rich-text>
      </div>
    </div>
    <!-- 聚会流程 -->
    <div
      class="flow"
      :v-if="detail.activityFlow"
    >
      <div class="light-title">
        <div class="light-center">
          <i class="iconfont mf-shalou light-icon"></i>
          <span class="light-info">聚会流程</span>
        </div>
      </div>
      <div class="flow-content">
        <i-steps direction="vertical">
          <i-step
            v-for='(item,index) in detail.activityFlow'
            :key="index"
          >
            <div
              slot="title"
              style="color:rgba(0,0,0,0.5)"
            >
              {{item}}
            </div>
          </i-step>
        </i-steps>
      </div>
    </div>
    <!-- 报名提醒 -->
    <div class="light">
      <div class="light-title">
        <div class="light-center">
          <i class="iconfont mf-naozhong light-icon"></i>
          <span class="light-info">报名提醒</span>
        </div>
      </div>
      <div class="light-content">
        <div style="line-height:50rpx">
          <span class="enrolmentTime">报名截止时间：</span>
          <span class="enrolmentTime-detail">{{detail.enrolmentTime}}</span>
        </div>
        <div style="line-height:50rpx">
          <span class="arriveLateTime">最晚到场时间：</span>
          <span class="arriveLateTime-detail">{{detail.arriveLateTime||'不限'}}</span>
        </div>
      </div>
    </div>
    <!-- 活动留言 -->
    <div class="light">
      <div class="light-title">
        <div class="light-center">
          <i class="iconfont mf-huiyizhongxin-liuyanqiang light-icon"></i>
          <span class="light-info">活动留言</span>
          <span class="comment-count">99</span>
        </div>
      </div>
      <div class="light-content">
        <div>
          <i-input
            :model="comment"
            type="textarea"
            placeholder="添加留言(最多50字)"
            maxlength="50"
            @blur="submitComment"
          />
        </div>
      </div>
    </div>
    <!-- 常见问题 -->
    <div class="light">
      <div class="light-title">
        <div class="light-center">
          <i class="iconfont mf-yiwen light-icon"></i>
          <span class="light-info">常见问题</span>
        </div>
      </div>
      <div class="light-content">
        <div style="display:flex;">
          <i class="iconfont mf-wenti question-icon"></i>
          <span class="question-info">如果有特殊情况无法按时参加聚会稚怎么办？</span>
        </div>
        <div style="display:flex;">
          <i class="iconfont mf-daan answer-icon"></i>
          <span class="answer-info">在聊天室和其他聚友说明你无法到场的原因，并在活动详情页面申请退出，而且要及时留意发起者是否同意您的申请</span>
        </div>
        <div>
          <button
            open-type="contact"
            class="contact-btn"
            send-message-title="高灶顺"
          >
            <i class="iconfont mf-kefu"></i>
            <span>联系客服</span>
          </button>
        </div>
      </div>
    </div>
    <!-- 底部操作组件 -->
    <div class="operation">
      <div class="join" @click="joinActivity">我要报名</div>
      <div class="home" @click="toHome">
        <i class="iconfont mf-shouye" style="font-size:35rpx"></i>
        <span>首页</span>
      </div>
      <button class="share" @click="share" open-type='share'>
        <i class="iconfont mf-fenxiang2" style="font-size:35rpx"></i>
      </button>
    </div>
    <!-- 全局提醒 -->
    <i-message id="message"></i-message>
  </div>
</template>

<script>

import { $Message, $Toast } from '~/iview/base/index'
import { getActivityDetail } from '@/api/activity'

export default {
  components: {},
  data() {
    return {
      comment: '',
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
    // 参加活动
    joinActivity(){

    },
    // 回到首页
    toHome(){
      wx.navigateBack(-1)
    },
    // 分享到微信、朋友圈
    share(){

    },
    // 添加留言
    submitComment(res) {
      console.log(res)
      let value = res.target.detail.value
      this.comment = ''
    },
    // 活动详情
    getActivityDetail(activityId) {
      getActivityDetail(activityId).then(res => {
        if (res.code === 100) {
          console.log('coverMap', this.coverMap[res.data.type])
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
  },
  onShareAppMessage(obj){
     if (obj.from === 'button') {
      // 来自页面内转发按钮
      console.log(obj.target)
    }
    return {
      title: `闪约|${this.detail.title}`,
      path: `/pages/activityDetail/main?id=${this.$root.$mp.query.id}`,
      imageUrl:`${this.detail.publicityImages[0]}`
      
    }
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
.light-title {
  font-size: 50rpx;
  color: #ff9900;
  width: 690rpx;
  height: 100rpx;
  padding: 0 30rpx;
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.03);
}
.light-icon {
  font-size: 38rpx;
  margin-right: 10rpx;
  vertical-align: middle;
}
.light-info {
  font-size: 30rpx;
  margin-right: 10rpx;
  vertical-align: middle;
}
.light-center {
  line-height: 100rpx;
}
.light-content,
.flow-content {
  padding: 30rpx 30rpx;
  font-size: 30rpx;
  color: rgba(0, 0, 0, 0.7);
}
.publisher {
  position: relative;
  display: flex;
  justify-items: center;
  padding: 20rpx 0;
}
.head-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.publish-name {
  line-height: 80rpx;
  margin-left: 20rpx;
  color: #13ae10;
}
.sex-nv {
  color: #ff3ec9;
}
.sex-man {
  color: #75b9eb;
}
.enrolmentTime,
.arriveLateTime {
  color: rgba(0, 0, 0, 0.5);
  font-size: 25rpx;
}
.enrolmentTime-detail,
.arriveLateTime-detail {
  color: rgba(0, 0, 0, 0.8);
  font-size: 25rpx;
  font-weight: bolder;
}
.comment-count {
  background: #e21918;
  font-size: 20rpx;
  color: #fff;
  border-radius: 15rpx;
  padding: 0rpx 10rpx;
  vertical-align: middle;
}
.question-icon {
  color: #ef4542;
  vertical-align: middle;
}
.question-info {
  font-size: 22rpx;
  color: #000;
  padding: 5rpx 10rpx 0 10rpx;
}
.answer-icon {
  color: #09ba06;
  vertical-align: middle;
}
.answer-info {
  font-size: 22rpx;
  color: rgba(0, 0, 0, 0.7);
  padding: 5rpx 10rpx 0 10rpx;
}
.contact-btn {
  margin: 40rpx 0;
  border: 1rpx solid #ff9900;
  border-radius: 10rpx;
  text-align: center;
  line-height: 80rpx;
  font-size: 25rpx;
  color: #ff9900;
  margin-bottom: 100rpx; 
}
.operation{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100rpx;
  background: #ff9900;
  z-index: 1000;
  display: flex;
}
.join{
  flex: 1;
  text-align: center;
  line-height: 100rpx;
  font-size: 30rpx;
  font-weight: bolder;
  border-right: 1rpx solid rgba(0, 0, 0, 0.1);
}
.home{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20rpx;
  width: 100rpx;
  border-right: 1rpx solid rgba(0, 0, 0, 0.1);
  padding-top:20rpx; 
  font-weight: bolder;
}
.share{
  background: #ff9900;
  font-size: 20rpx;
  width: 100rpx;
  border-right: 1rpx solid rgba(0, 0, 0, 0.1);
  padding-top: 10rpx;
  font-weight: bolder;
}

</style>
