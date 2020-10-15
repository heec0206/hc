import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
      title: 'index',
      metaTags: [{ name: 'description', content: 'index'}]
    }
  },
  {
    path: '/sub',
    name: 'sub',
    component: () => import(/* webpackChunkName: "sub" */ '../views/sub.vue'),
    meta: {
      title: 'sub',
      metaTags: [{ name: 'description', content: 'sub'}]
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
