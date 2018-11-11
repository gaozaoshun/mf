import $http from '@/utils/fetch'
import { resolve } from 'upath';

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