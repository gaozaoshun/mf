// 格式化日期
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    // 遍历这个对象
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
        }
    }
    return fmt
}
// 判断当前时间是否为今天
export function isToday(date) {
    let startTime = date.getTime()
    // 今晚12点分隔时间点
    let currentTime = new Date(formatDate(new Date(), 'yyyy/MM/dd') + ' 23:59:59').getTime
    if (currentTime - startTime > 0) {
        return true
    }
    return false
}
// 判断当前时间是否为明天
export function isTomorrow(date) {
    let startTime = date.getTime()
    let currentDate = new Date()
    let currentTime = new Date(formatDate(currentDate, 'yyyy/MM/dd') + ' 23:59:59')
    let tomorrowTime = new Date(formatDate(new Date(currentDate.setDate(currentDate.getDate() + 1)), 'yyyy/MM/dd') + ' 23:59:59')
    if (currentTime - startTime < 0 && tomorrowTime - startTime > 0) {
        return true
    }
    return false
}
// 判断当前时间是否为今年
export function isThisYear(date) {
    let curYear = new Date().getFullYear()
    let year = date.getFullYear()
    if (curYear === year) {
        return true
    }
    return false
}
// 计算周几
const dayList = ['一', '二', '三', '四', '五', '六', '日']
export function toDayStr(date) {
    let day = date.getDay()
    return `周${dayList[day - 1]}`
}
// 现在距离指定时间还有多久
export function parseToNow(date) {
    let startTime = new Date(Date.parse(date.replace(/-/g, '/')))
    let currentTime = new Date().getTime()
    let distance = startTime.getTime() - currentTime
    // 时间差：毫秒
    if (distance > 0) {
        let hours = distance / (1000 * 60 * 60)
        // 一个小时内
        if (hours < 1) {
            return '1小时内'
            // 1小时以上，且是今天的
        } else if (hours >= 1 && isToday(startTime)) {
            return `${Math.floor(hours)}小时后`
            // 1小时以上，且是明天的
        } else if (hours >= 1 && isTomorrow(startTime)) {
            return '明天'
            // 1小时以上，且是今年的
        } else if (hours >= 1 && isThisYear(startTime)) {
            return `${formatDate(startTime, 'MM-dd')} ${toDayStr(startTime)}`
            // 超过一年的直接输出日期
        } else {
            return `${startTime.getFullYear()}-${startTime.getMonth() + 1}-${startTime.getDate()}`
        }
    } else {
        // 过期活动
        return '1小时内'
    }
}
function standardTime(timeStr) {
    return timeStr.replace(/-/g, ',')
}
// 日期比较
export const compare = (date1, date2) => {
    if (typeof date1 === 'string') {
        date1 = new Date(standardTime(date1))
    }
    if (typeof date2 === 'string') {
        date2 = new Date(standardTime(date2))
    }
    if (date1 > date2) {
        return 1
    } else if (date1 < date2) {
        return -1
    } else {
        return 0
    }
}
// 相差的秒数
export const computedSeconds = (date1, date2) => {
    if (typeof date1 === 'string') {
        date1 = new Date(standardTime(date1))
    }
    if (typeof date2 === 'string') {
        date2 = new Date(standardTime(date2))
    }
    console.log(Math.floor((date1.getTime() - date2.getTime()) / 1000))
    return Math.floor((date1.getTime() - date2.getTime()) / 1000)
}

