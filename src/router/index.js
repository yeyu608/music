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
    component: Home
  },
  {
    path: '/palyMv',
    name: 'PalyMv',
    component: () => import('../views/PlayMv.vue')
  },
  {
    path: "/Search",
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: "/playMusic",
    name: 'playMusic',
    component: () => import('../views/playMusic.vue')
  },
  {
    path: "/store",
    name: 'store',
    component: () => import('../views/store1.vue')
  },
  {
    path: "/index",
    name: 'index',
    component: () => import('../views/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
