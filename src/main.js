import Vue from 'vue'
import App from './App'
import fly from './utils/fetch'
import store from './store'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$http = fly
Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()
