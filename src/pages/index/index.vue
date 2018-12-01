<template>
  <scroll-view
    scroll-y
    @scrolltolower='loadMore'
    class="wrapper"
  >
    <!-- 广告位 -->
    <swiper
      class='swiper'
      :indicator-dots='adConfig.indicatorDots'
      :indicator-color='adConfig.indicatorColor'
      :indicator-active-color='adConfig.indicatorActiveColor'
      :autoplay='adConfig.autoplay'
      :interval='adConfig.interval'
      :duration='adConfig.duration'
      :circular='adConfig.circular'
    >
      <div
        v-for="(item,index) in adList"
        :key='index'
        @click='toPath(item.path)'
      >
        <swiper-item>
          <img
            :src="item.cover"
            class='swiper-img'
          />
        </swiper-item>
      </div>
    </swiper>
    <!-- 筛选Tabs -->
    <tab
      @tab='tab'
      :isLoad='isLoadList'
    ></tab>
    <!-- 通告栏 -->
    <i-notice-bar
      icon="systemprompt"
      color="#ff9900"
      loop
      closable
    >
      所有聚会满6人即组队成功，并会有聚会短信通知;
    </i-notice-bar>
    <!-- 活动列表 -->
    <div
      v-for="item in activityList"
      :key="index"
      class="activity"
    >
      <activity-card
        :activity='item'
        @toDetail='toActivityDetail'
      ></activity-card>
    </div>
    <i-load-more
      :tip="loadingTip"
      :loading="loading"
    />
    <!-- 全局提醒 -->
    <i-message id="message" />
  </scroll-view>
</template>

<script>
import { login } from "@/api/login"
import { getActivityList } from "@/api/activity"
import { getLocationInfo, getDictGroup } from "@/api/common"
import { getCurrentRoute, toAbsPath } from '@/utils/route'
import tab from '@/components/tab'
import activityCard from '@/components/activity-card'
import { $Message, $Toast } from '~/iview/base/index'

