import { defineNuxtPlugin } from '#app'
import { useTelegramStore } from '~/stores/telegram'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const telegramStore = useTelegramStore()
    if (telegramStore.tg) {
      telegramStore.tg.ready()
    }
  })
})
