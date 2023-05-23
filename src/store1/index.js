//1、引入Vue和vuex
import Vue from 'vue';
import Vuex from 'vuex';

// 2、注册vuex => 所有的插件 => Vue.use()注册
Vue.use(Vuex)

// 3、创建仓库
let store = new Vuex.Store({
    // 注意这个对象的属性 => 4个 => 核心模块(属性)
    // 属性1：state => 存放仓库数据 => 相当于Vue中的data()
    // 特性：state中的数据具有响应式=> 视图中使用的这个数据会对应改变
    state: {
        age: 30
    },
    getters: {
        // 用法
        // 1、有语义化定义
        // 2、这个方法的参数；第一个参数 就是 state(必须)放数据
        bortherAge(state) {
            return state.age + 5
        },
        sAge(state) {
            return state.age + 10
        },
        // 根据用户 使用情况动态传递参数
        getFat(state) {
            return (data) => {
                return state.age + data
            }
        }
    },
    // 属性3 修改数据=> mutations
    // 作用：修改state中的数据 注意：写同步的方法
    // 用法和Vue中的methods一样
    mutations: {
        changeAge(state, data) {// 注意参数 第一个参数：就是state(就是仓库)
            state.age = state.age + 1
        }
    },
    // 属性4：actions
    // 作用：修改数据(state)但是他是可以写异步的
    // 修改数据执行机制
    // 1、触发actions中定义的方法 => 在通过commit触发Mutations中定义方法=> 去修改state中的数据
    actions: {
        // 1、注意actions中定义的方法 和mutations中的方法同名
        // 2、这个方法的参数:第一个参数store对象
        changeAge(store) { // 异步
            setTimeout(() => {
                // 业务发送一个请求(异步),请求完成获取到数据
                store.commit('changeAge')
            }, 2000)
        },
        /* ayychangeAge({ commit }, data) {
            setTimeout({
                commit('changeAge')
            }, 2000)
        } */
    }
})
// 4、将store暴露出去 => 添加到根实例中做一个属性
export default store