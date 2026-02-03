<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTradingPairsStore } from '@/stores/tradingPairs'
import TradePair from '@/components/display-data/TradePair.vue'
import type { TradingPair } from '@/models/crypto'

const props = withDefaults(
  defineProps<{
    maxItems?: number
    selectable?: boolean
  }>(),
  {
    maxItems: 3,
    selectable: true,
  },
)

const store = useTradingPairsStore()
const router = useRouter()

const displayedPairs = computed(() => {
  return store.pairs.slice(0, props.maxItems)
})

const getPairKey = (pair: TradingPair) => `${pair.base_asset.asa_id}-${pair.quote_asset.asa_id}`

const isSelected = (pair: TradingPair) => false

const handleSelect = (pair: TradingPair) => {
  router.push({
    path: '/offer',
    query: {
      baseId: pair.base_asset.asa_id.toString(),
      quoteId: pair.quote_asset.asa_id.toString(),
    },
  })
}

onMounted(async () => {
  if (store.pairCount === 0) {
    await store.fetchPairs()
  }
})
</script>

<template>
  <div class="flex flex-col flex-grow">
    <!-- Stats Header -->
    <div class="flex justify-center gap-6 mb-4">
      <span class="text-sm text-[var(--tg-theme-hint-color,#9ca3af)] font-medium">
        <strong
          class="text-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent font-bold mr-1"
          >{{ store.pairCount }}</strong
        >
        Pairs
      </span>
      <span class="text-sm text-[var(--tg-theme-hint-color,#9ca3af)] font-medium">
        <strong
          class="text-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-transparent font-bold mr-1"
          >{{ store.currencyCount }}</strong
        >
        Assets
      </span>
    </div>

    <!-- Loading State -->
    <div v-if="store.loading" class="flex flex-col items-center justify-center flex-grow py-8">
      <UIcon name="i-heroicons-arrow-path" class="w-10 h-10 text-[#667eea] animate-spin mb-3" />
      <p class="text-sm text-[var(--tg-theme-hint-color,#9ca3af)] font-medium">
        Loading trading pairs...
      </p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="store.error"
      class="flex flex-col items-center justify-center flex-grow py-8 text-center"
    >
      <p class="text-sm text-[var(--tg-theme-hint-color,#9ca3af)] font-medium mb-3">
        {{ store.error }}
      </p>
      <UButton
        @click="store.fetchPairs()"
        size="sm"
        class="bg-gradient-to-br from-[#667eea] to-[#764ba2] hover:shadow-lg hover:shadow-[#667eea]/40 transition-all duration-300"
      >
        Retry
      </UButton>
    </div>

    <!-- Trading Pairs List -->
    <div v-else class="flex flex-col gap-3 flex-grow items-center py-8 w-full">
      <!-- Column Headers -->
      <div
        class="flex items-center gap-4 w-full px-6 text-[11px] text-gray-500 uppercase tracking-wider mb-1"
      >
        <div class="w-[52px]"></div>
        <div class="w-[110px] ml-1">Pair</div>
        <div class="flex-1 text-right">Price</div>
        <div class="w-[70px] text-right">Vol</div>
        <div class="w-[50px] text-right">Count</div>
      </div>

      <TradePair
        v-for="(pair, index) in displayedPairs"
        :key="getPairKey(pair)"
        :pair="pair"
        :selectable="selectable"
        :selected="isSelected(pair)"
        class="trade-item-animate"
        :style="{ animationDelay: `${index * 100}ms` }"
        @select="handleSelect(pair)"
      />

      <!-- Empty State -->
      <div
        v-if="store.pairCount === 0"
        class="flex flex-col items-center justify-center flex-grow py-8"
      >
        <p class="text-sm text-[var(--tg-theme-hint-color,#9ca3af)] font-medium">
          No trading pairs available
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.trade-item-animate {
  animation: fade-in-up 0.4s ease-out forwards;
  opacity: 0;
}
</style>
