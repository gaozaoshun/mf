import * as types from './mutationTypes'

export default {
    [types.SET_USER_INFO](state, userInfo) {
        state.userInfo = userInfo
    },
    [types.SET_ADDRESS](state, regeocodes) {
        let address = regeocodes.addressComponent
        // 直辖市处理
        regeocodes.addStr = address.city && address.city.length ? address.city : address.province
        console.log(address)
        state.address = regeocodes
    },
    [types.SET_ISLOGIN](state,isLogin){
        state.isLogin = isLogin
    }
}