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
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminHomeView.vue')
    }
  ],
})

export default router
