// 1、引入
import axios from 'axios'
// 2、创建axios实例http://www.codeman.ink:3000/
let service = axios.create({
    baseURL:'http://www.codeman.ink:3000/',//服务器的根地址
    timeout: 6000
});


// 3、创建请求拦截
service.interceptors.request.use(
    // 请求拦截成功
    config => {
        return config
    },
    // 请求拦截失败
    err => {
        return Promise.reject(err)
    }
)

// 4、响应拦截
service.interceptors.response.use(
    // 响应拦截成功
    response => {
        return response
    },
    // 响应拦截失败
    err => {
        return Promise.reject(err)
    }
)

export default service