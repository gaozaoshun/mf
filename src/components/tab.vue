<template>
    <div class="wrapper">
<<<<<<< HEAD
        <div class="item bg" @click="chooseCity"><i class="iconfont mf-zuobiao"></i><span class="vertial zb">{{city.addStr?city.addStr:'全国'}}</span><i class="iconfont mf-down"></i></div>
        <div class="item" v-for='(item,index) in tabs' :key="index" @click="tab(item)">
            <span class="vertial" :class="{'checked':item.checked}">{{item.name}}</span>
=======
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
>>>>>>> 71169d603d1cc079a2622898a6c75303ef1ae805
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
<<<<<<< HEAD
    watch: {
        isLoad() {
            let curItem = {
                sheetType:1,
                name:'最快开启'
            }
            curItem.city = this.city.addStr
            curItem.coordinate = this.city.location
            this.$emit('tab', curItem)
=======
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
>>>>>>> 71169d603d1cc079a2622898a6c75303ef1ae805
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 71169d603d1cc079a2622898a6c75303ef1ae805
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
<<<<<<< HEAD
.checked {
  color: #ff9900;
  font-weight: bolder;
}
=======
>>>>>>> 71169d603d1cc079a2622898a6c75303ef1ae805
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

