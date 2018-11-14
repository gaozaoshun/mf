<template>
    <div class="wrapper">
        <picker mode="region"
                @change="chooseCity">
            <div class="item bg"><i class="iconfont mf-zuobiao"></i><span class="vertial zb">{{city}}</span><i class="iconfont mf-down"></i></div>
        </picker>
        <div class="item"
             v-for='(item,index) in tabs'
             :key='index'>
            <span class="vertial"
                  @click='changeTab(item)'
                  :class='{"tab-bg":item.isTab}'>{{item.name}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {

    },
    computed: {
        city() {
            return this.$store.state.address.addStr ? this.$store.state.address.addStr : '全国'
        }
    },
    data() {
        return {
            tabs: [
                {
                    name: '最快开启',
                    isTab: true
                },
                {
                    name: '离我最近',
                    isTab: false
                },
                {
                    name: '参与人数',
                    isTab: false
                },
            ]
        }
    },
    created() {

    },
    methods: {
        // 选择城市
        chooseCity(e) {
            let address = {
                addStr: e.target.value[1],
                citycode: e.target.code[1]
            }
            this.$store.dispatch('setAddress', address)
            this.$emit('changeCity',address)
        },
        // 切换Tab
        changeTab(curItem) {
            this.tabs.map(item => {
                if (curItem.name === item.name) {
                    item.isTab = true
                } else {
                    item.isTab = false
                }
            })
            this.$emit('changeTab', curItem)
        }
    }
}
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 710rpx;
  height: 50rpx;
  padding: 10rpx 20rpx;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
  line-height: 50rpx;
  font-size: 25rpx;
}
.vertial {
  vertical-align: top;
  padding-left: 5rpx;
}
.bg {
  width: 120rpx;
  background: #ff9900;
  border-radius: 15rpx;
  padding: 0 10rpx;
  color: #fff;
}
.zb {
  display: inline-block;
  width: 48rpx;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
}
.tab-bg {
  color: #ff9900;
  font-weight: bolder;
}
</style>

