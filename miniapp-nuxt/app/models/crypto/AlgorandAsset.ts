export interface AlgorandAsset {
  /**
   * Asset name (e.g., "Ethereum", "Algorand")
   */
  name: string

  /**
   * Algorand Standard Asset ID
   * ALGO has ID 0, other assets have unique positive integers
   */
  asa_id: number

  /**
   * Trading ticker symbol (e.g., "ETH", "ALGO", "USDC")
   * Used to dynamically load icon via getCryptoIcon(ticker)
   */
  ticker: string
}
