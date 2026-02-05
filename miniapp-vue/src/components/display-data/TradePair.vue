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
    mode?: 'inlined' | 'header'
    fullWidth?: boolean
  }>(),
  {
    selectable: false,
    selected: false,
    mode: 'inlined',
    fullWidth: false,
  },
)

const emit = defineEmits<{
  select: []
  swap: []
}>()

const handleClick = () => {
  if (props.selectable) {
    emit('select')
  }
}

const symbol = computed(() => getTradingPairSymbol(props.pair))

const formatPrice = computed(() => {
  if (props.pair.current_price === null) return '—'
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
  <!-- Header Mode -->
  <div
    v-if="mode === 'header'"
    class="flex flex-col gap-4 w-full p-4 rounded-2xl bg-white/5 border border-white/10"
  >
    <div class="flex justify-between items-center">
      <div class="grid grid-cols-[auto_auto_auto] items-center gap-5">
        <CryptoIconPair
          :baseTicker="pair.base_asset.ticker"
          :quoteTicker="pair.quote_asset.ticker"
          size="small"
        />

        <div class="flex items-baseline gap-1">
          <span class="text-lg font-bold text-white">{{ pair.base_asset.ticker }}</span>
          <span class="text-xs font-medium text-gray-500">/</span>
          <span class="text-sm font-medium text-gray-400">{{ pair.quote_asset.ticker }}</span>
        </div>

        <div class="p-[1px] rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary">
          <UButton
            icon="i-heroicons-arrows-right-left"
            color="neutral"
            size="xs"
            class="bg-[#121212] text-white hover:bg-gray-900 border-none rounded-[7px]"
            @click="emit('swap')"
          />
        </div>
      </div>

      <!-- Optional: Add a small status or time if needed, currently empty to keep it clean -->
    </div>

    <div class="grid grid-cols-3 gap-3">
      <div class="flex flex-col gap-0.5">
        <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Price</span>
        <span class="text-base font-mono font-bold text-brand-primary">
          {{ formatPrice }}
        </span>
      </div>

      <div class="flex flex-col gap-0.5">
        <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider"
          >Volume (24h)</span
        >
        <span class="text-base font-bold text-gray-200">
          {{ formatVolume }}
        </span>
      </div>

      <div class="flex flex-col gap-0.5">
        <span class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Listings</span>
        <span class="text-base font-bold text-gray-200">
          {{ pair.listing_count }}
        </span>
      </div>
    </div>
  </div>

  <!-- Inlined Mode (Default) -->
  <div
    v-else
    class="flex items-center gap-4 w-full p-4 rounded-2xl transition-all duration-300 bg-white/5 ring-1 overflow-hidden"
    :class="{
      'cursor-pointer': selectable,
      'hover:shadow-lg': selectable,
      'hover:shadow-purple-500/30': selectable,
      'hover:ring-purple-500/50': selectable,
      'ring-white/10': !selected,
      '!ring-brand-primary shadow-xl shadow-brand-primary/20': selected,
      'max-w-[calc(100%-1rem)] mx-2': !fullWidth,
    }"
    @click="handleClick"
  >
    <CryptoIconPair
      :baseTicker="pair.base_asset.ticker"
      :quoteTicker="pair.quote_asset.ticker"
      size="small"
    />

    <div class="flex items-center flex-shrink-0 w-[80px] ml-1">
      <span class="text-sm font-bold text-gray-100">{{ pair.base_asset.ticker }}</span>
      <span class="text-xs text-gray-500 mx-1 font-medium">/</span>
      <span class="text-xs text-gray-400 font-medium">{{ pair.quote_asset.ticker }}</span>
    </div>

    <div
      class="font-mono text-sm flex-1 min-w-0 text-right overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {{ formatPrice }}
    </div>

    <div class="text-sm font-medium text-gray-300 flex-shrink-0 w-[85px] text-right">
      {{ formatVolume }}
    </div>

    <div class="text-xs font-semibold text-gray-400 flex-shrink-0 w-[25px] text-right">
      {{ pair.listing_count }}
    </div>
  </div>
</template>
