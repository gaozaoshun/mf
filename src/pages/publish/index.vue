<template>
  <div class="wrapper">
    <!-- 活动类型 -->
    <div class="type" @click='toggleAction'>
      <span class="type-name">{{activity.typeName?activity.typeName:'选择活动类型'}} </span>
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
          <input slot='footer' type="text" :model='activity.title' placeholder="一句话介绍聚会" class="cell-input">
        </i-cell>
        <i-cell title="时间">
          <i-icon type='clock' slot='icon' size='20'></i-icon>
          <div slot='footer'>
            <picker mode="date" start="2018-11-07" end="2099-11-07" class='inline-block' @change='changeStartDate'>
              <span>{{activity.startTime_date?activity.startTime_date:'选择日期'}}</span>
            </picker>
            <span> | </span>
            <picker mode="time" start="00:00" end="23:59" class='inline-block' @change='changeStartTime'>
              <span>{{activity.startTime_time?activity.startTime_time:'选择时间'}}</span>
            </picker>
          </div>
        </i-cell>
        <i-cell title="地点">
          <i-icon type='coordinates' slot='icon' size='20'></i-icon>
          <div slot="footer">
            <span @click='chooseAddress'>{{address}}</span>
          </div>
        </i-cell>
        <i-cell title="人均">
          <i-icon type='redpacket' slot='icon' size='20'></i-icon>
            <div slot='footer'>
                <picker
                  @change="changePay"
                  :range="payGroup"
                  range-key='value'>
                    <span>{{activity.payStr?activity.payStr:'免费活动'}}</span>
               </picker>
            </div>
        </i-cell>
        
        <i-cell title="人数">
          <i-icon type='group' slot='icon' size='20'></i-icon>
          <div slot="footer">
            <picker class='inline-block'
              mode="multiSelector"
              :value='[3,3]'
              @change="changePersonNum"
              :range="personGroup">
              <span> {{activity.boyNum}} </span>
              <span>男</span>
              <span> {{activity.girlNum}} </span>
              <span>女</span>
            </picker>
            <i-icon type="feedback" size='20' color='#ff9900' class="person-num-help-icon" @click="popPersonNumTip"/>
          </div>
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
        <i-cell title="报名截止时间">
          <i-icon type='clock_fill' slot='icon' size='20'></i-icon>
          <div slot='footer'>
            <picker mode="date" start="2018-11-07" end="2099-11-07" class='inline-block' @change='changeEndDate'>
              <span>{{activity.endTime_date?activity.endTime_date:'选择日期'}}</span>
            </picker>
            <span> | </span>
            <picker mode="time" start="00:00" end="23:59" class='inline-block' @change='changeEndTime'>
              <span>{{activity.endTime_time?activity.endTime_time:'选择时间'}}</span>
            </picker>
          </div>
        </i-cell>
        <i-cell title="最晚到场时间">
          <i-icon type='clock' slot='icon' size='20'></i-icon>
          <div slot="footer">
            <picker
              @change="changeLastTime"
              :range="lastTimeGroup"
              range-key='value'>
              <span>{{activity.lastTimeStr?activity.lastTimeStr:'不限'}}</span>
            </picker>
          </div>
        </i-cell>
        <i-cell title="年龄">
          <i-icon type='mine' slot='icon' size='20'></i-icon>
          <div slot="footer">
            <picker
              @change="changeAge"
              :range="ageGroup"
              range-key='value'>
              <span>{{activity.ageStr?activity.ageStr:'不限'}}</span>
            </picker>
          </div>
        </i-cell>
        <i-cell title="信誉值">
          <i-icon type='financial_fill' slot='icon' size='20'></i-icon>
          <div slot="footer">
            <input type="number" placeholder="不限" :model='activity.score' class='score-input inline-block'>
            <i-icon type="feedback" size='20' color='#ff9900' class="person-num-help-icon inline-block" @click="popScoreTip"/>
          </div>
        </i-cell>
        <i-cell title="约定">
          <i-icon type='group' slot='icon' size='20'></i-icon>
          <div slot="footer">
            <i-icon type="add" size='30' color='#ff9900' class="block" @click="addTag"/>
          </div>
        </i-cell>
        <div>
            <i-tag v-for="(item,index) in tags" :key='index'>{{item}}</i-tag>
        </div>
      </i-cell-group>
    </div>
    <i-toast id="toast" />
  </div>
