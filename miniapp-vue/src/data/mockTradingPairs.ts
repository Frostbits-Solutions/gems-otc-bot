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
  name: 'Tether',
  asa_id: 312769,
  ticker: 'USDT'
}

const BUSD: AlgorandAsset = {
  name: 'Binance USD',
  asa_id: 123001,
  ticker: 'BUSD'
}

const DAI: AlgorandAsset = {
  name: 'Dai Stablecoin',
  asa_id: 465865291,
  ticker: 'DAI'
}

// Major Cryptocurrencies
const BTC: AlgorandAsset = {
  name: 'Bitcoin',
  asa_id: 123456789,
  ticker: 'BTC'
}

const ETH: AlgorandAsset = {
  name: 'Ethereum',
  asa_id: 887406851,
  ticker: 'ETH'
}

const BNB: AlgorandAsset = {
  name: 'BNB',
  asa_id: 234567890,
  ticker: 'BNB'
}

const SOL: AlgorandAsset = {
  name: 'Solana',
  asa_id: 345678901,
  ticker: 'SOL'
}

const ADA: AlgorandAsset = {
  name: 'Cardano',
  asa_id: 456789012,
  ticker: 'ADA'
}

const DOT: AlgorandAsset = {
  name: 'Polkadot',
  asa_id: 567890123,
  ticker: 'DOT'
}

const MATIC: AlgorandAsset = {
  name: 'Polygon',
  asa_id: 678901234,
  ticker: 'MATIC'
}

const AVAX: AlgorandAsset = {
  name: 'Avalanche',
  asa_id: 789012345,
  ticker: 'AVAX'
}

const LINK: AlgorandAsset = {
  name: 'Chainlink',
  asa_id: 890123456,
  ticker: 'LINK'
}

const UNI: AlgorandAsset = {
  name: 'Uniswap',
  asa_id: 901234567,
  ticker: 'UNI'
}

const ATOM: AlgorandAsset = {
  name: 'Cosmos',
  asa_id: 111222333,
  ticker: 'ATOM'
}

const XRP: AlgorandAsset = {
  name: 'Ripple',
  asa_id: 222333444,
  ticker: 'XRP'
}

const LTC: AlgorandAsset = {
  name: 'Litecoin',
  asa_id: 333444555,
  ticker: 'LTC'
}

const ARB: AlgorandAsset = {
  name: 'Arbitrum',
  asa_id: 444555666,
  ticker: 'ARB'
}

const OP: AlgorandAsset = {
  name: 'Optimism',
  asa_id: 555666777,
  ticker: 'OP'
}

const APT: AlgorandAsset = {
  name: 'Aptos',
  asa_id: 666777888,
  ticker: 'APT'
}

const SUI: AlgorandAsset = {
  name: 'Sui',
  asa_id: 777888999,
  ticker: 'SUI'
}

const NEAR: AlgorandAsset = {
  name: 'NEAR Protocol',
  asa_id: 888999000,
  ticker: 'NEAR'
}

const FTM: AlgorandAsset = {
  name: 'Fantom',
  asa_id: 999000111,
  ticker: 'FTM'
}

const AAVE: AlgorandAsset = {
  name: 'Aave',
  asa_id: 100111222,
  ticker: 'AAVE'
}

const CRV: AlgorandAsset = {
  name: 'Curve DAO',
  asa_id: 211222333,
  ticker: 'CRV'
}

const SNX: AlgorandAsset = {
  name: 'Synthetix',
  asa_id: 322333444,
  ticker: 'SNX'
}

const COMP: AlgorandAsset = {
  name: 'Compound',
  asa_id: 433444555,
  ticker: 'COMP'
}

const MKR: AlgorandAsset = {
  name: 'Maker',
  asa_id: 544555666,
  ticker: 'MKR'
}

const GRT: AlgorandAsset = {
  name: 'The Graph',
  asa_id: 655666777,
  ticker: 'GRT'
}

const SAND: AlgorandAsset = {
  name: 'The Sandbox',
  asa_id: 766777888,
  ticker: 'SAND'
}

const MANA: AlgorandAsset = {
  name: 'Decentraland',
  asa_id: 877888999,
  ticker: 'MANA'
}

const AXS: AlgorandAsset = {
  name: 'Axie Infinity',
  asa_id: 988999000,
  ticker: 'AXS'
}

