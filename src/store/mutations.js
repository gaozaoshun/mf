import * as types from './mutationTypes'

export default {
    [types.SET_USER_INFO](state, userInfo) {
        state.userInfo = userInfo
    }
}