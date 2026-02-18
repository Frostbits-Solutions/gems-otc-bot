<script setup lang="ts">
import { useTelegramStore } from '../stores/telegram'
import { useRouter } from 'vue-router'
import AppLogo from '../components/AppLogo.vue'
import TradingPairsList from '../components/TradingPairsList.vue'
import SearchOverlay from '../components/search/SearchOverlay.vue'
import AppFooter from '../components/navigation/AppFooter.vue'
import { ref } from 'vue'

const telegramStore = useTelegramStore()
const user = telegramStore.initDataUnsafe?.user
const router = useRouter()
const isSearchOpen = ref(false)

const goToDevView = () => {
  router.push('/dev-telegram')
}

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
}
</script>

<template>
  <div
    class="relative flex flex-col bg-app-bg text-[var(--tg-theme-text-color,#ffffff)] overflow-hidden"
    :style="{ height: telegramStore.viewportHeight + 'px' }"
  >
    <!-- Main Content (Scrollable) -->
    <div class="flex-1 overflow-y-auto pb-24">
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

      <!-- Dev Button: Telegram -->
      <button
        @click="goToDevView"
        class="fixed top-4 left-4 px-4 py-2.5 bg-white/8 text-[var(--tg-theme-hint-color,#9ca3af)] border border-white/15 rounded-full cursor-pointer text-xs opacity-70 transition-all duration-300 hover:opacity-100 hover:bg-white/15 backdrop-blur-[10px] flex items-center gap-2 z-20"
      >
        🔧 <span class="hidden sm:inline">Settings</span>
      </button>
    </div>

    <!-- App Footer -->
    <AppFooter :showGoBack="false" :showSearch="true" @search-click="toggleSearch" />

    <!-- Search Overlay -->
    <SearchOverlay :open="isSearchOpen" @close="isSearchOpen = false" />
  </div>
</template>
