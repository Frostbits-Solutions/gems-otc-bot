<script setup lang="ts">
import { useTelegramStore } from '../stores/telegram'
import { useRouter } from 'vue-router'
import AppLogo from '../components/AppLogo.vue'
import TradingPairsList from '../components/TradingPairsList.vue'
import SearchBar from '../components/search/SearchBar.vue'

const telegramStore = useTelegramStore()
const user = telegramStore.initDataUnsafe?.user
const router = useRouter()

const goToDevView = () => {
  router.push('/dev-telegram')
}
</script>

<template>
  <div
    class="min-h-screen max-h-[644px] flex flex-col bg-[var(--tg-theme-bg-color,#1a1b26)] text-[var(--tg-theme-text-color,#ffffff)] overflow-y-auto px-5 py-6"
  >
    <!-- Dev Banner -->
    <div
      v-if="!user"
      class="fixed top-2 left-2 bg-black/20 px-2 py-1 rounded text-[10px] text-gray-400 z-10"
    >
      DEV
    </div>

    <!-- Header -->
    <div class="flex-shrink-0 text-center flex flex-col items-center mb-4">
      <AppLogo />
      <p class="text-sm text-[var(--tg-theme-hint-color,#9ca3af)] font-medium mt-2">
        {{ user ? `Welcome ${user.first_name}!` : 'Simple Crypto Payments' }}
      </p>
    </div>

    <!-- Trading Pairs List -->
    <TradingPairsList />

    <!-- Search Bar -->
    <div class="fixed bottom-2.5 left-1/2 -translate-x-1/2 z-10">
      <SearchBar />
    </div>

    <!-- Dev Button -->
    <button
      @click="goToDevView"
      class="fixed bottom-2.5 left-2.5 px-2 py-1.5 bg-white/8 text-[var(--tg-theme-hint-color,#9ca3af)] border border-white/15 rounded-full cursor-pointer text-[10px] opacity-50 transition-all duration-300 hover:opacity-100 hover:bg-white/15 backdrop-blur-[10px]"
    >
      🔧 TG View
    </button>

    <!-- App Info -->
    <div
      class="fixed bottom-2.5 right-5 text-[11px] text-[var(--tg-theme-hint-color,#6b7280)] opacity-70"
      v-if="telegramStore.tg"
    >
      <span>v{{ telegramStore.version }} • {{ telegramStore.platform }}</span>
    </div>
  </div>
</template>
