// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  ssr: true, // As requested for crypto state server-rendering
  css: ['~/assets/main.css'],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  devtools: { enabled: true }
})


