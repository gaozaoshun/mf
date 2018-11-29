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
    [types.SET_PUBLISH_ACTIVITY](state, publishActivity) {
        state.publishActivity = publishActivity
    },
    [types.SET_ACTIVITY_COVER_MAP](state, activityCoverMap) {
        state.activityCoverMap = activityCoverMap
    }
    
}