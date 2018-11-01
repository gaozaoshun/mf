import $http from '@/utils/fetch'

export function login(body) {
    return new Promise((resolve, reject) => {
        $http.request({
            url: 'login',
            method: 'post',
            body
        }).then(res => {
            resolve(res)
        })
    })
}