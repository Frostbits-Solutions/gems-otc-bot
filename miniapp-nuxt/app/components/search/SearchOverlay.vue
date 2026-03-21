<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTradingPairsStore } from '@/stores/tradingPairs'
import type { TradingPair } from '@/models/crypto'
import SearchInput from './SearchInput.vue'
import SearchResults from './SearchResults.vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const store = useTradingPairsStore()
const searchQuery = ref('')

const filteredPairs = computed(() => {
  if (!searchQuery.value) return store.pairs.slice(0, 8)
  const query = searchQuery.value.toLowerCase()
  return store.pairs.filter(
    (pair) =>
      pair.base_asset.ticker.toLowerCase().includes(query) ||
      pair.quote_asset.ticker.toLowerCase().includes(query) ||
      pair.base_asset.name.toLowerCase().includes(query) ||
      pair.quote_asset.name.toLowerCase().includes(query),
  )
})

const handleSelect = (pair: TradingPair) => {
  emit('close')
  router.push({
    path: '/offer',
    query: {
      baseId: pair.base_asset.asa_id.toString(),
      quoteId: pair.quote_asset.asa_id.toString(),
    },
  })
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-full"
    enter-to-class="translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0"
    leave-to-class="translate-y-full"
  >
    <div
      v-if="open"
      class="absolute inset-0 z-[60] bg-black/95 flex flex-col pt-[env(safe-area-inset-top,0px)]"
    >
      <SearchInput v-model="searchQuery" @close="emit('close')" />
      <SearchResults :pairs="filteredPairs" :loading="store.loading" @select="handleSelect" />
    </div>
  </Transition>
</template>

<style scoped>
.translate-y-full {
  transform: translateY(100%);
}
.translate-y-0 {
  transform: translateY(0);
}
</style>
