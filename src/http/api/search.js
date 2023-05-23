import service from '../index'

// 搜索

// 热门搜索
export function hotSearch(url, params) {
    return new Promise((resolve, reject) => {
        service.get(url, { params }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}