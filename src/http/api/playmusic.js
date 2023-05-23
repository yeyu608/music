import service from '../index'

// 获取歌词
export function Getlyric(url, params) {
    return new Promise((resolve, reject) => {
        service.get(url, { params }).then(res => resolve(res)).catch(err => reject(err))
    })
}
// 获取音乐信息
export function Getlmusicdata(url, params) {
    return new Promise((resolve, reject) => {
        service.get(url, { params }).then(res => resolve(res)).catch(err => reject(err))
    })
}
// 获取音乐url
export function GetSongUrl(url, params) {
    return new Promise((resolve, reject) => {
        service.get(url, { params }).then(res => resolve(res)).catch(err => reject(err))
        })
}