import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style/common.css' // 项目执行公共的样式
import store from 'vuex'

// 按需引入vant
// 原始代码
import './plugins/index.js' // 在Vue注册组件
import './style/common1.less'
import './style/icon.css'

Vue.config.productionTip = false,
Vue.mixin({
  beforeRouteLeave(to, from, next) {
    if (!from.meta.keepAlive) {
      this.$destroy(true);
    }
    next();
  },
});

new Vue({
  router,
  store,// 作用：我们就可以在所有的.vue文件中通过this.$store获取仓库
  render: h => h(App)
}).$mount('#app')
