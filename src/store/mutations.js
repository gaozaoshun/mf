import * as types from './mutationTypes'

export default {
    [types.SET_USER_INFO](state, userInfo) {
        state.userInfo = userInfo
    },
    [types.SET_ADDRESS](state, address) {
        state.address = address
    },
    [types.SET_ISLOGIN](state,isLogin){
        state.isLogin = isLogin
    },
    [types.SET_ACTIVITY_ADDRESS](state,address){
        state.activityAddress = address
    }
}