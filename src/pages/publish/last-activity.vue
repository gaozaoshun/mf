<template>
    <div class="wrapper">
        <div class="last-title">
            <i class="iconfont  mf-xieyixiangqing last-title-icon"></i>
            <span class="last-title-info">我发布的聚会，流程预览</span>
        </div>
        <!-- 聚会亮点 -->
        <div class="light">
            <div class="last-light-title">
                <div class="light-center">
                    <i class="iconfont mf-liangdian last-light-icon"></i>
                    <span class="last-light-info">聚会亮点</span>
                </div>
            </div>
            <div class="light-content">
                <span class="spot">{{lastActivity.brightSpot}}</span>
            </div>
        </div>
        <!-- 聚会流程 -->
        <div class="flow">
            <div class="last-light-title">
                <div class="light-center">
                    <i class="iconfont mf-shalou last-light-icon"></i>
                    <span class="last-light-info">聚会流程</span>
                </div>
            </div>
            <div class="flow-content">
                <i-steps direction="vertical">
                    <i-step v-for='(item,index) in lastActivity.activityFlow' :key="index">
                        <div slot="title">
                            {{item}}
                        </div>
                    </i-step>
                </i-steps>
            </div>
        </div>
        <!-- 推荐 -->
        <div class="recommend">
            <div>
                <span class="recommend-title">希望闪六军推荐一下我的活动</span>
                <i class="iconfont mf-yiwenshuoming recommend-icon"></i>
            </div>
            <div>
                <i-switch :value="isRecommend" @change="recommend" i-class='switch-recommend'></i-switch>
            </div>
        </div>
        <!-- 发布 -->
        <i-button @click="publish" type="warning" shape="circle" size="small">发 布</i-button>
        <!-- 上一步 -->
        <i-button @click="lastStep" type="ghost" shape="circle" size="small">上一步</i-button>
        <i-modal title="提示" :visible="showModal" @ok="submitPublish" @cancel="cancelPublish" ok-text="确认发布" cancel-text="返回修改">
            <div style="padding:0 20rpx">
                作为发起者，须确保该活动真实且有效；若发起后出现爽约行为，将暂时终止您的使用权限，并视您的解释理由进行是否解封的处理。
            </div>
        </i-modal>
    </div>
</template>
<script>
import { publishActivity } from '@/api/activity'
import { $Message, $Toast } from '~/iview/base/index'
export default {
    data() {
        return {
            isRecommend: true,
            showModal: false
        }
    },
    computed: {
        lastActivity() {
            return this.$store.state.publishActivity
        }
    },
    methods: {
        cancelPublish() {
            this.showModal = false
        },
        submitPublish() {
            publishActivity(this.lastActivity).then(res => {
                this.showModal = false
                if (res.code === 100) {
                    $Message({
                        type: 'success',
                        content: '成功发布，待审核。。。'
                    })
                } else {
                    $Message({
                        type: 'error',
                        content: res.msg
                    })

                }

            })
        },
        recommend(res) {
            this.isRecommend = !this.isRecommend
        },
        lastStep() {
            this.$emit('lastStep', this.lastActivity)
        },
        publish() {
            this.showModal = true

        }
    }
}
</script>
<style>
.last-title {
  color: #ff9900;
  margin: 40rpx 30rpx;
  text-align: center;
  padding-bottom: 30rpx;
  border-bottom: 2rpx solid rgba(0, 0, 0, 0.3);
}
.last-title-icon {
  font-size: 40rpx;
  vertical-align: middle;
  margin-right: 10rpx;
}
.last-title-info {
  vertical-align: middle;
  font-size: 30rpx;
  color: #000;
}
.last-light-title {
  font-size: 50rpx;
  color: #ff9900;
  width: 690rpx;
  height: 100rpx;
  padding: 0 30rpx;
  display: flex;
  justify-content: space-between;
  background: #fff;
}
.last-light-icon {
  font-size: 38rpx;
  margin-right: 10rpx;
  vertical-align: middle;
}
.last-light-info {
  font-size: 30rpx;
  margin-right: 10rpx;
  vertical-align: middle;
}
.last-light-tip {
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
.spot {
  font-size: 28rpx;
  color: #333;
}
.light-content {
  padding: 0 40rpx;
}
.recommend {
  display: flex;
  justify-content: space-around;
  padding: 30rpx 0;
  border-top: 1rpx solid rgba(0, 0, 0, 0.03);
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.03);
}
.recommend-icon {
  color: #ff9900;
  font-size: 30rpx;
}
.recommend-title {
  color: #333;
  font-size: 30rpx;
  padding-right: 10rpx;
}
.switch-recommend {
  background-color: #ff9900 !important;
  border-color: #ff9900 !important;
}
</style>

