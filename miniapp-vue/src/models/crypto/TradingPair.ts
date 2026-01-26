import type { AlgorandAsset } from './AlgorandAsset'

/**
 * Represents an Algorand trading pair (e.g., ETH/ALGO)
 * Format: BASE/QUOTE where you buy BASE with QUOTE
 */
export interface TradingPair {
  /**
   * Base asset - the asset being purchased (e.g., ETH in ETH/ALGO)
   */
  base_asset: AlgorandAsset

  /**
   * Quote asset - the asset used for payment (e.g., ALGO in ETH/ALGO)
   */
  quote_asset: AlgorandAsset

  /**
   * Current market price - lowest available ratio of base/quote
   * High precision decimal value (e.g., 0.000123456789)
   */
  current_price: number

  /**
   * 24-hour trading volume for this pair (in quote asset units)
   */
  daily_volume: number

  /**
   * Number of Algorand listings for this trading pair
   */
  listing_count: number
}

/**
 * Get the trading pair symbol in BASE/QUOTE format
 * @param pair - Trading pair
 * @returns Symbol string (e.g., "ETH/ALGO")
 */
export function getTradingPairSymbol(pair: TradingPair): string {
  return `${pair.base_asset.ticker}/${pair.quote_asset.ticker}`
}
