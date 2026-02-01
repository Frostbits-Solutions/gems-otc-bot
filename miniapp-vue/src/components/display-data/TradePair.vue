<script setup lang="ts">
import { computed } from 'vue'
import type { TradingPair } from '@/models/crypto'
import { getTradingPairSymbol } from '@/models/crypto'
import CryptoIconPair from './CryptoIconPair.vue'

const props = withDefaults(
  defineProps<{
    pair: TradingPair
    selectable?: boolean
    selected?: boolean
  }>(),
  {
    selectable: false,
    selected: false,
  },
)

const emit = defineEmits<{
  select: []
}>()

const handleClick = () => {
  if (props.selectable) {
    emit('select')
  }
}

const symbol = computed(() => getTradingPairSymbol(props.pair))

const formatPrice = computed(() => {
  return props.pair.current_price.toLocaleString('en-US', {
    maximumSignificantDigits: 8,
    useGrouping: false,
  })
})

const formatVolume = computed(() => {
  const vol = props.pair.daily_volume
  if (vol >= 1000000) return `$${(vol / 1000000).toFixed(1)}M`
  if (vol >= 1000) return `$${(vol / 1000).toFixed(1)}K`
  return `$${vol.toFixed(0)}`
})
</script>

<template>
  <div
    class="flex items-center gap-4 w-full p-4 rounded-2xl transition-all duration-300 bg-white/5 ring-1 max-w-[calc(100%-1rem)] mx-2 overflow-hidden"
    :class="{
      'cursor-pointer': selectable,
      'hover:shadow-lg': selectable,
      'hover:shadow-purple-500/30': selectable,
      'hover:ring-purple-500/50': selectable,
      'ring-purple-500': selected,
      'shadow-xl': selected,
      'shadow-purple-500/40': selected,
      'ring-white/10': !selected,
    }"
    @click="handleClick"
  >
    <CryptoIconPair
      :baseTicker="pair.base_asset.ticker"
      :quoteTicker="pair.quote_asset.ticker"
      size="small"
    />

    <div class="flex items-center flex-shrink-0 w-[90px] ml-1">
      <span class="text-sm font-bold text-gray-100">{{ pair.base_asset.ticker }}</span>
      <span class="text-xs text-gray-500 mx-1 font-medium">/</span>
      <span class="text-xs text-gray-400 font-medium">{{ pair.quote_asset.ticker }}</span>
    </div>

    <div class="font-mono text-sm flex-1 min-w-0 text-right">
      {{ formatPrice }}
    </div>

    <div class="text-sm font-medium text-gray-300 flex-shrink-0 w-[70px] text-right">
      {{ formatVolume }}
    </div>

    <div class="text-xs font-semibold text-gray-400 flex-shrink-0 w-[30px] text-right">
      {{ pair.listing_count }}
    </div>
  </div>
</template>
