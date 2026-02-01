<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { TradingPair } from '@/models/crypto'
import SwapAssetContainer from './SwapAssetContainer.vue'

interface Props {
  pair: TradingPair
}

const props = defineProps<Props>()

// State
const payAmount = ref('')
const receiveAmount = ref('')

// Simple Price Calculation
const updateReceive = () => {
  const pay = parseFloat(payAmount.value)
  if (!isNaN(pay) && props.pair.current_price) {
    receiveAmount.value = (pay * props.pair.current_price).toFixed(6)
  } else {
    receiveAmount.value = ''
  }
}

const updatePay = () => {
  const receive = parseFloat(receiveAmount.value)
  if (!isNaN(receive) && props.pair.current_price) {
    payAmount.value = (receive / props.pair.current_price).toFixed(6)
  } else {
    payAmount.value = ''
  }
}

// Check if both amounts are valid
const isValidOrder = computed(() => {
  const pay = parseFloat(payAmount.value)
  const receive = parseFloat(receiveAmount.value)
  return !isNaN(pay) && pay > 0 && !isNaN(receive) && receive > 0
})
</script>

<template>
  <div class="flex flex-col gap-0 w-full max-w-md mx-auto">
    <!-- Receive Container -->
    <SwapAssetContainer
      :asset="pair.quote_asset"
      v-model:amount="receiveAmount"
      label="Selling"
      @update:amount="updatePay"
      class="rounded-b-none border-b-0 !border-brand-secondary"
    />
    <!-- Pay Container -->
    <SwapAssetContainer
      :asset="pair.base_asset"
      v-model:amount="payAmount"
      label="Buying"
      @update:amount="updateReceive"
      class="rounded-t-none !border-brand-primary"
    />

    <!-- Price Info -->
    <div class="flex justify-between items-center px-4 py-3 text-sm font-medium text-gray-400">
      <span class="flex items-center gap-1">
        <UIcon name="i-heroicons-information-circle" class="w-4 h-4" />
        1 {{ pair.base_asset.ticker }} = {{ pair.current_price }} {{ pair.quote_asset.ticker }}
      </span>
    </div>

    <!-- Action Button with Smooth Rotating Gradient -->
    <div
      class="mt-2 relative p-[2px] rounded-xl overflow-hidden"
      :class="isValidOrder ? '' : 'bg-gray-700/50 border border-gray-600'"
    >
      <!-- Gradient animation only shows when order is valid -->
      <div
        v-if="isValidOrder"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500%] aspect-square animate-[spin_1s_linear_infinite]"
        style="
          background: conic-gradient(
            from 0deg,
            var(--color-brand-primary),
            var(--color-brand-secondary),
            var(--color-brand-primary)
          );
        "
      ></div>
      <UButton
        block
        size="xl"
        :disabled="!isValidOrder"
        color="neutral"
        class="relative z-10 w-full h-full text-white font-bold rounded-[10px] transition-all"
        :class="isValidOrder ? 'bg-app-bg hover:bg-app-bg/90' : 'bg-gray-700'"
      >
        Place Order
      </UButton>
    </div>
  </div>
</template>
