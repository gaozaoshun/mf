import $http from '@/utils/fetch'

// 经纬度转具体地址
export const getLocationInfo = ({ latitude, longitude }) => {
    return new Promise((reslove, reject) => {
        $http.request({
            url: 'https://restapi.amap.com/v3/geocode/regeo',
            method: 'get',
            body: {
                key: '8726875733c4e19eefb61af34b10b5a7',
                location: `${longitude},${latitude}`
            }
        }).then(res => {
            reslove(res)
        })
    })
}

// 获取广告位列表
export const getAdList = () => {
    return new Promise(reslove => {
        $http.request({
            url: ''
        })
    })
}

// 获取字典组
export const getDictGroup = groupKey => {
    return new Promise((reslove, reject) => {
        $http.request({
            url: 'dictList',
            method: 'post',
            body: {
                groupKey
            }
        }).then(res => {
            reslove(res)
        })
    })
}