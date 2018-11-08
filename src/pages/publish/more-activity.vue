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
                <i-input mode='wrapped' i-class='light-input' maxlength='150' type='textarea' placeholder='说点什么，让大家更了解你发起的聚会。' :autofocus='true'></i-input>
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
                <i-steps current="2" direction="vertical">
                    <i-step>
                        <div slot="title">集合时间和地点</div>
                        <div slot="content">
                            <i-radio-group :current="flowOneIndex" @change="changeFlowOne">
                                <i-radio i-class='vertail' v-for="(item,index) in placeAndTimeGroup" :key="index" :value="item.name" color='#ff9900'>
                                </i-radio>
                            </i-radio-group>
                        </div>
                    </i-step>
                    <i-step>
                        <div slot="title">聚会进行时</div>
                        <div slot="content">
                            这里是该步骤的描述信息
                        </div>
                    </i-step>
                    <i-step>
                        <div slot="title">聚会结束/下半场安排</div>
                        <div slot="content">
                            这里是该步骤的描述信息
                        </div>
                    </i-step>
                </i-steps>
            </div>
        </div>
        <i-message id='message'></i-message>
    </div>
</template>
<script>
import { getDictGroup } from '@/api/common'
import { $Message, $Toast } from '~/iview/base/index'
export default {
    data() {
        return {
            flowOneIndex: '',
            placeAndTimeGroup: []
        }
    },
    created() {
        this.initDictGroup()
    },
    components: {},
    methods: {
        initDictGroup() {
            // 初始化集合地点数组
            // 活动类型
            getDictGroup('PLACE_AND_TIME').then(res => {
                if (res.code === 100) {
                    this.placeAndTimeGroup = res.data
                    console.log(this.placeAndTimeGroup)
                } else {
                    $Message({
                        content: res.msg,
                        type: 'error'
                    })
                }
            })
        },
        changeFlowOne(e) {
            console.log(e)
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
.vertail{
    vertical-align: middle;
    display: inline;
}
</style>


