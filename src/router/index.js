import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)



const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      keepAlive: false
    }
  },
  {
    path: '/palyMv',
    name: 'PalyMv',
    component: () => import('../views/PlayMv.vue'),
    meta:{
      keepAlive: true
    }
  },
  {
    path: "/Search",
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta:{
      keepAlive: false
    }
  },
  {
    path: "/playMusic",
    name: 'playMusic',
    component: () => import('../views/playMusic.vue'),
    meta:{
      keepAlive: true
    }
  },
  {
    path: "/store",
    name: 'store',
    component: () => import('../views/store1.vue'),
    meta:{
      keepAlive: false
    }
  },
  {
    path: "/index",
    name: 'index',
    component: () => import('../views/index.vue'),
    meta:{
      keepAlive: false
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
