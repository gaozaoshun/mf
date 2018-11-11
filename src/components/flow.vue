<template>
    <div class="wrapper">
        <div v-if="step===1">
            <i class="iconfont mf-choiceO start-icon"></i>
            <div class="block"></div>
        </div>
        <div v-else>
            <div class="block"></div>
        </div>
        <div class="box">
            <div class="title-wrapper">
                <i class="iconfont step-icon" :class="stepIcon"></i>
                <span class="title">{{title}}</span>
            </div>
            <div class="content-wrapper">
                <div v-for="(item,index) in list" :key="index" style='line-height:70rpx;' @click="chooseItem(item)" :class="{'selected-item':item.selected}">
                    <i class="iconfont mf-radio radio-icon" :class="{'selected-icon':item.selected}"></i>
                    <span class="item-info" :class="{'selected-item':item.selected}" v-if="item.key!=='DIY'"> {{item.name}}</span>
                    <input type="textarea" :model='diy' @change='changeDiy' :placeholder="item.name" v-if="item.key==='DIY'" class="item-info input-diy" :class="{'selected-item':item.selected}">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        step: {
            type: Number,
            default: 1
        },
        title: {
            type: String,
            default: '标题'
        },
        content: {
            type: Array
        }
    },
    computed: {
        activity() {
            return this.$store.state.publishActivity
        },
        stepIcon() {
            return `mf-${this.step}`
        },
        list() {
            let list = JSON.parse(JSON.stringify(this.content))
            return list.map(item => {
                item.name = item.name.replace('%TIME%', '10~30')
                    .replace('%ADDRESS%', this.activity.address)
                    .replace('%TITLE%', this.activity.title)
                    .replace('%TEXT%', '______')
                return item
            })
        }
    },
    data() {
        return {
            diy: ''
        }
    },
    created() {

    },
    methods: {
        chooseItem(curItem) {
            this.content = this.content.map(item => {
                if (item.key === curItem.key) {
                    item.selected = true
                } else {
                    item.selected = false
                }
                return item
            })
            // 自定义
            if (curItem.key === 'DIY') {
                console.log('diy', this.diy)
                this.$emit('chooseItem', this.diy)
                return
            }
            console.log(curItem.name)
            this.$emit('chooseItem', curItem.name)
        },
        changeDiy(e) {
            this.diy = e.target.value
        }
    }
}
</script>
<style scoped>
.start-icon {
  font-size: 40rpx;
  color: #ff9900;
  margin-left: 20rpx;
}
.box {
  width: 705rpx;
  border: 1rpx solid rgba(0, 0, 0, 0.05);
  border-radius: 15rpx;
  box-shadow: 3rpx 3rpx 3rpx rgba(0, 0, 0, 0.05) inset,
    -3rpx -3rpx 3rpx rgba(0, 0, 0, 0.05) inset;
}
.block {
  height: 15rpx;
  border-left: 10rpx solid rgba(0, 0, 0, 0.05);
  margin-left: 36rpx;
}
.title-wrapper {
  padding: 20rpx;
}
.step-icon {
  font-size: 40rpx;
  color: #ff9900;
  vertical-align: middle;
}
.title {
  font-size: 30rpx;
  vertical-align: middle;
  color: #888;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 90rpx;
  margin-right: 50rpx;
  border-top: 4rpx solid rgba(0, 0, 0, 0.05);
}
.radio-icon {
  font-size: 35rpx;
  vertical-align: middle;
  color: rgba(0, 0, 0, 0.5);
}
.item-info {
  font-size: 30rpx;
  color: #888;
  vertical-align: middle;
}
.selected-item {
   color: #ff9900;
}
.selected-icon {
  color: #ff9900;
}
.input-diy {
  display: inline-block;
  width: 520rpx;
  padding-left: 10rpx;
}
</style>


