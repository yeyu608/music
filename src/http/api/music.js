import service from '../index' //axios


// 推荐音乐

export function RecommendMusic(url,params) {
    return new Promise((resolve, reject) => {
        // 这里就是你发送的网络请求
        service.get(url, {
            params
        }).then(res => { // 成功
            // 成功获取到请求数据
            resolve(res)
        }).catch(err => { // 失败
            reject(err)
        })
    })
}

// 调用
// RecommendMusic(url,参数).then(res => 数据})