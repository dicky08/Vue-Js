import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Foods from '../views/Foods.vue'
import FoodOrder from '../views/FoodOrder.vue'
import History from '../views/History.vue'
import DetailHistory from '../views/DetailHistory.vue'
// import FoodOrders from '../views/FoodOrders.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/foods',
    name: 'Foods',
    component: Foods
  },
  {
    path: '/food_order/:id',
    name: 'FoodOrder',
    component: FoodOrder
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/DetailHistory',
    name: 'DetailHistory',
    component: DetailHistory
  },
  // {
  //   path: '/food_orders',
  //   name: 'FoodOrders',
  //   component: FoodOrders
  // },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
