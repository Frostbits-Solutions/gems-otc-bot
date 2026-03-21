import type { TradingPair, AlgorandAsset } from '@/models/crypto'

/**
 * Real Algorand assets sourced from https://asa-list.tinyman.org/assets.json
 * Icons are loaded dynamically via: https://asa-list.tinyman.org/assets/{asa_id}/icon.png
 */

// ── Core / Stablecoins ─────────────────────────────────────────────────────
const ALGO: AlgorandAsset = { name: 'Algorand', asa_id: 0, ticker: 'ALGO' }
const USDC: AlgorandAsset = { name: 'USDC', asa_id: 31566704, ticker: 'USDC' }
const USDT: AlgorandAsset = { name: 'Tether USDt', asa_id: 312769, ticker: 'USDt' }
const STBL2: AlgorandAsset = { name: 'STBL2', asa_id: 841126810, ticker: 'STBL2' }
const DJED: AlgorandAsset = { name: 'DJED', asa_id: 563579278, ticker: 'DJED' }
const GARD: AlgorandAsset = { name: 'GARD', asa_id: 684649988, ticker: 'GARD' }
const xUSD: AlgorandAsset = { name: 'xUSD', asa_id: 760037151, ticker: 'xUSD' }

// ── Wrapped Major Crypto ───────────────────────────────────────────────────
const goBTC: AlgorandAsset = { name: 'goBTC', asa_id: 386192725, ticker: 'goBTC' }
const goETH: AlgorandAsset = { name: 'goETH', asa_id: 386195940, ticker: 'goETH' }
const xSOL: AlgorandAsset = { name: 'Wrapped SOL', asa_id: 792313023, ticker: 'xSOL' }
const goLink: AlgorandAsset = { name: 'goLink', asa_id: 743260106, ticker: 'LINK' }
const pBTC: AlgorandAsset = { name: 'pTokens BTC', asa_id: 744665252, ticker: 'pBTC' }

// ── Algorand Ecosystem Tokens ──────────────────────────────────────────────
const OPUL: AlgorandAsset = { name: 'Opulous', asa_id: 287867876, ticker: 'OPUL' }
const DEFLY: AlgorandAsset = { name: 'Defly Token', asa_id: 470842789, ticker: 'DEFLY' }
const YLDY: AlgorandAsset = { name: 'Yieldly', asa_id: 226701642, ticker: 'YLDY' }
const HDL: AlgorandAsset = { name: 'HEADLINE', asa_id: 137594422, ticker: 'HDL' }
const COOP: AlgorandAsset = { name: 'Coop Coin', asa_id: 796425061, ticker: 'COOP' }
const GEMS: AlgorandAsset = { name: 'AlgoGems', asa_id: 230946361, ticker: 'GEMS' }
const XET: AlgorandAsset = { name: 'Xfinite Entertainment Token', asa_id: 283820866, ticker: 'XET' }
const SMILE: AlgorandAsset = { name: 'Smile Coin', asa_id: 300208676, ticker: 'SMILE' }
const ALGX: AlgorandAsset = { name: 'Algodex Token', asa_id: 724480511, ticker: 'ALGX' }
const VEST: AlgorandAsset = { name: 'Vestige', asa_id: 700965019, ticker: 'VEST' }
const TINY: AlgorandAsset = { name: 'Tinychart Token', asa_id: 378382099, ticker: 'TINY' }
const ZONE: AlgorandAsset = { name: 'ZONE', asa_id: 444035862, ticker: 'ZONE' }
const GORA: AlgorandAsset = { name: 'GORA', asa_id: 1138500612, ticker: 'GORA' }
const XGLI: AlgorandAsset = { name: 'Glitter Finance', asa_id: 607591690, ticker: 'XGLI' }
const META: AlgorandAsset = { name: 'Cometa', asa_id: 712012773, ticker: 'META' }
const VOTE: AlgorandAsset = { name: 'Vote Coin', asa_id: 452399768, ticker: 'Vote' }
const BANK: AlgorandAsset = { name: 'BANK', asa_id: 900652777, ticker: 'BANK' }
const GAS: AlgorandAsset = { name: 'GAS', asa_id: 1144340594, ticker: 'GAS' }
const OCTO: AlgorandAsset = { name: 'Octorand', asa_id: 559219992, ticker: 'OCTO' }
const VYBE: AlgorandAsset = { name: 'Vybe', asa_id: 558978094, ticker: 'VYBE' }
const ADAO: AlgorandAsset = { name: 'AlgoDAO Token', asa_id: 692085161, ticker: 'ADAO' }
const PAINT: AlgorandAsset = { name: 'Paint', asa_id: 624410813, ticker: 'PAINT' }
const PIZZA: AlgorandAsset = { name: 'Pizza', asa_id: 859269173, ticker: 'PIZZA' }
const HNY: AlgorandAsset = { name: 'Honey', asa_id: 988210906, ticker: 'HNY' }

