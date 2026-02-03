import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TradingPair, AlgorandAsset } from '@/models/crypto'
import { fetchMockTradingPairs } from '@/data/mockTradingPairs'

export const useTradingPairsStore = defineStore('tradingPairs', () => {
  // State
  const pairs = ref<TradingPair[]>([])
  const currencies = ref<AlgorandAsset[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed: Get number of unique currencies
  const currencyCount = computed(() => currencies.value.length)

  // Computed: Get number of trading pairs
  const pairCount = computed(() => pairs.value.length)

  /**
   * Extract unique currencies from trading pairs (internal helper)
   * @param tradingPairs - Array of trading pairs
   * @returns Sorted array of unique AlgorandAssets
   */
  function extractUniqueCurrencies(tradingPairs: TradingPair[]): AlgorandAsset[] {
    const assetMap = new Map<number, AlgorandAsset>()

    tradingPairs.forEach((pair) => {
      // Add base asset (keyed by ASA ID to avoid duplicates)
      if (!assetMap.has(pair.base_asset.asa_id)) {
        assetMap.set(pair.base_asset.asa_id, pair.base_asset)
      }

      // Add quote asset
      if (!assetMap.has(pair.quote_asset.asa_id)) {
        assetMap.set(pair.quote_asset.asa_id, pair.quote_asset)
      }
    })

    // Convert map to array and sort by ticker
    return Array.from(assetMap.values()).sort((a, b) => a.ticker.localeCompare(b.ticker))
  }

  /**
   * Fetch trading pairs from API (currently using mock data)
   * Automatically extracts unique currencies once after fetch
   */
  async function fetchPairs(): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const data = await fetchMockTradingPairs()
      pairs.value = data
      // Extract currencies once, not on every access
      currencies.value = extractUniqueCurrencies(data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch trading pairs'
      console.error('Error fetching trading pairs:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get a specific currency by ASA ID
   * @param asaId - Algorand Standard Asset ID
   * @returns AlgorandAsset or undefined if not found
   */
  function getCurrencyByAsaId(asaId: number): AlgorandAsset | undefined {
    return currencies.value.find((asset) => asset.asa_id === asaId)
  }

  /**
   * Get a specific currency by ticker
   * @param ticker - Currency ticker (e.g., "ALGO", "ETH")
   * @returns AlgorandAsset or undefined if not found
   */
  function getCurrencyByTicker(ticker: string): AlgorandAsset | undefined {
    return currencies.value.find((asset) => asset.ticker === ticker)
  }

  /**
   * Get all pairs for a specific currency
   * @param asaId - Algorand Standard Asset ID
   * @returns Array of trading pairs where the currency is base or quote
   */
  function getPairsForCurrency(asaId: number): TradingPair[] {
    return pairs.value.filter(
      (pair) => pair.base_asset.asa_id === asaId || pair.quote_asset.asa_id === asaId
    )
  }

  /**
   * Find a specific trading pair by base and quote ASA IDs
   * @param baseAsaId - Base asset ASA ID
   * @param quoteAsaId - Quote asset ASA ID
   * @returns TradingPair or undefined if not found
   */
  function findPair(baseAsaId: number, quoteAsaId: number): TradingPair | undefined {
    // 1. Try to find the exact pair
    const exactPair = pairs.value.find(
      (pair) => pair.base_asset.asa_id === baseAsaId && pair.quote_asset.asa_id === quoteAsaId
    )
    if (exactPair) return exactPair

    // 2. Fallback: check if the inverse pair exists
    const inversePair = pairs.value.find(
      (pair) => pair.base_asset.asa_id === quoteAsaId && pair.quote_asset.asa_id === baseAsaId
    )

    if (inversePair) {
      // Create a default pair with null ratio and 0 listings
      const baseAsset = getCurrencyByAsaId(baseAsaId)
      const quoteAsset = getCurrencyByAsaId(quoteAsaId)

      if (baseAsset && quoteAsset) {
        return {
          base_asset: baseAsset,
          quote_asset: quoteAsset,
          current_price: null,
          listing_count: 0,
          daily_volume: 0
        }
      }
    }

    return undefined
  }

  return {
    // State
    pairs,
    loading,
    error,

    // Computed
    currencies,
    currencyCount,
    pairCount,

    // Actions
    fetchPairs,
    getCurrencyByAsaId,
    getCurrencyByTicker,
    getPairsForCurrency,
    findPair
  }
})
