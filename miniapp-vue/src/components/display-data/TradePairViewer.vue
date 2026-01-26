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

const formatVolume = computed(() => {
  const vol = props.pair.daily_volume
  if (vol >= 1000000) return `$${(vol / 1000000).toFixed(1)}M`
  if (vol >= 1000) return `$${(vol / 1000).toFixed(1)}K`
  return `$${vol.toFixed(0)}`
})
</script>

<template>
  <div
    class="flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-300 bg-white/5 ring-1 max-w-full overflow-hidden"
    :class="{
      'cursor-pointer': selectable,
      'hover:shadow-lg': selectable,
      'hover:shadow-purple-500/30': selectable,
      'hover:ring-purple-500/50': selectable,
      'ring-purple-500': selected,
      'shadow-lg': selected,
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

    <div class="font-bold text-sm flex-shrink-0 w-[75px] truncate ml-1">
      {{ symbol }}
    </div>

    <div class="font-mono text-xs flex-1 min-w-0 truncate text-center">
      {{ pair.current_price.toFixed(6) }}
    </div>

    <div class="text-xs text-gray-400 flex-shrink-0 text-right">
      {{ formatVolume }}
    </div>

    <div class="text-xs text-gray-400 flex-shrink-0 text-right">{{ pair.listing_count }} DEX</div>
  </div>
</template>
