<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchMockTradingPairs } from '@/data/mockTradingPairs'
import type { TradingPair } from '@/models/crypto'
import SwapPairContainer from '@/components/swap/SwapPairContainer.vue'

const router = useRouter()
const tradingPair = ref<TradingPair | null>(null)
const loading = ref(true)

onMounted(async () => {
  // Simulate loading default pair
  const pairs = await fetchMockTradingPairs(500)
  // Default to first pair for now (e.g., goBTC/ALGO)
  if (pairs.length > 0) {
    tradingPair.value = pairs[0]!
  }
  loading.value = false
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-app-bg text-white p-4">
    <!-- Header -->
    <div class="flex items-center mb-6">
      <button @click="goBack" class="p-2 rounded-full hover:bg-white/10 transition-colors">
        <UIcon name="i-heroicons-arrow-left" class="w-6 h-6 text-gray-400" />
      </button>
      <h1 class="flex-1 text-center font-bold text-lg">Create Offer</h1>
      <div class="w-10"></div>
      <!-- Spacer for centering -->
    </div>

    <!-- Content -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-brand-primary animate-spin" />
    </div>

    <div v-else-if="tradingPair" class="flex-1 flex flex-col justify-center pb-20">
      <SwapPairContainer :pair="tradingPair" />
    </div>

    <div v-else class="text-center text-gray-500 mt-10">Pair not found</div>
  </div>
</template>