</template>

<script>
import { $Message, $Toast } from '~/iview/base/index'
export default {
  data() {
    return {
      activity: {
        typeName: '',
        title: '',
        startTime: '',
        startTime_date: '',
        startTime_time: '',
        endTime: '',
        endTime_date: '',
        endTime_time: '',
        lastTime: '',
        lastTimeStr:'',
        address: '',
        pay: '',
        payStr:'',
        boyNum: 3,
        girlNum: 3,
        totalNum: 6,
        age: '不限',
        score: '不限',
        tags: '1,2,3'
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
      payGroup: [
        {
          key: 'NN',
          value: '男免'
        },
        {
          key: 'MM',
          value: '女免'
        }
      ],
      personGroup: [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      ],
      lastTimeGroup:[
        {
          key:'AA',
          value:'不限'
        },
        {
          key:'BB',
          value:'活动开始后5分钟'
        },
        {
          key:'CC',
          value:'活动开始后10分钟'
        },
        {
          key:'DD',
          value:'活动开始后15分钟'
        },
        {
          key:'EE',
          value:'活动开始后20分钟'
        }
      ],
      ageGroup:[
        {
          key:'AA',
          value:'不限',
        },
        {
          key:'BB',
          value:'95后',
        },
        {
          key:'CC',
          value:'90后',
        },
        {
          key:'DD',
          value:'85后',
        }
      ]
    }
  },
  computed: {
    tags() {
      return this.activity.tags.split(',')
    },
    address() {
      return this.$store.state.activityAddress ? this.$store.state.activityAddress : '请选择地址'
    }
  },
  methods: {
    // 添加约定标签
    addTag(){
      
    },
    // 选择年龄
    changeAge(e){
      let ageGroupItem = this.ageGroup[e.target.value]
      this.activity.age = ageGroupItem.key
      this.activity.ageStr = ageGroupItem.value
    },
    // 选择最晚到场时间
    changeLastTime(e){
      let lastTimeGroupItem = this.lastTimeGroup[e.target.value]
      this.activity.lastTime = lastTimeGroupItem.key
      this.activity.lastTimeStr = lastTimeGroupItem.value
    },
    // 选择人数
    changePersonNum(e) {
      let indexs = e.target.value
      this.activity.boyNum = this.personGroup[0][indexs[0]]
      this.activity.girlNum = this.personGroup[1][indexs[1]]
    },
    // 弹出人数信息提示
    popPersonNumTip() {
      $Toast({
        icon: 'group',
        content: '参与人数默认为三男三女 这样的聚会更加好玩融洽',
        duration: 5
      })
    },
    // 弹出信誉值信息提示
    popScoreTip(){
       $Toast({
        icon: 'redpacket',
        content: '聚友在闪七的活跃程度及受欢迎程度。 参与/发起活动、被点赞等都会增加信誉值; 聚会爽约、迟到等则会被扣除信誉值。',
        duration: 5
      })
    },
    // 选择地址
    chooseAddress() {
      wx.chooseLocation({
        success: res => {
          this.$store.dispatch('setActivityAddress', res.name)
        }
      })
    },
    changeTitle(title) {
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
    },
    // 选择开始时间
    changeStartDate(e) {
      this.activity.startTime_date = e.target.value
    },
    changeStartTime(e) {
      this.activity.startTime_time = e.target.value
    },
    // 选择报名截止时间
     changeEndDate(e) {
      this.activity.endTime_date = e.target.value
    },
    changeEndTime(e) {
      this.activity.endTime_time = e.target.value
    },
    // 选择人均
    changePay(e) {
      this.activity.payStr = this.payGroup[e.target.value].value
      this.activity.pay = this.payGroup[e.target.value].key
    }
  }
}
</script>

<style scoped>
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
.score-input{
  width: 300rpx;
  vertical-align: middle;
}

</style>
