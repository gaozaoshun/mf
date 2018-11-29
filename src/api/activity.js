import $http from '@/utils/fetch'
<<<<<<< HEAD

// 发起活动
=======
import { $Message } from '~/iview/base/index'

// 发布活动
>>>>>>> 71169d603d1cc079a2622898a6c75303ef1ae805
export const publishActivity = activity => {
    let appoint = []
    activity.tags.forEach(element => {
        appoint.push(element.name)
    })
    activity.appoint = appoint
    return new Promise((resolve, reject) => {
        $http.request({
            url: 'activity/insert',
            method: 'post',
            body: activity
        }).then(res => {
            resolve(res)
        })
    })
}
<<<<<<< HEAD

// 活动列表
export const getActivityList = ({ city, coordinate, num, page, sheetType, type }) => {
    return new Promise(resolve => {
        $http.request({
            url: 'activity/list',
            method: 'post',
            body: { city, coordinate, num, page, sheetType, type }
        }).then(res => {
            resolve(res)
        })
    })
}

// 活动详情
export const getActivityDetail = (id) => {
    return new Promise(resolve => {
        $http.request({
            url: `activity/id/${id}`,
            method: 'get'
        }).then(res => {
            resolve(res)
=======
/**
 * 获取活动列表
 * @param {address,pageNum,pageNum} 
 */
export const getActivityList = ({ address, pageNum, pageSize }) => {
    return new Promise((resolve, reject) => {
        $http.request({
            url: 'activity/list',
            method: 'get',
            body: { address, pageNum, pageSize }
        }).then(res => {
            if (res.code === 100) {
                resolve(res.data)
            } else {
                $Message({
                    type: 'error',
                    content: res.msg
                })
            }
>>>>>>> 71169d603d1cc079a2622898a6c75303ef1ae805
        })
    })
}