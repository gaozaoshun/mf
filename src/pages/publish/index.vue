<template>
  <div class="wrapper">
    <!-- 活动类型 -->
    <div class="type" @click='toggleAction'>
      <span class="type-name">{{activity.typeName}} </span>
      <i-icon class='type-icon' :type='upIcon' size='20' color='#ff9900'></i-icon>
    </div>
    <i-action-sheet :visible="openAction" :actions="actions" show-cancel @cancel="cancelType" @click="chooseType">
        <div slot="header" style="padding: 16px">选择活动类型</div>
    </i-action-sheet>
    <!-- 必填 -->
    <div class="required">
      <div class="require-title">
        <i-icon type='warning' size='20' color='red' class="required-icon"></i-icon>
        <span class="required-name"> 必填</span>
      </div>
      <i-cell-group>
        <i-cell title="主题">
          <i-icon type='integral' slot='icon' size='20'></i-icon>
          <i-input slot="footer" right='true' :model='activity.title' i-class='cell-input' placeholder="一句话介绍聚会"/>
        </i-cell>
        <picker mode="time" :value="activity.startTime" start="09:01" end="21:01" bindchange="bindTimeChange">
          <i-cell title="时间" is-link :value='activity.startTime'>
            <i-icon type='clock' slot='icon' size='20'></i-icon>
          </i-cell>
        </picker>
        <i-cell title="地点" is-link :value='activity.address'>
          <i-icon type='coordinates' slot='icon' size='20'></i-icon>
        </i-cell>
        <i-cell title="人均" is-link :value='activity.pay'>
          <i-icon type='redpacket' slot='icon' size='20'></i-icon>
        </i-cell>
        <i-cell title="人数" is-link :value='activity.totalNum' label='默认3男3女'>
          <i-icon type='group' slot='icon' size='20'></i-icon>
        </i-cell>
      </i-cell-group>
    </div>
    <!-- 选填 -->
    <div class="required">
      <div class="require-title">
        <i-icon type='success' size='20' color='red' class="required-icon"></i-icon>
        <span class="required-name"> 选填</span>
        <span class="required-label"> (年龄、信誉值、约定)</span>
      </div>
      <i-cell-group>
        <i-cell title="报名截止时间" is-link :value='activity.endTime'>
          <i-icon type='clock_fill' slot='icon' size='20'></i-icon>
        </i-cell>
        <i-cell title="最晚到场时间" is-link :value='activity.lastTime'>
          <i-icon type='clock' slot='icon' size='20'></i-icon>
        </i-cell>
        <i-cell title="年龄" is-link :value='activity.age'>
          <i-icon type='mine' slot='icon' size='20'></i-icon>
        </i-cell>
        <i-cell title="信誉值" is-link :value='activity.score'>
          <i-icon type='financial_fill' slot='icon' size='20'></i-icon>
        </i-cell>
        <i-cell title="约定" >
          <i-icon type='group' slot='icon' size='20'></i-icon>
          <div slot="footer">
              <i-tag v-for="(item,index) in tags" :key='index'>{{item}}</i-tag>
          </div>
        </i-cell>
    </i-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activity: {
        typeName: '选择活动类型',
        title: '',
        startTime: '请选择开始时间',
        endTime: '请选择截止时间',
        lastTime: '不限',
        address: '请选择地址',
        pay: '免费活动',
        totalNum: 0,
        age: '不限',
        score: '不限',
        tags:'1,2,3'
      },
      upIcon: 'unfold',
      openAction: false,
      actions: [
        {
          icon: 'shop_fill',
          name: '美食',
        },
        {
          icon: 'video_fill',
          name: '电影',
        },
        {
          icon: 'video_fill',
          name: 'KTV',
        },
        {
          icon: 'homepage_fill',
          name: '桌游',
        },
        {
          icon: 'flag_fill',
          name: '运动',
        },
        {
          icon: 'add',
          name: '其他',
        },
      ],
    }
  },
  computed:{
    tags(){
      return this.activity.tags.split(',')
    }
  },
  methods: {
    changeTitle(title){
      console.log(title)
    },
    // 点击弹出选择活动类型Action
    toggleAction() {
      // 更改活动up down图标
      this.upIcon = this.upIcon === 'packup' ? 'unfold' : 'packup'
      // 显示状态
      this.openAction = !this.openAction
    },
    // 选择活动类型
    chooseType(e) {
      let windowHeight = wx.getSystemInfoSync().windowHeight
      let offset = 48
      let topY = windowHeight - offset * this.actions.length - 54
      let index = Math.floor((e.pageY - topY) / offset)
      if (index > -1 && index < this.actions.length) {
        this.activity.typeName = this.actions[index].name
        this.toggleAction()
      }

    },
    // 取消选择活动类型
    cancelType() {
      this.toggleAction()
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
.cell-input{
  width: 500rpx;
}
</style>