// ── Folks Finance ──────────────────────────────────────────────────────────
const fALGO: AlgorandAsset = { name: 'Folks Algo', asa_id: 686505742, ticker: 'fALGO' }
const fUSDC: AlgorandAsset = { name: 'Folks USDC', asa_id: 686508050, ticker: 'fUSDC' }
const gALGO: AlgorandAsset = { name: 'Governance Algo', asa_id: 793124631, ticker: 'gALGO' }

// ── Meme / Community ───────────────────────────────────────────────────────
const PEPE: AlgorandAsset = { name: 'Pepe', asa_id: 1096015467, ticker: 'PEPE' }
const aDOGE: AlgorandAsset = { name: 'aDOGE', asa_id: 359487296, ticker: 'aDOGE' }
const aSHIB: AlgorandAsset = { name: 'AlgoShibaInu', asa_id: 388505064, ticker: 'aSHIB' }
const AKITA: AlgorandAsset = { name: 'AKITA INU TOKEN', asa_id: 384303832, ticker: 'AKITA' }
const DEGEN: AlgorandAsset = { name: 'DEGEN Token', asa_id: 417708610, ticker: 'DEGEN' }
const TBOTS: AlgorandAsset = { name: 'tinybots', asa_id: 421281844, ticker: 'TBOTS' }
const ACORN: AlgorandAsset = { name: 'AlgoNuts', asa_id: 226265212, ticker: 'ACORN' }
const FISH: AlgorandAsset = { name: 'Clean Ocean Token', asa_id: 393155456, ticker: 'FISH' }
const LOUD: AlgorandAsset = { name: 'LOUDeFi', asa_id: 567485181, ticker: 'LOUD' }
const SIGMA: AlgorandAsset = { name: 'Sigma Token', asa_id: 692083444, ticker: 'SIGMA' }
const GAIN: AlgorandAsset = { name: 'GAIN', asa_id: 684649672, ticker: 'GAIN' }
const OMNI: AlgorandAsset = { name: 'Omnicoin', asa_id: 942958458, ticker: 'OMNI' }

