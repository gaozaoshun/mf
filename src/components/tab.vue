<template>
    <div class="wrapper">
        <div class="item bg" @click="chooseCity"><i class="iconfont mf-zuobiao"></i><span class="vertial zb">{{city.addStr?city.addStr:'全国'}}</span><i class="iconfont mf-down"></i></div>
        <div class="item" v-for='(item,index) in tabs' :key="index" @click="tab(item)">
            <span class="vertial" :class="{'checked':item.checked}">{{item.name}}</span>
        </div>
    </div>
</template>
<script>
import { getLocationInfo } from '@/api/common'
export default {
    props: {
        isLoad: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        city() {
            return this.$store.state.address
        }
    },
    watch: {
        isLoad() {
            let curItem = {
                sheetType:1,
                name:'最快开启'
            }
            curItem.city = this.city.addStr
            curItem.coordinate = this.city.location
            this.$emit('tab', curItem)
        }
    },
    data() {
        return {

            tabs: [
                {
                    sheetType: 1,
                    name: '最快开启',
                    checked: true
                },
                {
                    sheetType: 2,
                    name: '离我最近',
                    checked: false
                },
                {
                    sheetType: 3,
                    name: '参与人数',
                    checked: false
                }
            ]
        }
    },
    methods: {
        // 选择城市
        chooseCity(e) {
            wx.chooseLocation({
                success: res => {
                    let address = {
                        location: `${res.longitude},${res.latitude}`
                    }
                    getLocationInfo({ latitude: res.latitude, longitude: res.longitude }).then(res => {
                        if (res.status === '1') {
                            address.addStr = res.regeocode.addressComponent.city.length > 0 ? res.regeocode.addressComponent.city : res.regeocode.addressComponent.province
                            this.$store.dispatch('setAddress', address)
                        }
                    })
                }
            })
        },
        tab(curItem) {
            this.tabs.map(item => {
                if (item.name === curItem.name) {
                    item.checked = true
                } else {
                    item.checked = false
                }
            })
            curItem.city = this.city.addStr
            curItem.coordinate = this.city.location
            this.$emit('tab', curItem)
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
.checked {
  color: #ff9900;
  font-weight: bolder;
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

