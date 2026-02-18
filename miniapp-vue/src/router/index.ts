import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DevTelegramView from '../views/DevTelegramView.vue'
import OfferView from '../views/OfferView.vue'

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
    {
      path: '/offer',
      name: 'offer',
      component: OfferView,
    },
  ],
})

export default router