// ── Core curated trading pairs ─────────────────────────────────────────────
export const mockTradingPairs: TradingPair[] = [
  // Major pairs vs ALGO
  { base_asset: goBTC,  quote_asset: ALGO,  current_price: 170567.89234567, daily_volume: 2456789.12, listing_count: 8 },
  { base_asset: goETH,  quote_asset: ALGO,  current_price: 9123.45,         daily_volume: 8934567.89, listing_count: 7 },
  { base_asset: xSOL,   quote_asset: ALGO,  current_price: 287.65,          daily_volume: 5432109.87, listing_count: 6 },
  { base_asset: USDC,   quote_asset: ALGO,  current_price: 4.0,             daily_volume: 12345678.98, listing_count: 12 },
  { base_asset: USDT,   quote_asset: ALGO,  current_price: 4.0,             daily_volume: 10987654.32, listing_count: 11 },
  { base_asset: DJED,   quote_asset: ALGO,  current_price: 4.01,            daily_volume: 876543.21,  listing_count: 5 },
  { base_asset: STBL2,  quote_asset: ALGO,  current_price: 4.0,             daily_volume: 1234567.89, listing_count: 6 },

  // Algorand ecosystem vs ALGO
  { base_asset: OPUL,   quote_asset: ALGO,  current_price: 0.45,   daily_volume: 3456789.23, listing_count: 5 },
  { base_asset: DEFLY,  quote_asset: ALGO,  current_price: 0.015,  daily_volume: 234567.89,  listing_count: 4 },
  { base_asset: YLDY,   quote_asset: ALGO,  current_price: 0.00034, daily_volume: 456789.01, listing_count: 5 },
  { base_asset: GARD,   quote_asset: ALGO,  current_price: 4.0,    daily_volume: 123456.78,  listing_count: 3 },
  { base_asset: HDL,    quote_asset: ALGO,  current_price: 0.12,   daily_volume: 67890.12,   listing_count: 3 },
  { base_asset: COOP,   quote_asset: ALGO,  current_price: 0.0045, daily_volume: 890123.45,  listing_count: 6 },
  { base_asset: GEMS,   quote_asset: ALGO,  current_price: 0.0023, daily_volume: 45678.90,   listing_count: 2 },
  { base_asset: XET,    quote_asset: ALGO,  current_price: 0.045,  daily_volume: 34567.89,   listing_count: 3 },
  { base_asset: SMILE,  quote_asset: ALGO,  current_price: 0.00012, daily_volume: 567890.12, listing_count: 5 },
  { base_asset: ALGX,   quote_asset: ALGO,  current_price: 0.032,  daily_volume: 498234.56,  listing_count: 4 },
  { base_asset: VEST,   quote_asset: ALGO,  current_price: 0.021,  daily_volume: 312456.78,  listing_count: 3 },
  { base_asset: TINY,   quote_asset: ALGO,  current_price: 0.0089, daily_volume: 198765.43,  listing_count: 3 },
  { base_asset: GORA,   quote_asset: ALGO,  current_price: 0.18,   daily_volume: 765432.10,  listing_count: 5 },
  { base_asset: META,   quote_asset: ALGO,  current_price: 0.054,  daily_volume: 234567.89,  listing_count: 3 },
  { base_asset: BANK,   quote_asset: ALGO,  current_price: 0.0067, daily_volume: 145678.90,  listing_count: 2 },
  { base_asset: PAINT,  quote_asset: ALGO,  current_price: 0.0031, daily_volume: 87654.32,   listing_count: 2 },
  { base_asset: PIZZA,  quote_asset: ALGO,  current_price: 0.0012, daily_volume: 65432.10,   listing_count: 2 },
  { base_asset: ADAO,   quote_asset: ALGO,  current_price: 0.088,  daily_volume: 234567.89,  listing_count: 3 },
  { base_asset: gALGO,  quote_asset: ALGO,  current_price: 1.005,  daily_volume: 876543.21,  listing_count: 4 },
  { base_asset: GAIN,   quote_asset: ALGO,  current_price: 0.0078, daily_volume: 98765.43,   listing_count: 2 },
  { base_asset: OMNI,   quote_asset: ALGO,  current_price: 0.0045, daily_volume: 76543.21,   listing_count: 2 },

  // Meme coins vs ALGO
  { base_asset: PEPE,   quote_asset: ALGO,  current_price: 0.000023, daily_volume: 9876543.21, listing_count: 6 },
  { base_asset: aDOGE,  quote_asset: ALGO,  current_price: 0.34,     daily_volume: 1567890.12, listing_count: 4 },
  { base_asset: aSHIB,  quote_asset: ALGO,  current_price: 0.000034, daily_volume: 1234567.89, listing_count: 5 },
  { base_asset: AKITA,  quote_asset: ALGO,  current_price: 0.00015,  daily_volume: 543210.98,  listing_count: 3 },
  { base_asset: DEGEN,  quote_asset: ALGO,  current_price: 0.000095, daily_volume: 765432.10,  listing_count: 3 },
  { base_asset: SIGMA,  quote_asset: ALGO,  current_price: 0.0017,   daily_volume: 234567.89,  listing_count: 2 },

  // Pairs vs USDC
  { base_asset: goBTC,  quote_asset: USDC,  current_price: 42650.0,  daily_volume: 45678901.23, listing_count: 15 },
  { base_asset: goETH,  quote_asset: USDC,  current_price: 2280.0,   daily_volume: 34567890.12, listing_count: 14 },
  { base_asset: ALGO,   quote_asset: USDC,  current_price: 0.25,     daily_volume: 56789012.34, listing_count: 20 },
  { base_asset: OPUL,   quote_asset: USDC,  current_price: 0.11,     daily_volume: 1234567.89,  listing_count: 8 },
  { base_asset: DEFLY,  quote_asset: USDC,  current_price: 0.004,    daily_volume: 567890.12,   listing_count: 5 },
  { base_asset: GORA,   quote_asset: USDC,  current_price: 0.045,    daily_volume: 345678.90,   listing_count: 4 },
  { base_asset: xSOL,   quote_asset: USDC,  current_price: 71.9,     daily_volume: 2345678.90,  listing_count: 6 },
  { base_asset: STBL2,  quote_asset: USDC,  current_price: 1.0,      daily_volume: 876543.21,   listing_count: 5 },
]

