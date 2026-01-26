/**
 * Utility for loading cryptocurrency icons using Vite's import.meta.glob
 * Uses lazy loading to reduce bundle size
 */

// Load all PNG icons lazily (not eager) - only loads when needed
const iconModules = import.meta.glob<{ default: string }>(
  '@/data/cryptoicons/64/*.png',
  { eager: false }
)

// Cache for loaded icons
const iconCache = new Map<string, string>()

/**
 * Get the icon URL for a cryptocurrency by ticker symbol
 * @param ticker - Cryptocurrency ticker (e.g., "ALGO", "BTC", "ETH")
 * @returns Icon URL or empty string while loading
 */
export async function getCryptoIconAsync(ticker: string): Promise<string> {
  const normalizedTicker = ticker.toLowerCase()
  
  // Check cache first
  if (iconCache.has(normalizedTicker)) {
    return iconCache.get(normalizedTicker)!
  }
  
  const iconPath = `/src/data/cryptoicons/64/${normalizedTicker}.png`
  const iconLoader = iconModules[iconPath]
  
  if (iconLoader) {
    try {
      const module = await iconLoader()
      iconCache.set(normalizedTicker, module.default)
      return module.default
    } catch {
      console.warn(`Failed to load icon for ticker: ${ticker}`)
    }
  }

  // Fallback to default icon
  return getDefaultCryptoIconAsync()
}

/**
 * Synchronous version - returns cached icon or placeholder
 * @param ticker - Cryptocurrency ticker
 * @returns Cached icon URL or empty string
 */
export function getCryptoIcon(ticker: string): string {
  const normalizedTicker = ticker.toLowerCase()
  
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
 * Get default cryptocurrency icon for fallback
 * @returns Default icon URL
 */
async function getDefaultCryptoIconAsync(): Promise<string> {
  const defaultPath = '/src/data/cryptoicons/64/generic.png'
  const loader = iconModules[defaultPath]
  if (loader) {
    const module = await loader()
    return module.default
  }
  return ''
}

/**
 * Check if an icon exists for a given ticker
 * @param ticker - Cryptocurrency ticker
 * @returns True if icon exists
 */
export function hasIcon(ticker: string): boolean {
  const normalizedTicker = ticker.toLowerCase()
  const iconPath = `/src/data/cryptoicons/64/${normalizedTicker}.png`
  return !!iconModules[iconPath]
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
 * @returns Array of lowercase ticker symbols
 */
export function getAvailableTickers(): string[] {
  return Object.keys(iconModules).map(path => {
    const filename = path.split('/').pop()?.replace('.png', '')
    return filename || ''
  }).filter(Boolean)
}