export default {
  components: { tab, activityCard },
  data() {
    return {
      loading: true,
      isLoadList: false,
      isfinish: false,
      adConfig: {
        indicatorDots: true,//是否显示面板指示点
        indicatorColor: 'rgba(0, 0, 0, .3)',//指示点颜色
        indicatorActiveColor: '#ff9900',//当前选中的指示点颜色
        autoplay: true,//是否自动切换
        interval: 5000,//自动切换时间间隔
        duration: 500,//滑动动画时长
        circular: true,//是否采用衔接滑动
      },
      adList: [
        {
          cover: 'http://img5.imgtn.bdimg.com/it/u=547447817,3063273168&fm=200&gp=0.jpg',
          path: 'pages/lading/main'
        },
        {
          cover: 'http://img5.imgtn.bdimg.com/it/u=1644077758,3194768429&fm=200&gp=0.jpg',
          path: 'pages/lading/main'
        },
        {
          cover: 'http://img2.imgtn.bdimg.com/it/u=4157914768,1711257344&fm=200&gp=0.jpg',
          path: 'pages/lading/main'
        }

      ],
      activityList: [],
      tabName: '',
      pageSize: 10,
      pageNum: 1,
      pageCount: 10,
      isLast: false,
      requestParams: {}
    }
  },
  watch: {
    isLogin() {
      // 1.加载当前位置
      this.getLocation()
    }
  },
  computed: {
    loadingTip() {
      return this.loading ? 'loading' : 'ending'
    },
    userInfo() {
      return this.$store.state.userInfo
    },
    address() {
      return this.$store.state.address
    },
    isLogin() {
      return this.$store.state.isLogin
    },
    activityCoverMap() {
      return this.$store.state.activityCoverMap
    }
  },
  methods: {
    // 跳转到活动详情页
    toActivityDetail(detail) {
      wx.navigateTo({
        url: `/pages/activityDetail/main?id=${detail.id}`
      })
    },
    // 下拉加载
    loadMore() {
      this.loadList()
    },
    loadList() {
      // 是否到底
      if (this.pageCount === this.activityList.length) {
        return
      }
      // 显示加载动画
      this.loading = true
      getActivityList(this.requestParams).then(res => {
        if (res.code === 100) {
          this.requestParams.page++
          this.pageCount = res.data.total
          let activity = res.data.cdata.map(item => {
            item.cover = this.activityCoverMap[item.type]
            return item
          })
          this.activityList = this.activityList.concat(activity)
          this.loading = false
        }
      })
    },
    // 获取活动列表
    tab(tabItem) {
      this.initDictGroup()
      // 切换Tab初始化
      if (this.tabName != tabItem.name) {
        this.pageNum = 1
        this.tabName = tabItem.name
        this.activityList = []
      }
      // 初始化页码
      tabItem.page = this.pageNum
      tabItem.num = this.pageSize
      this.requestParams = tabItem
      this.loadList()
    },
    // 加载字典组
    async initDictGroup() {
      let result = await getDictGroup('ACTIVITY_TYPE_COVER')
      let activityCoverMap = {}
      result.forEach(item => {
        activityCoverMap[item.key] = item.name
      })
      this.$store.dispatch('setActivityCoverMap', activityCoverMap)
    },
    // 跳转至落地页
    toPath(url) {
      wx.navigateTo({
        url: toAbsPath(url)
      })
    },
    // 登录操作
    login() {
      // 获取code
      wx.login({
        success: res => {
          // 此时微信端已生成session_key
          console.log("获临时凭证code", res.code)
          let code = res.code
          wx.getUserInfo({
            withCredentials: true,
            success: res => {
              // 登录请求参数
              let body = {
                rawData: res.rawData || "",
                signature: res.signature || "",
                encryptedData: res.encryptedData || "",
                iv: res.iv || "",
                code: code || ""
              }
              login(body).then(res => {
                if (res.code === 100) {
                  // 保存userInfo
                  this.$store.dispatch("setUserInfo", res.data)
                  // 保存Token
                  wx.setStorageSync("token", res.data.token || "")
                  // 地理位置授权
                  this.$store.dispatch('setIsLogin', true)
                } else {
                  wx.showToast({ title: "登录失败", icon: "none" })
                }
              })
            }
          })
        }
      })
    },
    // 获取当前地理位置
    getLocation() {
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success: res => {
                this.getLocationInfo()
              }
            })
          } else {
            this.getLocationInfo()
          }
        }
      })
    },
    // 获取地理位置并转成具体地址
    getLocationInfo() {
      wx.getLocation({
        type: 'wgs84',
        success: res => {
          const latitude = res.latitude
          const longitude = res.longitude
          // 经纬度转 具体地址
          getLocationInfo({ latitude, longitude }).then(res => {
            if (res.infocode === '10000') {
              let addressComponent = res.regeocode.addressComponent
              let address = {
                addStr: addressComponent.city && addressComponent.city.length ? addressComponent.city : addressComponent.province,
                citycode: addressComponent.citycode,
                location: addressComponent.streetNumber.location
              }
              this.$store.dispatch('setAddress', address)
              this.isLoadList = !this.isLoadList
            } else {
              wx.showToast({ title: '经纬度转换地名异常', icon: 'none' })
            }
          })
        },
        fail: () => {
          wx.showToast({
            title: '获取当前位置失败',
            icon: 'none'
          })
        }
      })
    },
    // 检查用户权限
    checkUserInfoAutho() {
      // 检查权限
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.userInfo']) {
            // 跳转到登录页面
            wx.navigateTo({ url: toAbsPath('pages/login/main') })
          } else {
            // 直接登录
            this.login()
          }
        }
      })
    },
    // 初始化广告位
    initAdList() {

    }
  },
  created() {
    // 检查用户权限
    this.checkUserInfoAutho()

    // 初始化广告位
    this.initAdList()
  }
};
</script>

<style scoped>
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 750rpx;
}
.swiper {
  width: 750rpx;
  height: 350rpx;
}
.swiper-img {
  width: 750rpx;
  height: 350rpx;
}
.activity {
  width: 750rpx;
  padding: 24rpx 24rpx 0 24rpx;
}
</style>