// ── Extended asset pool for generator ─────────────────────────────────────
// All sourced from https://asa-list.tinyman.org/assets.json
const EXTENDED_POOL: AlgorandAsset[] = [
  ALGO, USDC, USDT, STBL2, DJED, GARD, xUSD,
  goBTC, goETH, xSOL, goLink, pBTC,
  OPUL, DEFLY, YLDY, HDL, COOP, GEMS, XET, SMILE, ALGX, VEST, TINY,
  ZONE, GORA, XGLI, META, VOTE, BANK, GAS, OCTO, VYBE, ADAO, PAINT,
  PIZZA, HNY, fALGO, fUSDC, gALGO,
  PEPE, aDOGE, aSHIB, AKITA, DEGEN, TBOTS, ACORN, FISH, LOUD, SIGMA,
  GAIN, OMNI,
  { name: 'AKITA INU', asa_id: 523683256, ticker: 'AKTA' },
  { name: 'Tinychart Token', asa_id: 378382099, ticker: 'TINY' },
  { name: 'Freckle', asa_id: 542874179, ticker: 'FRKL' },
  { name: 'Algodex Token', asa_id: 724480511, ticker: 'ALGX' },
  { name: 'Vestige', asa_id: 700965019, ticker: 'VEST' },
  { name: 'Governance Algo', asa_id: 793124631, ticker: 'gALGO' },
  { name: 'goUSD', asa_id: 672913181, ticker: 'goUSD' },
  { name: 'goGOLD', asa_id: 672923029, ticker: 'goGOLD' },
  { name: 'Doubloon', asa_id: 689171215, ticker: 'DUB' },
  { name: 'STBL', asa_id: 465865291, ticker: 'STBL' },
  { name: 'Glitter Finance', asa_id: 607591690, ticker: 'XGLI' },
  { name: 'Cometa', asa_id: 712012773, ticker: 'META' },
  { name: 'AlgoDAO Token', asa_id: 692085161, ticker: 'ADAO' },
  { name: 'PeliCoin', asa_id: 758090502, ticker: 'PLCN' },
  { name: 'Coop Coin', asa_id: 796425061, ticker: 'COOP' },
  { name: 'Wageroo', asa_id: 575353596, ticker: 'ROO' },
  { name: 'GARD', asa_id: 684649988, ticker: 'GARD' },
  { name: 'Dharma Network', asa_id: 818432243, ticker: 'DHARM' },
  { name: 'Aegir', asa_id: 453816186, ticker: 'AGR' },
  { name: 'Fight Token', asa_id: 591601798, ticker: 'FIGHT' },
  { name: 'Star Token', asa_id: 465573604, ticker: 'STAR' },
  { name: 'Day By Day', asa_id: 747635241, ticker: 'DBD' },
  { name: 'Gradian', asa_id: 674925395, ticker: 'GRAD' },
  { name: 'AlgoFund', asa_id: 463554836, ticker: 'ALGF' },
  { name: 'Koala Coin', asa_id: 743695671, ticker: 'KOCO' },
  { name: 'Meld Gold', asa_id: 246516580, ticker: 'GOLD$' },
  { name: 'Meld Silver', asa_id: 246519683, ticker: 'SILVER$' },
  { name: 'ASA Stats Token', asa_id: 393537671, ticker: 'ASASTATS' },
  { name: 'AlgoLeagues Coin', asa_id: 445905873, ticker: 'ALC' },
  { name: 'Octorand', asa_id: 559219992, ticker: 'OCTO' },
  { name: 'RealioNetwork', asa_id: 367058172, ticker: 'RST' },
  { name: 'Realio Token', asa_id: 2751733, ticker: 'RIO' },
  { name: 'ARCC', asa_id: 163650, ticker: 'ARCC' },
  { name: 'Blocto Token', asa_id: 297995609, ticker: 'Choice' },
  { name: 'Dope Panda', asa_id: 391379500, ticker: 'DPANDA' },
  { name: 'MAGMA', asa_id: 445362421, ticker: 'MAGM' },
  { name: 'Planets', asa_id: 27165954, ticker: 'Planets' },
  { name: 'Tinybots', asa_id: 421281844, ticker: 'TBOTS' },
  { name: 'xBull', asa_id: 383581973, ticker: 'XBULL' },
  { name: 'Folks Finance', asa_id: 686505742, ticker: 'fALGO' },
  { name: 'BirdBot', asa_id: 478549868, ticker: 'BIRDS' },
  { name: 'QR Credits', asa_id: 769556781, ticker: 'QRC' },
  { name: 'NFTrade', asa_id: 455356741, ticker: 'NFT' },
  { name: 'Crescendo', asa_id: 435335235, ticker: 'CRSD' },
  { name: 'ASA Portfolio', asa_id: 542132831, ticker: 'APF' },
  { name: 'Peaches', asa_id: 1066698547, ticker: 'PCHY' },
  { name: 'goMINT', asa_id: 441139422, ticker: 'goMINT' },
  { name: 'Spindle Yarn', asa_id: 544217506, ticker: 'YARN' },
  { name: 'Vybe', asa_id: 558978094, ticker: 'VYBE' },
  { name: 'KarbonX', asa_id: 553656096, ticker: 'KBX' },
  { name: 'AlgoPlant', asa_id: 553651951, ticker: 'PLANT' },
  { name: 'Freckle', asa_id: 542874179, ticker: 'FRKL' },
  { name: 'STBL2', asa_id: 841126810, ticker: 'STBL2' },
  { name: 'Polkagold', asa_id: 1237529510, ticker: 'PGOLD' },
  { name: 'HIVE', asa_id: 1122347528, ticker: 'HIVE' },
  { name: 'Honey', asa_id: 988210906, ticker: 'HNY' },
  { name: 'Pepe', asa_id: 1096015467, ticker: 'PEPE' },
  { name: 'Board', asa_id: 1054801592, ticker: 'BRD' },
  { name: 'Power', asa_id: 2994233666, ticker: 'POW' },
  { name: 'TokiCoin', asa_id: 3145241720, ticker: 'TOKI' },
  { name: 'TroyAurum', asa_id: 2296959093, ticker: 'TRAU' },
  { name: 'GOON', asa_id: 2563290460, ticker: 'GOON' },
  { name: 'Steak Pool', asa_id: 2595619475, ticker: 'STEAK' },
  { name: 'Honey', asa_id: 988210906, ticker: 'HNY' },
  { name: 'BANK', asa_id: 900652777, ticker: 'BANK' },
  { name: 'Omnicoin', asa_id: 942958458, ticker: 'OMNI' },
  { name: 'INFLATOR', asa_id: 975807033, ticker: 'INFT' },
  { name: 'BARTLE DOO', asa_id: 829992960, ticker: 'BD' },
  { name: 'DJED', asa_id: 563579278, ticker: 'DJED' },
  { name: 'Glizzy', asa_id: 1053260256, ticker: 'GLIZZY' },
  { name: 'MOOP', asa_id: 1096471121, ticker: 'MOOP' },
  { name: 'Mantis', asa_id: 714976897, ticker: '$MNTS' },
  { name: 'Ghost', asa_id: 714773890, ticker: 'GHOST' },
  { name: 'FrysCrypto', asa_id: 924268058, ticker: 'FRY' },
  { name: 'Sigma Token', asa_id: 692083444, ticker: 'SIGMA' },
  { name: 'Paint', asa_id: 624410813, ticker: 'PAINT' },
  { name: 'Press.algo Token', asa_id: 919889450, ticker: 'PDAT' },
]

