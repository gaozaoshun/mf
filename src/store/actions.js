import * as types from './mutationTypes'

export const setUserInfo = ({ commit }, userInfo) => {
    commit(types.SET_USER_INFO, userInfo)
}

export const setAddress = ({ commit }, address) => {
    commit(types.SET_ADDRESS, address)
}

export const setIsLogin = ({ commit }, isLogin) => {
    commit(types.SET_ISLOGIN, isLogin)
}

export const setPublishActivity = ({ commit }, publishActivity) => {
    commit(types.SET_PUBLISH_ACTIVITY, publishActivity)
}
