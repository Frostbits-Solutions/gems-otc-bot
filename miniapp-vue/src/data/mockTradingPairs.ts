import type { TradingPair, AlgorandAsset } from '@/models/crypto'

// Mock Algorand assets - Stablecoins
const ALGO: AlgorandAsset = {
  name: 'Algorand',
  asa_id: 0,
  ticker: 'ALGO'
}

const USDC: AlgorandAsset = {
  name: 'USD Coin',
  asa_id: 31566704,
  ticker: 'USDC'
}

const USDT: AlgorandAsset = {
  name: 'Tether USD',
  asa_id: 312769,
  ticker: 'USDt'
}

// Major Cryptocurrencies (Wrapped on Algorand)
const goBTC: AlgorandAsset = {
  name: 'goBTC',
  asa_id: 386192725,
  ticker: 'goBTC'
}

const goETH: AlgorandAsset = {
  name: 'goETH',
  asa_id: 386195940,
  ticker: 'goETH'
}

const xSOL: AlgorandAsset = {
  name: 'xSOL',
  asa_id: 792313023,
  ticker: 'xSOL'
}

// Algorand Native ASAs
const OPUL: AlgorandAsset = {
  name: 'Opulous',
  asa_id: 287867876,
  ticker: 'OPUL'
}

const DEFLY: AlgorandAsset = {
  name: 'Defly Token',
  asa_id: 470842789,
  ticker: 'DEFLY'
}

const YLDY: AlgorandAsset = {
  name: 'Yieldly',
  asa_id: 226701642,
  ticker: 'YLDY'
}

const GARD: AlgorandAsset = {
  name: 'GARD',
  asa_id: 684649988,
  ticker: 'GARD'
}

const HDL: AlgorandAsset = {
  name: 'HEADLINE',
  asa_id: 137594422,
  ticker: 'HDL'
}

const COOP: AlgorandAsset = {
  name: 'Coop Coin',
  asa_id: 796425061,
  ticker: 'COOP'
}

const GEMS: AlgorandAsset = {
  name: 'Gems',
  asa_id: 230946361,
  ticker: 'GEMS'
}

const XET: AlgorandAsset = {
  name: 'Xfinite Entertainment',
  asa_id: 283820866,
  ticker: 'XET'
}

const SMILE: AlgorandAsset = {
  name: 'Smile Coin',
  asa_id: 300208676,
  ticker: 'SMILE'
}

// Meme coins
const PEPE: AlgorandAsset = {
  name: 'Pepe',
  asa_id: 300400500, // Placeholder ID if using ticker lookup
  ticker: 'PEPE'
}

const aDOGE: AlgorandAsset = {
  name: 'Bridged Dogecoin',
  asa_id: 359487296,
  ticker: 'aDOGE'
}

const aSHIB: AlgorandAsset = {
  name: 'Bridged Shiba Inu',
  asa_id: 388505064,
  ticker: 'aSHIB'
}