// De-dupe by asa_id
const seenIds = new Set<number>()
const assetPool: AlgorandAsset[] = EXTENDED_POOL.filter((a) => {
  if (seenIds.has(a.asa_id)) return false
  seenIds.add(a.asa_id)
  return true
})

function generateExtraPairs(count: number): TradingPair[] {
  const generated: TradingPair[] = []
  const existingPairs = new Set(mockTradingPairs.map((p) => `${p.base_asset.asa_id}-${p.quote_asset.asa_id}`))

  // Common quote assets for realistic pairs
  const quoteAssets: AlgorandAsset[] = [ALGO, USDC, USDT, STBL2, goBTC]

  let attempts = 0
  while (generated.length < count && attempts < count * 4) {
    attempts++
    const base = assetPool[Math.floor(Math.random() * assetPool.length)] as AlgorandAsset
    const quote = quoteAssets[Math.floor(Math.random() * quoteAssets.length)] as AlgorandAsset

    if (base.asa_id === quote.asa_id) continue
    const key = `${base.asa_id}-${quote.asa_id}`
    if (existingPairs.has(key)) continue

    generated.push({
      base_asset: base,
      quote_asset: quote,
      current_price: parseFloat((Math.random() * 1000 + 0.0001).toFixed(8)),
      daily_volume: parseFloat((Math.random() * 5000000).toFixed(2)),
      listing_count: Math.floor(Math.random() * 10) + 1,
    })
    existingPairs.add(key)
  }
  return generated
}

const allPairs = [...mockTradingPairs, ...generateExtraPairs(550)]

/**
 * Simulate API delay for fetching trading pairs.
 * @param delayMs - Delay in milliseconds (default: 500ms)
 */
export async function fetchMockTradingPairs(delayMs: number = 500): Promise<TradingPair[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...allPairs])
    }, delayMs)
  })
}
