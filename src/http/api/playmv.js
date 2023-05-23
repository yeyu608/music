import service from '../index'

// 获取mv url
export function getMvUrl(url,params) {
    return new Promise((resolve,reject) =>{
        service.get(url,{
            params
        }).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        })
    })
}

export function playDetail(url,params) {
    return new Promise((resolve,reject)=>{
        service.get(url,{
            params
        }).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        })
    })
}
export function relatedMv(url,params) {
    return new Promise((resolve,reject)=>{
        service.get(url,{
            params
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}
