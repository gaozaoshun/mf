<template>
  <div class="wrapper">
    <!-- 活动类型 -->
    <div class="type" @click='popTypeAction'>
      <span class="type-name">{{activity.typeName}} </span>
      <i-icon class='type-icon' :type='upIcon' size='20' color='#ff9900'></i-icon>
    </div>
    <i-action-sheet :visible="upIcon==='packup'" :actions="actions" show-cancel @cancel="cancelType" @click="chooseType">
        <div slot="header" style="padding: 16px">选择活动类型</div>
    </i-action-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activity: {
        typeName: '选择活动类型'
      },
      upIcon: 'unfold',
      actions: [
        {
          icon:'shop_fill',
          name: '美食',
        },
        {
          icon:'video_fill',
          name: '电影',
        },
        {
           icon:'video_fill',
          name: 'KTV',
        },
        {
          icon:'homepage_fill',
          name: '桌游',
        },
        {
          icon:'flag_fill',
          name: '运动',
        },
        {
          icon:'add',
          name: '其他',
        },
      ],
    }
  },
  methods: {
    // 点击弹出选择活动类型Action
    popTypeAction() {
      this.upIcon = this.upIcon === 'packup' ? 'unfold' : 'packup'
    },
    // 选择活动类型
    chooseType() {

    },
    // 取消选择活动类型
    cancelType() {

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
</style>
