import type { TradingPair } from './TradingPair'

/**
 * Order status based on whether it matches existing offers or creates new demand
 */
export enum OrderStatus {
  /**
   * Buy state - can match existing offer immediately (price ratio >= market price)
   */
  BUY = 'BUY',

  /**
   * Demand state - creates new offer in order book, waiting for match (price ratio < market price)
   */
  DEMAND = 'DEMAND'
}

/**
 * Represents a user-defined limit order for a trading pair
 * Contains price ratio and amounts with computation utilities
 */
export class LimitOrder {
  /**
   * The trading pair this order is for
   */
  readonly pair: TradingPair

  /**
   * User's limit price ratio (base/quote)
   * High precision decimal value
   */
  price_ratio: number

  /**
   * Amount of base asset user wants to buy
   * Can have many decimal places, may be null if not set
   */
  base_amount: number | null

  /**
   * Amount of quote asset user is willing to spend
   * Can have many decimal places, may be null if not set
   */
  quote_amount: number | null

  /**
   * Order status - automatically computed based on price_ratio vs current_price
   */
  status: OrderStatus

  constructor(pair: TradingPair, priceRatio: number, baseAmount: number | null = null, quoteAmount: number | null = null) {
    this.pair = pair
    this.price_ratio = priceRatio
    this.base_amount = baseAmount
    this.quote_amount = quoteAmount
    this.status = this.computeStatus()
  }

  /**
   * Compute order status based on price ratio vs market price
   * @returns OrderStatus.BUY if ratio >= market price, otherwise DEMAND
   */
  private computeStatus(): OrderStatus {
    // default fallback if it's non existing pair
    if (this.pair.current_price === null) {
      return OrderStatus.DEMAND
    }

    return this.price_ratio >= this.pair.current_price ? OrderStatus.BUY : OrderStatus.DEMAND
  }

  /**
   * Update quote amount based on base amount and current market price
   * @param baseAmount - Amount of base asset to buy
   */
  updateQuoteFromBase(baseAmount: number): void {
    if (this.pair.current_price === null) {
      return
    }
    this.base_amount = baseAmount
    this.quote_amount = baseAmount * this.pair.current_price
    this.price_ratio = this.pair.current_price
    this.status = this.computeStatus()
  }

  /**
   * Update base amount based on quote amount and current market price
   * @param quoteAmount - Amount of quote asset to spend
   */
  updateBaseFromQuote(quoteAmount: number): void {
    if (this.pair.current_price === null) {
      return
    }
    this.quote_amount = quoteAmount
    this.base_amount = quoteAmount / this.pair.current_price
    this.price_ratio = this.pair.current_price
    this.status = this.computeStatus()
  }

  /**
   * Update price ratio from specified base and quote amounts
   * @param baseAmount - Base asset amount
   * @param quoteAmount - Quote asset amount
   */
  updateFromCustomAmounts(baseAmount: number, quoteAmount: number): void {
    if (baseAmount === 0) {
      throw new Error('Base amount cannot be zero')
    }
    this.base_amount = baseAmount
    this.quote_amount = quoteAmount
    this.price_ratio = quoteAmount / baseAmount
    this.status = this.computeStatus()
  }

  /**
   * Update price ratio and recalculate status
   * @param newRatio - New price ratio to set
   */
  updatePriceRatio(newRatio: number): void {
    this.price_ratio = newRatio
    this.status = this.computeStatus()
  }

  /**
   * Check if order can match existing offer (buy immediately)
   * @returns True if order status is BUY
   */
  canBuyNow(): boolean {
    return this.status === OrderStatus.BUY
  }

  /**
   * Calculate the price difference percentage from market price
   * @returns Percentage difference (positive = above market, negative = below market)
   */
  getPriceDifferencePercent(): number {
    if (this.pair.current_price === null) {
      return 0
    }
    return ((this.price_ratio - this.pair.current_price) / this.pair.current_price) * 100
  }

  /**
   * Check if both amounts are set
   * @returns True if both base_amount and quote_amount are not null
   */
  hasValidAmounts(): boolean {
    return this.base_amount !== null && this.quote_amount !== null
  }

}
