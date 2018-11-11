<template>
    <div>
        <div id='step-one'>
            <!-- 活动类型 -->
            <div class="type" @click='toggleAction'>
                <span class="type-name">{{activity.typeName?activity.typeName:'选择活动类型'}} </span>
                <i-icon class='type-icon' :type='upIcon' size='20' color='#ff9900'></i-icon>
            </div>
            <i-action-sheet :visible="openAction" :actions="typeGroup" show-cancel @cancel="cancelType" @click="chooseType">
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
                        <input slot='footer' type="text" :value='activity.title' placeholder="一句话介绍聚会" class="cell-input" maxlength='15' @blur='blurTitle'>
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
                            <span @click='chooseAddress'>{{activity.address?activity.address:'请选择地址'}}</span>
                        </div>
                    </i-cell>
                    <i-cell title="人均">
                        <i-icon type='redpacket' slot='icon' size='20'></i-icon>
                        <div slot='footer'>
                            <picker @change="changePay" :range="payGroup" range-key='name'>
                                <span>{{activity.payStr}}</span>
                            </picker>
                        </div>
                    </i-cell>

                    <i-cell title="人数">
                        <i-icon type='group' slot='icon' size='20'></i-icon>
                        <div slot="footer">
                            <picker class='inline-block' mode="multiSelector" @change="changePersonNum" :range="personGroup">
                                <span> {{activity.preBoyNum}} </span>
                                <span>男</span>
                                <span> {{activity.preBoyNum}} </span>
                                <span>女</span>
                            </picker>
                            <i-icon type="feedback" size='20' color='#ff9900' @click="popPersonNumTip" />
                        </div>
                    </i-cell>
                </i-cell-group>
            </div>
            <!-- 选填 -->
            <div class="required">
                <div class="require-title">
                    <i-icon type='success' size='20' color='red' class="required-icon"></i-icon>
                    <span class="required-name"> 选填</span>
                    <span class="required-label"> （年龄、信誉值、约定）</span>
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
                            <picker @change="changeLastTime" :range="lastTimeGroup" range-key='name'>
                                <span>{{activity.lastTimeStr}}</span>
                            </picker>
                        </div>
                    </i-cell>
                    <i-cell title="年龄">
                        <i-icon type='mine' slot='icon' size='20'></i-icon>
                        <div slot="footer">
                            <picker @change="changeAge" :range="ageGroup" range-key='name'>
                                <span>{{activity.ageStr?activity.ageStr:'不限'}}</span>
                            </picker>
                        </div>
                    </i-cell>
                    <i-cell title="信誉值">
                        <i-icon type='financial_fill' slot='icon' size='20'></i-icon>
                        <div slot="footer">
                            <input type="number" placeholder="不限" class='score-input inline-block' @blur='blurScore'>
                            <i-icon type="feedback" size='20' color='#ff9900' class="person-num-help-icon inline-block" @click="popScoreTip" />
                        </div>
                    </i-cell>
                    <i-cell title="约定">
                        <i-icon type='group' slot='icon' size='20'></i-icon>
                        <div slot="footer">
                            <i-icon type="add" size='30' color='#ff9900' class="block" @click="popTag" />
                        </div>
                    </i-cell>
                    <div class="tag-wrapper">
                        <i-tag v-for="(item,index) in activity.tags" :key="index" checkable='true' @change="changeSelectedTag" :name="item.key" :checked="item.checked" :color="item.color" style="margin:10rpx;">
                            {{item.name}}
                        </i-tag>
                    </div>
                </i-cell-group>
            </div>
            <!-- 下一步 -->
            <i-button @click="nextStep" type="warning" shape="circle" size="small">下一步</i-button>
            <!-- 约定 -->
            <i-modal :visible="openTagWindow" title="约定规则" @ok="chooseTags" :show-cancel='false' ok-text='完成' color='#ff9900'>
                <i-tag v-for="(item,index) in tagGroup" :key="index" checkable='true' @change="changeTag" :name="item.key" :color="item.color" :checked="item.checked" type="border" style="margin:10rpx;">
                    {{item.name}}
                </i-tag>
            </i-modal>
        </div>
        <!-- 提示 -->
        <i-toast id="toast" />
        <!-- 全局提醒 -->
        <i-message id="message" />
    </div>
