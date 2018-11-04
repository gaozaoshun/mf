import Vue from 'vue'
import App from './App'
import fly from './utils/fetch'
import store from './store'
// 引入阿里图标字体文件
import '../static/iconfont/iconfont.css'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$http = fly
Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()
