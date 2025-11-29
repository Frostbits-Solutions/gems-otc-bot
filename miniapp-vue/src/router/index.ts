import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DevTelegramView from '../views/DevTelegramView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dev-telegram',
      name: 'dev-telegram',
      component: DevTelegramView,
    },
  ],
})

export default router
