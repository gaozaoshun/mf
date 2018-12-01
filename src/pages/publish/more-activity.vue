<template>
    <div class="wrapper">
        <div class="title">
            <i class="iconfont mf-qizi1 title-icon"></i>
            <span class="title-info">说一下聚会怎么玩吧</span>
        </div>
        <!-- 聚会亮点 -->
        <div class="light">
            <div class="light-title">
                <div class="light-center">
                    <i class="iconfont mf-liangdian light-icon"></i>
                    <span class="light-info">聚会亮点</span>
                    <span class="light-tip">（选填）</span>
                </div>
                <div class="light-center">
                    <i class="iconfont mf-up light-up"></i>
                </div>
            </div>
            <div class="light-content">
                <i-input mode='wrapped' i-class='light-input' maxlength='150' type='textarea' placeholder='说点什么，让大家更了解你发起的聚会。' :autofocus='true' @change="chageBrightSpot"></i-input>
            </div>
        </div>
        <!-- 聚会流程 -->
        <div class="flow">
            <div class="light-title">
                <div class="light-center">
                    <i class="iconfont mf-shalou light-icon"></i>
                    <span class="light-info">聚会流程</span>
                    <span class="light-tip">（必填）</span>
                </div>
                <div class="light-center">
                    <i class="iconfont mf-up light-up"></i>
                </div>
            </div>
            <div class="flow-content">
                <flow :step='1' :title='stepOneTitle' :content='placeAndTimeGroup' @chooseItem='chooseStepOne'></flow>
                <flow :step='2' :title='stepTwoTitle' :content='ingGroup' @chooseItem='chooseStepTwo'></flow>
                <flow :step='3' :title='stepThreeTitle' :content='endGroup' @chooseItem='chooseStepThree'></flow>
            </div>
        </div>
        <!-- 上一步 -->
        <i-button @click="lastStep" type="ghost" shape="circle" size="small">上一步</i-button>
        <!-- 下一步 -->
        <i-button @click="nextStep" type="warning" shape="circle" size="small">下一步</i-button>
    </div>
</template>
<script>
import { getDictGroup } from '@/api/common'
import { $Message, $Toast } from '~/iview/base/index'
import Flow from '@/components/flow'

export default {
    props: {

    },
    data() {
        return {
            activity: {
                brightSpot: '',
                activityFlow: []
            },
            stepOneTitle: '集合时间和地点',
            stepTwoTitle: '聚会进行时',
            stepThreeTitle: '聚会结束/下半场安排',
            placeAndTimeGroup: [],
            ingGroup: [],
            endGroup: [],
            refreshTime: ''
        }
    },
    onPullDownRefresh() {
        if (this.refreshTime && computedSeconds(new Date(), this.refreshTime) < 10) {
            wx.stopPullDownRefresh()
            $Message({
                type: 'warning',
                content: '服务繁忙~请稍后重试！',
            })
        } else {
            this.refreshTime = new Date()
            this.initDictGroup()
        }


    },
    created() {
        this.initDictGroup()
    },
    computed: {
        lastActivity() {
            return this.$store.state.publishActivity
        }
    },
    components: { Flow },
    methods: {
        // 上一步
        lastStep() {
            this.$emit('lastStep')
        },
        //下一步
        nextStep() {
            if (this.checkParams()) {
                let params = Object.assign(this.lastActivity, this.activity)
                this.$emit('nextStep', params)
            }
        },
        checkParams() {
            let activity = this.activity
            if (activity.activityFlow.length < 3) {
                $Message({
                    type: 'error',
                    content: '请组织好聚会流程'
                })
                return false
            }
            return true
        },
        chageBrightSpot(e) {
            this.activity.brightSpot = e.target.detail.value
        },
        async initDictGroup() {
            // 集合时间和地点
            let PLACE_AND_TIME = getDictGroup('PLACE_AND_TIME')
            // 聚会进行时
            let ACTIVITY_IN_TIME = getDictGroup('ACTIVITY_IN_TIME')
            // 聚会结束
            let ACTIVITY_OVER_TIME = getDictGroup('ACTIVITY_OVER_TIME')
            Promise.all([PLACE_AND_TIME, ACTIVITY_IN_TIME, ACTIVITY_OVER_TIME]).then(list => {
                this.placeAndTimeGroup = list[0]
                this.ingGroup = list[1]
                this.endGroup = list[2]
                wx.stopPullDownRefresh()
            })
        },
        chooseStepOne(stepInfo) {
            this.activity.activityFlow[0] = stepInfo
        },
        chooseStepTwo(stepInfo) {
            this.activity.activityFlow[1] = stepInfo
        },
        chooseStepThree(stepInfo) {
            this.activity.activityFlow[2] = stepInfo
        }

    }
}
</script>
<style>
.title {
  color: #ff9900;
  padding: 40rpx 30rpx;
}
.title-icon {
  font-size: 80rpx;
  vertical-align: middle;
  margin-right: 10rpx;
}
.title-info {
  vertical-align: middle;
  font-size: 40rpx;
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
.light-tip {
  font-size: 25rpx;
  color: rgba(0, 0, 0, 0.3);
  vertical-align: middle;
}
.light-up {
  font-size: 50rpx;
  color: rgba(0, 0, 0, 0.3);
}
.light-center {
  line-height: 100rpx;
}
.light-content {
}
.light-input {
  height: 200rpx !important;
  background: rgba(0, 0, 0, 0.01) !important;
  min-height: 200rpx !important;
  padding: 20rpx 20rpx !important;
}
.light-input > i-input-placeholder {
  height: 200rpx !important;
}
.flow-content {
  padding: 40rpx 20rpx;
}
.vertail {
  vertical-align: middle;
  display: inline;
}
</style>


