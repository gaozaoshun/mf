import $http from '@/utils/fetch'
import { $Message } from '~/iview/base/index'

// 发布活动
export const publishActivity = activity => {
    let appoint = []
    activity.tags.forEach(element => {
        appoint.push(element.name)
    })
    activity.appoint = appoint
    console.log('activity', activity)
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
        })
    })
}