// Mock trading pairs
export const mockTradingPairs: TradingPair[] = [
  // Major pairs against ALGO
  {
    base_asset: goBTC,
    quote_asset: ALGO,
    current_price: 170567.89,  // BTC in ALGO terms
    daily_volume: 2456789.12345,
    listing_count: 8
  },
  {
    base_asset: goETH,
    quote_asset: ALGO,
    current_price: 9123.45,  // ETH in ALGO terms
    daily_volume: 8934567.89234,
    listing_count: 7
  },
  {
    base_asset: xSOL,
    quote_asset: ALGO,
    current_price: 287.65,  // SOL in ALGO terms
    daily_volume: 5432109.87654,
    listing_count: 6
  },
  {
    base_asset: USDC,
    quote_asset: ALGO,
    current_price: 4.0,  // ~$1 USDC / $0.25 ALGO
    daily_volume: 12345678.9876,
    listing_count: 12
  },
  {
    base_asset: USDT,
    quote_asset: ALGO,
    current_price: 4.0,  // ~$1 USDT / $0.25 ALGO
    daily_volume: 10987654.3210,
    listing_count: 11
  },

  // Algorand Ecosystem Pairs
  {
    base_asset: OPUL,
    quote_asset: ALGO,
    current_price: 0.45,
    daily_volume: 3456789.23456,
    listing_count: 5
  },
  {
    base_asset: DEFLY,
    quote_asset: ALGO,
    current_price: 0.015,
    daily_volume: 234567.89,
    listing_count: 4
  },
  {
    base_asset: YLDY,
    quote_asset: ALGO,
    current_price: 0.00034,
    daily_volume: 456789.012,
    listing_count: 5
  },
  {
    base_asset: GARD,
    quote_asset: ALGO,
    current_price: 4.0,
    daily_volume: 123456.78,
    listing_count: 3
  },
  {
    base_asset: HDL,
    quote_asset: ALGO,
    current_price: 0.12,
    daily_volume: 67890.12,
    listing_count: 3
  },
  {
    base_asset: COOP,
    quote_asset: ALGO,
    current_price: 0.0045,
    daily_volume: 890123.45,
    listing_count: 6
  },
  {
    base_asset: GEMS,
    quote_asset: ALGO,
    current_price: 0.0023,
    daily_volume: 45678.90,
    listing_count: 2
  },
  {
    base_asset: XET,
    quote_asset: ALGO,
    current_price: 0.045,
    daily_volume: 34567.89,
    listing_count: 3
  },
  {
    base_asset: SMILE,
    quote_asset: ALGO,
    current_price: 0.00012,
    daily_volume: 567890.12,
    listing_count: 5
  },

  // Meme coins
  {
    base_asset: PEPE,
    quote_asset: ALGO,
    current_price: 0.000023,
    daily_volume: 9876543.21,
    listing_count: 6
  },
  {
    base_asset: aDOGE,
    quote_asset: ALGO,
    current_price: 0.34,
    daily_volume: 1567890.12,
    listing_count: 4
  },
  {
    base_asset: aSHIB,
    quote_asset: ALGO,
    current_price: 0.000034,
    daily_volume: 1234567.89,
    listing_count: 5
  },

  // Pairs against USDC
  {
    base_asset: goBTC,
    quote_asset: USDC,
    current_price: 42650.0,
    daily_volume: 45678901.23,
    listing_count: 15
  },
  {
    base_asset: goETH,
    quote_asset: USDC,
    current_price: 2280.0,
    daily_volume: 34567890.12,
    listing_count: 14
  },
  {
    base_asset: ALGO,
    quote_asset: USDC,
    current_price: 0.25,
    daily_volume: 56789012.34,
    listing_count: 20
  },
  {
    base_asset: OPUL,
    quote_asset: USDC,
    current_price: 0.11,
    daily_volume: 1234567.89,
    listing_count: 8
  }
]

// Generate additional mock pairs for stress testing (500+)
const extraPool: AlgorandAsset[] = [
  ALGO, USDC, USDT, goBTC, goETH, xSOL, OPUL, DEFLY, YLDY, GARD, HDL, COOP, GEMS, XET, SMILE, PEPE, aDOGE, aSHIB
]

function generateExtraPairs(count: number): TradingPair[] {
  const generated: TradingPair[] = []
  const existingPairs = new Set(mockTradingPairs.map(p => `${p.base_asset.asa_id}-${p.quote_asset.asa_id}`))

  for (let i = 0; i < count; i++) {
    const baseIndex = Math.floor(Math.random() * extraPool.length)
    const quoteIndex = Math.floor(Math.random() * extraPool.length)
    const base = extraPool[baseIndex] as AlgorandAsset
    const quote = extraPool[quoteIndex] as AlgorandAsset
    
    if (base.asa_id === quote.asa_id) continue
    const key = `${base.asa_id}-${quote.asa_id}`
    if (existingPairs.has(key)) continue

    generated.push({
      base_asset: base,
      quote_asset: quote,
      current_price: Math.random() * 1000 + 0.0001,
      daily_volume: Math.random() * 5000000,
      listing_count: Math.floor(Math.random() * 10) + 1
    })
    existingPairs.add(key)
  }
  return generated
}

const allPairs = [...mockTradingPairs, ...generateExtraPairs(550)]

/**
 * Simulate API delay for fetching trading pairs
 * @param delayMs - Delay in milliseconds (default: 500ms)
 * @returns Promise resolving to mock trading pairs
 */
export async function fetchMockTradingPairs(delayMs: number = 500): Promise<TradingPair[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...allPairs])
    }, delayMs)
  })
}
