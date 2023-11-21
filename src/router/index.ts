import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },{
      path: '/member',
      name: 'member',
      component: () => import('../views/MemberView.vue')
    },{
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },{
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },{
      path: '/purchase/:pid',
      name: 'purchase',
      component: () => import('../views/PurchaseView.vue')
    },{
      path: '/newebpay/:result',
      name: 'newebpay',
      component: () => import('../views/NewbepayView.vue')
    }
  ]
})

export default router
