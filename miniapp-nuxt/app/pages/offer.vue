<script setup lang="ts">
import type { TradingPair } from "@/models/crypto";

const telegramStore = useTelegramStore();
const tradingPair = ref<TradingPair | null>(null);
const previousValidPair = ref<TradingPair | null>(null);
const loading = ref(true);
const tradingPairsStore = useTradingPairsStore();
const { getQueryParams, updateQueryParams } = useUrlManager();

const loadPairFromUrl = async () => {
  if (tradingPairsStore.pairs.length === 0) {
    await tradingPairsStore.fetchPairs();
  }

  const { baseId, quoteId } = getQueryParams();

  if (baseId !== null && quoteId !== null) {
    const pair = tradingPairsStore.findPair(baseId, quoteId);
    if (pair) {
      tradingPair.value = pair;
      previousValidPair.value = pair;
      loading.value = false;
      return;
    }
  }

  // Fallback Logic
  if (previousValidPair.value) {
    // Revert to previous valid pair
    tradingPair.value = previousValidPair.value;
    updateQueryParams(
      tradingPair.value.base_asset.asa_id,
      tradingPair.value.quote_asset.asa_id,
    );
  } else if (tradingPairsStore.pairs.length > 0) {
    // Revert to first available pair
    tradingPair.value = tradingPairsStore.pairs[0]!;
    previousValidPair.value = tradingPair.value;
    updateQueryParams(
      tradingPair.value.base_asset.asa_id,
      tradingPair.value.quote_asset.asa_id,
    );
  }

  loading.value = false;
};

const handleSwapAssets = () => {
  if (!tradingPair.value) return;

  const newBaseId = tradingPair.value.quote_asset.asa_id;
  const newQuoteId = tradingPair.value.base_asset.asa_id;

  updateQueryParams(newBaseId, newQuoteId);
  loadPairFromUrl();
};

onMounted(loadPairFromUrl);

// Watch for URL changes (e.g., when clicking back/forward or swap)
watch(
  () => getQueryParams(),
  () => {
    loadPairFromUrl();
  },
  { deep: true },
);
</script>

<template>
  <div
    class="relative flex flex-col bg-app-bg text-white overflow-hidden min-h-screen"
    :style="{ height: (telegramStore.viewportHeight || 600) + 'px' }"
  >
    <!-- Main Content (Scrollable) -->
    <div class="flex-1 overflow-y-auto p-4 pb-24">
      <div
        v-if="loading"
        class="flex-1 flex items-center justify-center h-full"
      >
        <UIcon
          name="i-heroicons-arrow-path"
          class="w-8 h-8 text-brand-primary animate-spin"
        />
      </div>

      <div v-else-if="tradingPair" class="flex flex-col gap-4">
        <SwapPairContainer
          :pair="tradingPair"
          @swap-assets="handleSwapAssets"
        />
      </div>

      <div v-else class="text-center text-gray-500 mt-10">Pair not found</div>
    </div>

    <!-- App Footer -->
    <NavigationAppFooter :showGoBack="true" />
  </div>
</template>
