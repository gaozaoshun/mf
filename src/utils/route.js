export function getCurrentRoute() {
    let pages = getCurrentPages()
    if (pages && pages.length > 0) {
        let curPage = pages[pages.length - 1]
        return curPage.route
    }
    return ''
}

export function toAbsPath(path) {
    let curRoute = getCurrentRoute()
    let len = curRoute.split('/').length
    for (let i = 0; i < len - 1; i++) {
        path = `../${path}`
    }
    return path
}