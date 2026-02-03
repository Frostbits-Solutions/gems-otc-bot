<script setup lang="ts">
import { useTelegramStore } from '../stores/telegram'
import { useRouter } from 'vue-router'
import AppLogo from '../components/AppLogo.vue'
import TradingPairsList from '../components/TradingPairsList.vue'
import SearchBar from '../components/search/SearchBar.vue'
import AppFooter from '../components/navigation/AppFooter.vue'

const telegramStore = useTelegramStore()
const user = telegramStore.initDataUnsafe?.user
const router = useRouter()

const goToDevView = () => {
  router.push('/dev-telegram')
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-app-bg text-[var(--tg-theme-text-color,#ffffff)] overflow-y-auto pb-24"
  >
    <!-- Dev Banner -->
    <div
      v-if="!user"
      class="fixed top-2 left-2 bg-black/20 px-2 py-1 rounded text-[10px] text-gray-400 z-10"
    >
      DEV
    </div>

    <!-- Header -->
    <div class="flex-shrink-0 text-center flex flex-col items-center px-5">
      <AppLogo />
    </div>

    <!-- Trading Pairs List -->
    <p class="text-center text-sm text-[var(--tg-theme-hint-color,#9ca3af)] font-medium mt-2">
      {{ user ? `Welcome ${user.first_name}!` : 'Simple Crypto Payments' }}
    </p>
    <TradingPairsList />

    <!-- Search Bar -->
    <!-- <div
      class="fixed bottom-[max(env(safe-area-inset-bottom),1.5rem)] left-1/2 -translate-x-1/2 z-10 w-[240px]"
    >
      <SearchBar />
    </div> -->

    <!-- Dev Button: Telegram -->
    <button
      @click="goToDevView"
      class="fixed top-4 left-4 px-4 py-2.5 bg-white/8 text-[var(--tg-theme-hint-color,#9ca3af)] border border-white/15 rounded-full cursor-pointer text-xs opacity-70 transition-all duration-300 hover:opacity-100 hover:bg-white/15 backdrop-blur-[10px] flex items-center gap-2 z-20"
    >
      🔧 <span class="hidden sm:inline">Settings</span>
    </button>

    <!-- App Footer -->
    <AppFooter :showGoBack="false" />
  </div>
</template>
