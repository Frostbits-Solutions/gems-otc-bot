<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { TradingPair } from '@/models/crypto'
import SwapAssetContainer from './SwapAssetContainer.vue'
import TradePair from '@/components/display-data/TradePair.vue'

interface Props {
  pair: TradingPair
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'swap-assets'): void
}>()

// State
const payAmount = ref('')
const receiveAmount = ref('')
const isOverride = ref(props.pair.current_price === null)
const lastManualEntry = ref<'pay' | 'receive' | null>(null)

// Simple Price Calculation
const updateReceive = (val: string) => {
  if (lastManualEntry.value === 'receive') {
    isOverride.value = true
  }
  lastManualEntry.value = 'pay'

  if (!isOverride.value && props.pair.current_price !== null) {
    const pay = parseFloat(val)
    if (!isNaN(pay)) {
      receiveAmount.value = (pay * props.pair.current_price).toFixed(6)
    } else {
      receiveAmount.value = ''
    }
  }
}

const updatePay = (val: string) => {
  if (lastManualEntry.value === 'pay') {
    isOverride.value = true
  }
  lastManualEntry.value = 'receive'

  if (!isOverride.value && props.pair.current_price !== null) {
    const receive = parseFloat(val)
    if (!isNaN(receive)) {
      payAmount.value = (receive / props.pair.current_price).toFixed(6)
    } else {
      payAmount.value = ''
    }
  }
}

const resetToMarket = () => {
  if (props.pair.current_price !== null) {
    isOverride.value = false
    lastManualEntry.value = null
    // Trigger a re-sync
    updateReceive(payAmount.value)
  }
}

const manualRatio = computed(() => {
  const pay = parseFloat(payAmount.value)
  const receive = parseFloat(receiveAmount.value)
  if (!isNaN(pay) && pay > 0 && !isNaN(receive) && receive > 0) {
    return (receive / pay).toFixed(8)
  }
  return null
})
// Auto-reset override if both fields are cleared
watch([payAmount, receiveAmount], ([newPay, newReceive]) => {
  if (newPay === '' && newReceive === '' && props.pair.current_price !== null) {
    isOverride.value = false
    lastManualEntry.value = null
  }
})

// Check if both amounts are valid
const isValidOrder = computed(() => {
  const pay = parseFloat(payAmount.value)
  const receive = parseFloat(receiveAmount.value)
  return !isNaN(pay) && pay > 0 && !isNaN(receive) && receive > 0
})
</script>

<template>
  <div class="flex flex-col gap-4 w-full max-w-md mx-auto animate-fade-in">
    <!-- Trading Pair Header -->
    <TradePair :pair="pair" mode="header" @swap="emit('swap-assets')" />

    <div class="flex flex-col gap-0 shadow-sm overflow-hidden rounded-2xl border border-white/10">
      <!-- Receive Container -->
      <SwapAssetContainer
        :asset="pair.quote_asset"
        v-model:amount="receiveAmount"
        label="Selling"
        @update:amount="updatePay"
        class="rounded-b-none border-0 !bg-transparent"
      />

      <!-- Swap Button Overlay -->
      <!-- <div class="relative h-0 flex justify-center items-center z-20">
        <UButton
          icon="i-heroicons-arrows-up-down"
          size="sm"
          color="neutral"
          variant="solid"
          class="rounded-full w-8 h-8 flex items-center justify-center bg-gray-900 border border-white/10 text-white shadow-lg hover:scale-110 active:scale-95 transition-all -my-4"
          @click="emit('swap-assets')"
        />
      </div> -->

      <!-- Pay Container -->
      <SwapAssetContainer
        :asset="pair.base_asset"
        v-model:amount="payAmount"
        label="Buying"
        @update:amount="updateReceive"
        class="rounded-t-none border-t border-white/10 !bg-transparent"
      />
    </div>

    <!-- Reset to Market Button (Only when override is active and market rate exists) -->
    <div v-if="isOverride && pair.current_price !== null" class="flex justify-end px-1">
      <UButton
        variant="ghost"
        color="neutral"
        size="xs"
        class="text-brand-primary hover:text-brand-primary/80 h-auto py-0.5 px-0 text-[11px] font-bold transition-colors"
        @click="resetToMarket"
      >
        Reset to Market
      </UButton>
    </div>
    <!-- Action Button with Smooth Rotating Gradient -->
    <div
      class="mt-2 relative p-[2px] rounded-xl overflow-hidden transition-all duration-300"
      :class="isValidOrder ? '' : 'bg-neutral-950 border border-white/5 shadow-inner'"
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
        :class="[
          'relative z-10 w-full h-full text-white font-bold rounded-[10px] transition-all duration-300',
          isValidOrder
            ? 'bg-app-bg hover:bg-app-bg/90 shadow-lg'
            : 'bg-transparent text-gray-500 cursor-not-allowed opacity-60',
        ]"
      >
        Place Order
      </UButton>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
