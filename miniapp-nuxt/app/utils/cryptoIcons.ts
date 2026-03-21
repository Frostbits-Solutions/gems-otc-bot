/**
 * Utility for loading cryptocurrency icons from the ASA List CDN.
 * Icons are fetched dynamically by asset ID from:
 * https://asa-list.tinyman.org/assets/{assetId}/icon.png
 *
 * No local package dependency required - icons are served from the CDN.
 */

const ASA_ICON_BASE_URL = 'https://asa-list.tinyman.org/assets'

// Cache for icon URLs keyed by asset ID
const iconCache = new Map<number, string>()

/**
 * Get the icon URL for an Algorand asset by its ASA ID.
 * Returns the PNG icon URL from the Tinyman ASA list CDN.
 *
 * @param asaId - Algorand Standard Asset ID (use 0 for ALGO)
 * @param format - Icon format: 'png' (default) or 'svg'
 * @returns Icon URL string, or empty string for unknown/invalid IDs
 */
export function getAssetIconUrl(asaId: number, format: 'png' | 'svg' = 'png'): string {
  if (asaId === null || asaId === undefined || asaId < 0) return ''

  // ALGO (native token) has a well-known asset ID of 0
  // It is listed under asset ID 0 on the CDN
  const cacheKey = asaId
  if (iconCache.has(cacheKey)) {
    return iconCache.get(cacheKey)!
  }

  const url = `${ASA_ICON_BASE_URL}/${asaId}/icon.${format}`
  iconCache.set(cacheKey, url)
  return url
}

/**
 * Get the PNG icon URL for an Algorand asset.
 * Convenience alias for getAssetIconUrl with format='png'.
 *
 * @param asaId - Algorand Standard Asset ID
 * @returns PNG icon URL string
 */
export function getCryptoIconByAsaId(asaId: number): string {
  return getAssetIconUrl(asaId, 'png')
}

/**
 * Get the SVG icon URL for an Algorand asset.
 *
 * @param asaId - Algorand Standard Asset ID
 * @returns SVG icon URL string
 */
export function getCryptoIconSvg(asaId: number): string {
  return getAssetIconUrl(asaId, 'svg')
}
