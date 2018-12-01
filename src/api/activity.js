import $http from '@/utils/fetch'

// 发起活动
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
        })
    })
}