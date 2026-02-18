/**
 * Utility for loading cryptocurrency icons using Vite's import.meta.glob
 * Uses lazy loading to reduce bundle size
 */

// Load all PNG icons lazily (not eager) - only loads when needed
// Updated to source from asa-list assets
const iconModules = import.meta.glob<{ default: string }>(
  '@/data/asa-list/assets/**/*.{png,svg}',
  { eager: false }
)

// Map<Ticker, FilePath> to store standardized paths
const tickerToPathMap = new Map<string, string>()

// Populate the map on module load
Object.keys(iconModules).forEach((path) => {
  const parts = path.split('/')
  // Safety checks
  if (parts.length < 2) return
  const folder = parts[parts.length - 2]
  if (!folder) return

  // Logic: Extract ticker from folder name
  // Folder format is either "TICKER" or "TICKER-ASAID"
  let ticker = folder
  const lastHyphenIndex = folder.lastIndexOf('-')
  
  if (lastHyphenIndex > 0) {
    const potentialId = folder.substring(lastHyphenIndex + 1)
    if (/^\d+$/.test(potentialId)) {
      ticker = folder.substring(0, lastHyphenIndex)
    }
  }

  // Normalize to uppercase for case-insensitive lookup
  tickerToPathMap.set(ticker.toUpperCase(), path)
})

// Cache for loaded icon URLs
const iconCache = new Map<string, string>()

/**
 * Get the icon URL for a cryptocurrency by ticker symbol
 * @param ticker - Cryptocurrency ticker (e.g., "ALGO", "BTC")
 * @returns Icon URL or empty string while loading
 */
export async function getCryptoIconAsync(ticker: string): Promise<string> {
  const normalizedTicker = ticker.toUpperCase()
  
  // Check cache first
  if (iconCache.has(normalizedTicker)) {
    return iconCache.get(normalizedTicker)!
  }
  
  const path = tickerToPathMap.get(normalizedTicker)
  
  if (path && iconModules[path]) {
    try {
      const loader = iconModules[path]
      const module = await loader()
      iconCache.set(normalizedTicker, module.default)
      return module.default
    } catch {
      console.warn(`Failed to load icon for ticker: ${ticker}`)
    }
  }

  return ''
}

/**
 * Synchronous version - returns cached icon or empty string
 * @param ticker - Cryptocurrency ticker
 * @returns Cached icon URL or empty string
 */
export function getCryptoIcon(ticker: string): string {
  const normalizedTicker = ticker.toUpperCase()
  
  // Return from cache if available
  if (iconCache.has(normalizedTicker)) {
    return iconCache.get(normalizedTicker)!
  }
  
  // Trigger async load for next time
  getCryptoIconAsync(ticker)
  
  // Return empty string or placeholder while loading
  return ''
}

/**
 * Check if an icon exists for a given ticker
 * @param ticker - Cryptocurrency ticker
 * @returns True if icon exists
 */
export function hasIcon(ticker: string): boolean {
  return tickerToPathMap.has(ticker.toUpperCase())
}

/**
 * Preload icons for specific tickers
 * @param tickers - Array of tickers to preload
 */
export async function preloadIcons(tickers: string[]): Promise<void> {
  await Promise.all(tickers.map(ticker => getCryptoIconAsync(ticker)))
}

/**
 * Get all available ticker symbols that have icons
 * @returns Array of ticker symbols
 */
export function getAvailableTickers(): string[] {
  return Array.from(tickerToPathMap.keys())
}
