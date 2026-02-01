<script setup lang="ts">
import { onMounted } from 'vue'
import { useTradingPairsStore } from '@/stores/tradingPairs'
import TradePair from '@/components/display-data/TradePair.vue'

const store = useTradingPairsStore()

onMounted(async () => {
  if (store.pairCount === 0) {
    await store.fetchPairs()
  }
})
</script>

<template>
  <div
    class="min-h-screen max-h-[644px] flex flex-col bg-[var(--tg-theme-bg-color,#1a1b26)] text-[var(--tg-theme-text-color,#ffffff)] overflow-y-auto px-5 py-8 md:px-4 md:py-5"
  >
    <!-- Header -->
    <header class="flex-shrink-0 text-center mb-8">
      <h1
        class="text-[2.8em] md:text-[2.2em] font-extrabold bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent tracking-tight leading-tight mb-5"
      >
        Trading Pairs
      </h1>
      <div class="flex justify-center gap-8 md:gap-6 mt-4">
        <span class="text-[0.95em] text-[var(--tg-theme-hint-color,#9ca3af)] font-medium">
          <strong
            class="text-[1.4em] bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent font-bold mr-1"
            >{{ store.pairCount }}</strong
          >
          Pairs
        </span>
        <span class="text-[0.95em] text-[var(--tg-theme-hint-color,#9ca3af)] font-medium">
          <strong
            class="text-[1.4em] bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent font-bold mr-1"
            >{{ store.currencyCount }}</strong
          >
          Assets
        </span>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="store.loading" class="flex flex-col items-center justify-center flex-grow py-16">
      <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 text-[#667eea] animate-spin mb-4" />
      <p class="text-lg text-[var(--tg-theme-hint-color,#9ca3af)] font-medium">
        Loading trading pairs...
      </p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="store.error"
      class="flex flex-col items-center justify-center flex-grow py-16 text-center"
    >
      <p class="text-lg text-[var(--tg-theme-hint-color,#9ca3af)] font-medium mb-4">
        {{ store.error }}
      </p>
      <UButton
        @click="store.fetchPairs()"
        size="lg"
        class="bg-gradient-to-br from-[#667eea] to-[#764ba2] hover:shadow-lg hover:shadow-[#667eea]/40 hover:-translate-y-0.5 transition-all duration-300"
      >
        Retry
      </UButton>
    </div>

    <!-- Trading Pairs List -->
    <div v-else class="flex flex-col gap-3 flex-grow pb-5">
      <UCard
        v-for="pair in store.pairs"
        :key="`${pair.base_asset.asa_id}-${pair.quote_asset.asa_id}`"
        class="hover:scale-[1.01] transition-transform cursor-pointer"
      >
        <TradePair :pair="pair" />
      </UCard>

      <!-- Empty State -->
      <div
        v-if="store.pairCount === 0"
        class="flex flex-col items-center justify-center flex-grow py-16"
      >
        <p class="text-lg text-[var(--tg-theme-hint-color,#9ca3af)] font-medium">
          No trading pairs available
        </p>
      </div>
    </div>
  </div>
</template>