</template>
<script>
import { getDictGroup, getLocationInfo } from '@/api/common'
import { $Message, $Toast } from '~/iview/base/index'
import { compare } from '@/utils/date'
export default {
    data() {
        return {
            activity: {
                typeName: '运动',
                type: 'SPORTS',
                title: '白云山夜跑',
                activityTime: '2018-11-10 00:00',
                startTime_date: '2018-11-10',
                startTime_time: '00:00',
                enrolmentTime: '',
                endTime_date: '',
                endTime_time: '',
                lastTime: '',
                lastTimeStr: '',
                address: '陈家祠',
                perPay: '',
                payStr: '',
                preBoyNum: 3,
                preGirlNum: 3,
                totalNum: 6,
                age: '',
                score: '',
                tags: [],
                coordinate: '',
                city: '',
                region: ''
            },
            upIcon: 'unfold',
            openAction: false,
            typeGroup: [],
            payGroup: [],
            personGroup: [],
            lastTimeGroup: [],
            ageGroup: [],
            tagGroup: [],
            openTagWindow: false,
            animation: [],
        }
    },
    created() {
        this.initDictData()
      
    },
    computed: {

    },
    methods: {
        // 主题输入框失去焦点时绑定数据
        blurTitle(e) {
            this.activity.title = e.target.value
        },
        blurScore(e) {
            this.activity.score = e.target.value
        },
        // 下一步
        nextStep() {
            // 活动参数处理
            if (this.checkParams()) {
                $Message({
                    type: 'success',
                    content: '参数校验通过'
                })
                this.$emit('nextStep', this.activity)
            }
        },
        // 参数校验
        checkParams() {
            let activity = this.activity
            // 活动类型
            if (!activity.type || activity.type.trim() === '') {
                $Message({
                    type: 'error',
                    content: '请选择活动类型'
                })
                return false
            }
            // 主题
            if (!activity.title || activity.title.trim() === '') {
                $Message({
                    type: 'error',
                    content: '请填写活动主题'
                })
                return false
            }
            // 时间
            if (!activity.startTime_date || !activity.startTime_time) {
                $Message({
                    type: 'error',
                    content: '请选择活动开始时间'
                })
                return false
            } else {
                // 拼接开始时间
                this.activity.activityTime = `${activity.startTime_date} ${activity.startTime_time}:00`
                // 开始时间要大于现在
                if (compare(this.activity.activityTime, new Date()) < 1) {
                    $Message({
                        type: 'error',
                        content: '活动开始时间不能小于当前时间'
                    })
                    return false
                }
            }
            // 地址
            if (!activity.address || activity.address.trim() === '') {
                $Message({
                    type: 'error',
                    content: '请选择活动地址'
                })
                return false
            }
            // 人数
            if (activity.preBoyNum === 0 && activity.preGirlNum === 0) {
                $Message({
                    type: 'error',
                    content: '男女人数不能都为0'
                })
                return false
            } else {
                // 总人数
                this.activity.totalNum = activity.preBoyNum + activity.preGirlNum
            }
            // 报名截止时间
            if (!activity.endTime_date || !activity.endTime_time) {
                this.activity.enrolmentTime = ''
            } else {
                // 拼接时间
                this.activity.enrolmentTime = `${activity.endTime_date} ${activity.endTime_time}:00`
                 if (compare(this.activity.enrolmentTime, new Date()) < 1) {
                    $Message({
                        type: 'error',
                        content: '报名截止时间不能小于当前时间'
                    })
                    return false
                }
                // 报名截止时间要小于活动开始时间
                if (compare(this.activity.enrolmentTime, this.activity.activityTime) > -1) {
                    $Message({
                        type: 'error',
                        content: '报名截止时间要小于活动开始时间'
                    })
                    return false
                }
            }
            // 信誉值
            if (!activity.score || activity.score.trim() === '') {
                this.activity.score = 0
            } else {
                if (activity.score < 0) {
                    $Message({
                        type: 'error',
                        content: '信誉值填写错误'
                    })
                    return false
                }
            }
            return true
        },
        // 初始化字典组
        initDictData() {
            // 活动类型
            getDictGroup('ACTIVITY_TAPE').then(res => {
                if (res.code === 100) {
                    this.typeGroup = res.data
                } else {
                    $Message({
                        content: res.msg,
                        type: 'error'
                    })
                }
            })
            // 人均类型
            getDictGroup('ACTIVITY_BUDGET').then(res => {
                if (res.code === 100) {
                    this.payGroup = res.data
                    this.activity.perPay = this.payGroup[0].key
                    this.activity.payStr = this.payGroup[0].name
                } else {
                    $Message({
                        content: res.msg,
                        type: 'error'
                    })
                }
            })
            // 最晚到场时间
            getDictGroup('ACTIVITY_TIME_LIMIT').then(res => {
                if (res.code === 100) {
                    this.lastTimeGroup = res.data
                    this.activity.lastTime = this.lastTimeGroup[0].key
                    this.activity.lastTimeStr = this.lastTimeGroup[0].name
                } else {
                    $Message({
                        content: res.msg,
                        type: 'error'
                    })
                }
            })
            // 年龄组
            getDictGroup('USER_AGE').then(res => {
                if (res.code === 100) {
                    this.ageGroup = res.data
                    this.activity.age = this.ageGroup[0].key
                    this.activity.ageStr = this.ageGroup[0].name
                } else {
                    $Message({
                        content: res.msg,
                        type: 'error'
                    })
                }
            })
            // 男女人数
            getDictGroup('PEOPLES').then(res => {
                if (res.code === 100) {
                    let boyGroup = []
                    let girlGroup = []
                    res.data.forEach(item => {
                        boyGroup.push(item.name)
                        girlGroup.push(item.name)
                    })
                    this.personGroup = [boyGroup, girlGroup]
                    this.activity.preBoyNum = this.personGroup[0][0]
                    this.activity.preGirlNum = this.personGroup[1][0]
                } else {
                    $Message({
                        content: res.msg,
                        type: 'error'
                    })
                }
            })
            // 约定
            getDictGroup('ACTIVITY_CONVENTION').then(res => {
                if (res.code === 100) {
                    this.tagGroup = res.data
                    this.tagGroup.map(item => {
                        item.checked = false
                        item.color = 'blue'
                        return item
                    })
                } else {
                    $Message({
                        content: res.msg,
                        type: 'error'
                    })
                }
            })
        },
        // 弹出约定规则窗口
        popTag() {
            this.openTagWindow = true
        },
        // 完成选择约定规则
        chooseTags() {
            this.openTagWindow = false
            this.activity.tags = this.tagGroup.filter(item => {
                return item.checked
            })
        },
        // 选择约定规则
        changeTag(e) {
            let key = e.target.name
            this.tagGroup = this.tagGroup.map(item => {
                if (item.key === key) {
                    item.checked = !item.checked
                }
                return item
            })
        },
        // 取消选择约定规则
        changeSelectedTag(e) {
            let key = e.target.name
            this.tagGroup = this.tagGroup.map(item => {
                if (item.key === key) {
                    item.checked = !item.checked
                }
                return item
            })
            this.activity.tags = this.activity.tags.filter(item => {
                return item.key !== key
            })
        },
        // 选择年龄
        changeAge(e) {
            let ageGroupItem = this.ageGroup[e.target.value]
            this.activity.age = ageGroupItem.key
            this.activity.ageStr = ageGroupItem.name
        },
        // 选择最晚到场时间
        changeLastTime(e) {
            let lastTimeGroupItem = this.lastTimeGroup[e.target.value]
            this.activity.lastTime = lastTimeGroupItem.key
            this.activity.lastTimeStr = lastTimeGroupItem.name
        },
        // 选择人数
        changePersonNum(e) {
            let indexs = e.target.value
            this.activity.preBoyNum = this.personGroup[0][indexs[0]]
            this.activity.preGirlNum = this.personGroup[1][indexs[1]]
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
        popScoreTip() {
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
                    console.log('地址', res)
                    this.activity.address = res.name
                    this.activity.coordinate = `${res.longitude},${res.latitude}`
                    getLocationInfo({ latitude: res.latitude, longitude: res.longitude }).then(res => {
                        console.log(res)
                        if (res.status === '1') {
                            this.activity.city = res.regeocode.addressComponent.city.length > 0 ? res.regeocode.addressComponent.city : res.regeocode.addressComponent.province
                            this.activity.region = res.regeocode.addressComponent.district
                        }
                        console.log('获取城市', this.activity)
                    })
                }
            })
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
            let topY = windowHeight - offset * this.typeGroup.length - 54
            let index = Math.floor((e.pageY - topY) / offset)
            if (index > -1 && index < this.typeGroup.length) {
                this.activity.typeName = this.typeGroup[index].name
                this.activity.type = this.typeGroup[index].key
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
            this.activity.payStr = this.payGroup[e.target.value].name
            this.activity.perPay = this.payGroup[e.target.value].key
        }
    }
}
</script>
<style scoped>
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
  font-size: 20rpx;
  letter-spacing: 3rpx;
  vertical-align: middle;
}
.cell-input {
  width: 500rpx;
}
.inline-block {
  display: inline-block;
}
.score-input {
  width: 300rpx;
  vertical-align: middle;
}
.person-num-help-icon {
  vertical-align: middle;
}
.tag-wrapper {
  background: #fff;
  padding: 0 25rpx 25rpx 25rpx;
}
</style>


