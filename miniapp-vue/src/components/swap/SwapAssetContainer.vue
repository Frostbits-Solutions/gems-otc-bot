<script setup lang="ts">
import { computed } from 'vue'
import type { AlgorandAsset } from '@/models/crypto'
import { getCryptoIconAsync } from '@/utils/cryptoIcons'
import { ref, watch, onMounted } from 'vue'

interface Props {
  asset: AlgorandAsset
  amount: number | string
  label?: string
  balance?: number
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  amount: '',
  label: 'Amount',
  balance: 0,
  readonly: false,
})

const emit = defineEmits<{
  (e: 'update:amount', value: string): void
}>()

const iconUrl = ref('')

const loadIcon = async () => {
  iconUrl.value = await getCryptoIconAsync(props.asset.ticker)
}

onMounted(loadIcon)
watch(() => props.asset.ticker, loadIcon)

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value
  // Remove any letters/characters, keep only digits and decimal point
  const filtered = value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1')
  input.value = filtered
  emit('update:amount', filtered)
}
</script>

<template>
  <div class="bg-white/5 rounded-2xl p-4 border border-white/15 flex flex-col gap-3">
    <!-- Header: Label and Balance -->
    <div class="flex justify-between text-xs font-medium text-gray-400">
      <span>{{ label }}</span>
      <span v-if="balance > 0">Balance: {{ balance }}</span>
    </div>

    <div class="flex items-center gap-3">
      <!-- Input Field -->
      <input
        type="text"
        inputmode="decimal"
        :value="amount"
        @input="handleInput"
        :readonly="readonly"
        placeholder="0.0"
        class="bg-transparent text-3xl font-bold text-white placeholder-gray-600 outline-none w-full min-w-0"
      />

      <!-- Asset Pill -->
      <div
        class="flex items-center gap-2 bg-black/20 rounded-full px-3 py-1.5 flex-shrink-0 border border-white/5"
      >
        <img v-if="iconUrl" :src="iconUrl" :alt="asset.ticker" class="w-6 h-6 rounded-full" />
        <div v-else class="w-6 h-6 rounded-full bg-gray-700 animate-pulse" />
        <span class="font-bold text-white uppercase">{{ asset.ticker }}</span>
      </div>
    </div>

    <!-- USD Value (Mock) -->
    <div class="text-sm text-gray-500 font-medium">
      USD ${{ (Number(amount || 0) * 1).toFixed(2) }}
    </div>
  </div>
</template>
