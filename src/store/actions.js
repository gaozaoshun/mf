import * as types from './mutationTypes'

export const setUserInfo = ({ commit }, userInfo) => {
    commit(types.SET_USER_INFO, userInfo)
}