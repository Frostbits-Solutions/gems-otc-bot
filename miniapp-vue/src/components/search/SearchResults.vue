<script setup lang="ts">
import { computed } from 'vue'
import type { TradingPair } from '@/models/crypto'
import TradePair from '@/components/display-data/TradePair.vue'

const props = defineProps<{
  pairs: TradingPair[]
  loading?: boolean
}>()

const emit = defineEmits<{
  select: [pair: TradingPair]
}>()

const getPairKey = (pair: TradingPair) => `${pair.base_asset.asa_id}-${pair.quote_asset.asa_id}`
</script>

<template>
  <div class="flex-1 overflow-y-auto pb-12">
    <!-- Sticky Column Headers -->
    <div
      v-if="!loading && pairs.length > 0"
      class="sticky top-0 z-10 flex items-center gap-4 w-full px-6 py-2 bg-black/80 backdrop-blur-md text-[10px] text-gray-500 uppercase tracking-wider border-b border-white/5"
    >
      <div class="w-[32px]"></div>
      <!-- Icon space -->
      <div class="w-[80px] ml-1">Pair</div>
      <div class="flex-1 text-right">Price</div>
      <div class="w-[85px] text-right">Volume</div>
      <div class="w-[25px] text-right">Lst</div>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-12 px-4 text-center">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-brand-primary animate-spin mb-2" />
      <p class="text-sm text-gray-400">Loading pairs...</p>
    </div>

    <div
      v-else-if="pairs.length === 0"
      class="flex flex-col items-center justify-center py-12 px-4 text-gray-500"
    >
      <p>No pairs found</p>
    </div>

    <div v-else class="flex flex-col divide-y divide-white/5">
      <TradePair
        v-for="pair in pairs"
        :key="getPairKey(pair)"
        :pair="pair"
        selectable
        mode="inlined"
        fullWidth
        class="!bg-transparent !ring-0 !rounded-none hover:!bg-white/5"
        @select="emit('select', pair)"
      />
    </div>
  </div>
</template>

<style scoped>
/* Add any specific virtual scroll styles if needed */
</style>
