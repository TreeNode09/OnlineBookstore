import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/reader',
      name: 'reader',
      component: () => import('@/views/ReaderHomeView.vue')
    },
    {
      path: '/bookBrowse',
      name: 'bookBrowse',
      component: () => import('@/views/BookBrowse.vue')
    },
    {
      path: '/bookCart',
      name: 'bookCart',
      component: () => import('@/views/BookCart.vue')
    },
    {
      path: '/orderSucceed',
      name: 'orderSucceed',
      component: () => import('@/views/OrderSucceed.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminHomeView.vue')
    },
    {
      path: '/bookManage',
      name: 'bookManage',
      component: () => import('@/views/BookManage.vue')
    },
    {
      path: '/outOfStock',
      name: 'outOfStock',
      component: () => import('@/views/OutOfStock.vue')
    },
    {
      path: '/addOutOfStock',
      name: 'addOutOfStock',
      component: () => import('@/views/AddOutOfStock.vue')
    },
    {
      path: '/purchaseList',
      name: 'purchaseList',
      component: () => import('@/views/PurchaseList.vue')
    }
  ],
})

export default router
