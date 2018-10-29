import Fly from 'flyio/dist/npm/wx'

const fly = new Fly()

const baseUrl = process.env.NODE_ENV === 'development'
    // 开发环境
    ? 'http://127.0.0.1:9999/api/v1'
    // 线上环境
    : 'http://www.hanbook.top/api/v1'

// 添加请求拦截器
fly.interceptors.request.use(request => {
    wx.showLoading({
        title: '加载中', //提示的内容,
        mask: true, //显示透明蒙层，防止触摸穿透,
    })
    // 请求头
    request.header = {
        'X-Tag': 'flyio',
        'content-type': 'application/json'
    }
    // 公共请求参数
    let authParams = {
        'timestamp': new Date().getTime()
    }
    request.body && Object.keys(request.body).forEach((val) => {
        if (request.body[val] === '') {
            delete request.body[val]
        };
    })
    request.body = {
        ...request.body,
        ...authParams
    }
    return request

})
// 添加响应拦截器
fly.interceptors.response.use(
    (response) => {
        wx.hideLoading()
        return response.data // 请求成功之后将返回值返回
    },
    (err) => {
        // 请求出错，根据返回状态码判断出错原因
        console.log(err)
        wx.hideLoading()
        if (err) {
            return '请求失败'
        };
    }
)

fly.config.baseURL = baseUrl

export default fly
