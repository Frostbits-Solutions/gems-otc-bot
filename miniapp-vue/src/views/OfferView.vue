<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useTradingPairsStore } from '@/stores/tradingPairs'
import { useUrlManager } from '@/utils/urlManager'
import type { TradingPair } from '@/models/crypto'
import SwapPairContainer from '@/components/swap/SwapPairContainer.vue'
import AppFooter from '@/components/navigation/AppFooter.vue'

const tradingPair = ref<TradingPair | null>(null)
const previousValidPair = ref<TradingPair | null>(null)
const loading = ref(true)
const tradingPairsStore = useTradingPairsStore()
const { getQueryParams, updateQueryParams } = useUrlManager()

const loadPairFromUrl = async () => {
  if (tradingPairsStore.pairs.length === 0) {
    await tradingPairsStore.fetchPairs()
  }

  const { baseId, quoteId } = getQueryParams()

  if (baseId !== null && quoteId !== null) {
    const pair = tradingPairsStore.findPair(baseId, quoteId)
    if (pair) {
      tradingPair.value = pair
      previousValidPair.value = pair
      loading.value = false
      return
    }
  }

  // Fallback Logic
  if (previousValidPair.value) {
    // Revert to previous valid pair
    tradingPair.value = previousValidPair.value
    updateQueryParams(tradingPair.value.base_asset.asa_id, tradingPair.value.quote_asset.asa_id)
  } else if (tradingPairsStore.pairs.length > 0) {
    // Revert to first available pair
    tradingPair.value = tradingPairsStore.pairs[0]!
    previousValidPair.value = tradingPair.value
    updateQueryParams(tradingPair.value.base_asset.asa_id, tradingPair.value.quote_asset.asa_id)
  }

  loading.value = false
}

const handleSwapAssets = () => {
  if (!tradingPair.value) return

  const newBaseId = tradingPair.value.quote_asset.asa_id
  const newQuoteId = tradingPair.value.base_asset.asa_id

  updateQueryParams(newBaseId, newQuoteId)
  loadPairFromUrl()
}

onMounted(loadPairFromUrl)

// Watch for URL changes (e.g., when clicking back/forward or swap)
watch(
  () => getQueryParams(),
  () => {
    loadPairFromUrl()
  },
  { deep: true },
)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-app-bg text-white p-4">
    <!-- Content -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-brand-primary animate-spin" />
    </div>

    <div v-else-if="tradingPair" class="flex flex-col gap-4">
      <SwapPairContainer :pair="tradingPair" @swap-assets="handleSwapAssets" />
    </div>

    <div v-else class="text-center text-gray-500 mt-10">Pair not found</div>

    <!-- App Footer -->
    <AppFooter :showGoBack="true" />
  </div>
</template>