const DOGE: AlgorandAsset = {
  name: 'Dogecoin',
  asa_id: 100200300,
  ticker: 'DOGE'
}

const SHIB: AlgorandAsset = {
  name: 'Shiba Inu',
  asa_id: 200300400,
  ticker: 'SHIB'
}

const PEPE: AlgorandAsset = {
  name: 'Pepe',
  asa_id: 300400500,
  ticker: 'PEPE'
}

// Mock trading pairs with realistic prices and volumes
export const mockTradingPairs: TradingPair[] = [
  // Major pairs against ALGO
  {
    base_asset: BTC,
    quote_asset: ALGO,
    current_price: 0.000023456789,  // ~$42,650 BTC / $0.25 ALGO
    daily_volume: 2456789.12345,
    listing_count: 8
  },
  {
    base_asset: ETH,
    quote_asset: ALGO,
    current_price: 0.001456789123,  // ~$2,280 ETH / $0.25 ALGO
    daily_volume: 8934567.89234,
    listing_count: 7
  },
  {
    base_asset: SOL,
    quote_asset: ALGO,
    current_price: 0.287654321234,  // ~$72 SOL / $0.25 ALGO
    daily_volume: 5432109.87654,
    listing_count: 6
  },
  {
    base_asset: BNB,
    quote_asset: ALGO,
    current_price: 0.001234567891,  // ~$308 BNB / $0.25 ALGO
    daily_volume: 3456789.23456,
    listing_count: 5
  },
  {
    base_asset: ADA,
    quote_asset: ALGO,
    current_price: 1.456789123456,  // ~$0.36 ADA / $0.25 ALGO
    daily_volume: 6789012.34567,
    listing_count: 4
  },

  // Stablecoin pairs against ALGO
  {
    base_asset: USDC,
    quote_asset: ALGO,
    current_price: 3.876543210987,  // ~$1 USDC / $0.258 ALGO
    daily_volume: 12345678.9876,
    listing_count: 12
  },
  {
    base_asset: USDT,
    quote_asset: ALGO,
    current_price: 3.889012345678,  // ~$1 USDT / $0.257 ALGO
    daily_volume: 10987654.3210,
    listing_count: 11
  },
  {
    base_asset: DAI,
    quote_asset: ALGO,
    current_price: 3.882345678901,  // ~$1 DAI / $0.258 ALGO
    daily_volume: 4567890.12345,
    listing_count: 8
  },
  {
    base_asset: BUSD,
    quote_asset: ALGO,
    current_price: 3.878901234567,  // ~$1 BUSD / $0.258 ALGO
    daily_volume: 3456789.87654,
    listing_count: 6
  },

  // Layer 2s and Alt L1s against ALGO
  {
    base_asset: MATIC,
    quote_asset: ALGO,
    current_price: 2.987654321098,  // ~$0.77 MATIC / $0.258 ALGO
    daily_volume: 7890123.45678,
    listing_count: 7
  },
  {
    base_asset: AVAX,
    quote_asset: ALGO,
    current_price: 0.067890123456,  // ~$17.5 AVAX / $0.258 ALGO
    daily_volume: 4321098.76543,
    listing_count: 5
  },
  {
    base_asset: ARB,
    quote_asset: ALGO,
    current_price: 4.123456789012,  // ~$1.06 ARB / $0.258 ALGO
    daily_volume: 6543210.98765,
    listing_count: 6
  },
  {
    base_asset: OP,
    quote_asset: ALGO,
    current_price: 1.678901234567,  // ~$1.54 OP / $0.258 ALGO × 2.59
    daily_volume: 3210987.65432,
    listing_count: 5
  },
  {
    base_asset: APT,
    quote_asset: ALGO,
    current_price: 0.234567890123,  // ~$6.56 APT / $0.258 ALGO
    daily_volume: 2345678.90123,
    listing_count: 4
  },
  {
    base_asset: SUI,
    quote_asset: ALGO,
    current_price: 1.234567890123,  // ~$0.79 SUI / $0.258 ALGO
    daily_volume: 5678901.23456,
    listing_count: 5
  },

  // DeFi tokens against ALGO
  {
    base_asset: LINK,
    quote_asset: ALGO,
    current_price: 0.044567890123,  // ~$14.52 LINK / $0.258 ALGO
    daily_volume: 4567890.12345,
    listing_count: 7
  },
  {
    base_asset: UNI,
    quote_asset: ALGO,
    current_price: 0.123456789012,  // ~$5.12 UNI / $0.258 ALGO
    daily_volume: 3456789.01234,
    listing_count: 6
  },
  {
    base_asset: AAVE,
    quote_asset: ALGO,
    current_price: 0.006234567890,  // ~$101 AAVE / $0.258 ALGO
    daily_volume: 2109876.54321,
    listing_count: 5
  },
  {
    base_asset: CRV,
    quote_asset: ALGO,
    current_price: 3.456789012345,  // ~$0.75 CRV / $0.258 ALGO
    daily_volume: 4321098.76543,
    listing_count: 4
  },
  {
    base_asset: MKR,
    quote_asset: ALGO,
    current_price: 0.000167890123,  // ~$1,538 MKR / $0.258 ALGO
    daily_volume: 987654.321098,
    listing_count: 3
  },
  {
    base_asset: COMP,
    quote_asset: ALGO,
    current_price: 0.023456789012,  // ~$43 COMP / $0.258 ALGO × 2.6
    daily_volume: 1234567.89012,
    listing_count: 4
  },

  // Metaverse/Gaming tokens against ALGO
  {
    base_asset: SAND,
    quote_asset: ALGO,
    current_price: 6.789012345678,  // ~$0.38 SAND / $0.258 ALGO
    daily_volume: 5432109.87654,
    listing_count: 5
  },
  {
    base_asset: MANA,
    quote_asset: ALGO,
    current_price: 5.234567890123,  // ~$0.49 MANA / $0.258 ALGO
    daily_volume: 4321098.76543,
    listing_count: 5
  },
  {
    base_asset: AXS,
    quote_asset: ALGO,
    current_price: 0.123456789012,  // ~$5.12 AXS / $0.258 ALGO
    daily_volume: 2345678.90123,
    listing_count: 4
  },

  // Meme coins against ALGO
  {
    base_asset: DOGE,
    quote_asset: ALGO,
    current_price: 34.567890123456,  // ~$0.0075 DOGE / $0.258 ALGO
    daily_volume: 15678901.2345,
    listing_count: 8
  },
  {
    base_asset: SHIB,
    quote_asset: ALGO,
    current_price: 345678.901234567,  // ~$0.0000075 SHIB / $0.258 ALGO
    daily_volume: 12345678.9012,
    listing_count: 7
  },
  {
    base_asset: PEPE,
    quote_asset: ALGO,
    current_price: 456789.012345678,  // ~$0.0000056 PEPE / $0.258 ALGO
    daily_volume: 9876543.21098,
    listing_count: 6
  },

  // Major pairs against USDC
  {
    base_asset: BTC,
    quote_asset: USDC,
    current_price: 0.000023456789,  // ~$42,650
    daily_volume: 45678901.2345,
    listing_count: 15
  },
  {
    base_asset: ETH,
    quote_asset: USDC,
    current_price: 0.000438596491,  // ~$2,280
    daily_volume: 34567890.1234,
    listing_count: 14
  },
  {
    base_asset: SOL,
    quote_asset: USDC,
    current_price: 0.013888888889,  // ~$72
    daily_volume: 23456789.0123,
    listing_count: 12
  },
  {
    base_asset: BNB,
    quote_asset: USDC,
    current_price: 0.003246753247,  // ~$308
    daily_volume: 18765432.1098,
    listing_count: 11
  },

  // Cross-major pairs
  {
    base_asset: ETH,
    quote_asset: BTC,
    current_price: 0.053488372093,  // ~$2,280 / $42,650
    daily_volume: 12345678.9012,
    listing_count: 10
  },
  {
    base_asset: BNB,
    quote_asset: ETH,
    current_price: 0.135087719298,  // ~$308 / $2,280
    daily_volume: 6789012.34567,
    listing_count: 8
  },
  {
    base_asset: SOL,
    quote_asset: ETH,
    current_price: 0.031578947368,  // ~$72 / $2,280
    daily_volume: 8901234.56789,
    listing_count: 7
  },

  // DeFi pairs against USDC
  {
    base_asset: LINK,
    quote_asset: USDC,
    current_price: 0.068870523416,  // ~$14.52
    daily_volume: 9876543.21098,
    listing_count: 9
  },
  {
    base_asset: UNI,
    quote_asset: USDC,
    current_price: 0.195312500000,  // ~$5.12
    daily_volume: 7654321.09876,
    listing_count: 8
  },
  {
    base_asset: AAVE,
    quote_asset: USDC,
    current_price: 0.009900990099,  // ~$101
    daily_volume: 4567890.12345,
    listing_count: 7
  },

  // Layer 2s against USDC
  {
    base_asset: MATIC,
    quote_asset: USDC,
    current_price: 1.298701298701,  // ~$0.77
    daily_volume: 11234567.8901,
    listing_count: 10
  },
  {
    base_asset: ARB,
    quote_asset: USDC,
    current_price: 0.943396226415,  // ~$1.06
    daily_volume: 9012345.67890,
    listing_count: 9
  },
  {
    base_asset: OP,
    quote_asset: USDC,
    current_price: 0.649350649351,  // ~$1.54
    daily_volume: 6543210.98765,
    listing_count: 8
  },

  // Cosmos ecosystem
  {
    base_asset: ATOM,
    quote_asset: ALGO,
    current_price: 0.026455026455,  // ~$9.50 ATOM / $0.258 ALGO
    daily_volume: 3456789.01234,
    listing_count: 5
  },
  {
    base_asset: ATOM,
    quote_asset: USDC,
    current_price: 0.105263157895,  // ~$9.50
    daily_volume: 7890123.45678,
    listing_count: 8
  },

  // Other notable pairs
  {
    base_asset: DOT,
    quote_asset: ALGO,
    current_price: 0.032467532468,  // ~$6.42 DOT / $0.258 ALGO
    daily_volume: 4567890.12345,
    listing_count: 6
  },
  {
    base_asset: DOT,
    quote_asset: USDC,
    current_price: 0.155763239875,  // ~$6.42
    daily_volume: 8901234.56789,
    listing_count: 9
  },
  {
    base_asset: NEAR,
    quote_asset: USDC,
    current_price: 0.869565217391,  // ~$1.15
    daily_volume: 5432109.87654,
    listing_count: 7
  },
  {
    base_asset: FTM,
    quote_asset: USDC,
    current_price: 1.470588235294,  // ~$0.68
    daily_volume: 4321098.76543,
    listing_count: 6
  },
  {
    base_asset: GRT,
    quote_asset: USDC,
    current_price: 6.756756756757,  // ~$0.148
    daily_volume: 6789012.34567,
    listing_count: 7
  },

  // Ripple
  {
    base_asset: XRP,
    quote_asset: ALGO,
    current_price: 1.886792452830,  // ~$0.49 XRP / $0.258 ALGO
    daily_volume: 9876543.21098,
    listing_count: 7
  },
  {
    base_asset: XRP,
    quote_asset: USDC,
    current_price: 2.040816326531,  // ~$0.49
    daily_volume: 16789012.3456,
    listing_count: 11
  },

  // Litecoin
  {
    base_asset: LTC,
    quote_asset: ALGO,
    current_price: 0.003891050584,  // ~$68 LTC / $0.258 ALGO
    daily_volume: 3210987.65432,
    listing_count: 5
  },
  {
    base_asset: LTC,
    quote_asset: USDC,
    current_price: 0.014705882353,  // ~$68
    daily_volume: 6543210.98765,
    listing_count: 8
  },

  // Stablecoin cross pairs
  {
    base_asset: USDT,
    quote_asset: USDC,
    current_price: 0.999900009999,  // ~1:1
    daily_volume: 45678901.2345,
    listing_count: 18
  },
  {
    base_asset: DAI,
    quote_asset: USDC,
    current_price: 0.999800019998,  // ~1:1
    daily_volume: 23456789.0123,
    listing_count: 12
  },
  {
    base_asset: BUSD,
    quote_asset: USDC,
    current_price: 0.999700029997,  // ~1:1
    daily_volume: 12345678.9012,
    listing_count: 10
  },
]

/**
 * Simulate API delay for fetching trading pairs
 * @param delayMs - Delay in milliseconds (default: 500ms)
 * @returns Promise resolving to mock trading pairs
 */
export async function fetchMockTradingPairs(delayMs: number = 500): Promise<TradingPair[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockTradingPairs])
    }, delayMs)
  })
}
