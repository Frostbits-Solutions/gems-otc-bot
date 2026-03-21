import type { Ref } from 'vue'
import type { WebAppInitData } from '@/models/telegram/WebAppInitData'

/**
 * Telegram WebApp Store State Interface
 * 
 * Defines the reactive state properties for the Telegram Mini App.
 * Add new properties here to easily extend the store's capabilities.
 * 
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
interface TelegramStoreState {
  /**
   * Initialization data transferred to the Mini App when it is opened.
   * This is the unsafe, unvalidated data from the Telegram client.
   * 
   * @todo Validate this data on the backend before trusting it.
   * @see https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
   */
  initDataUnsafe: Ref<WebAppInitData | undefined>

  /**
   * The version of the Bot API available in the user's Telegram app.
   * @example "8.0"
   */
  version: Ref<string | undefined>

  /**
   * The name of the platform of the user's Telegram app.
   * @example "android", "ios", "web", "macos", "tdesktop"
   */
  platform: Ref<string | undefined>

  /**
   * True if the Mini App is currently active.
   * False if the Mini App is minimized.
   * 
   * @note Available from Bot API 8.0+
   */
  isActive: Ref<boolean | undefined>

  /**
   * The current height of the visible area of the Mini App.
   */
  viewportHeight: Ref<number>

  /**
   * The height of the visible area of the Mini App in its stable state.
   */
  viewportStableHeight: Ref<number>

  /**
   * True if the Mini App is expanded to the maximum available height.
   */
  isExpanded: Ref<boolean>
}

/**
 * Telegram WebApp Store
 * 
 * This store manages the Telegram Mini App state and provides access to
 * Telegram WebApp API data including user information, platform details,
 * and initialization data.
 * 
 * All data types follow the official Telegram Mini Apps documentation.
 * 
 * @see https://core.telegram.org/bots/webapps
 * @see https://core.telegram.org/bots/webapps#initializing-mini-apps
 */
export const useTelegramStore = defineStore('telegram', () => {
  // Access the Telegram WebApp instance only on the client
  const tg = import.meta.client ? (window as any).Telegram?.WebApp : undefined

  // Initialize reactive state properties with fallbacks for SSR
  const state: TelegramStoreState = {
    initDataUnsafe: ref<WebAppInitData | undefined>(tg?.initDataUnsafe),
    version: ref<string | undefined>(tg?.version),
    platform: ref<string | undefined>(tg?.platform),
    isActive: ref<boolean | undefined>(tg?.isActive),
    viewportHeight: ref<number>(tg?.viewportHeight || (import.meta.client ? window.innerHeight : 0)),
    viewportStableHeight: ref<number>(tg?.viewportStableHeight || (import.meta.client ? window.innerHeight : 0)),
    isExpanded: ref<boolean>(tg?.isExpanded || false),
  }

  // Handle viewport changes
  if (tg) {
    tg.onEvent('viewportChanged', () => {
      state.viewportHeight.value = tg.viewportHeight
      state.viewportStableHeight.value = tg.viewportStableHeight
      state.isExpanded.value = tg.isExpanded
    })
  }

  return {
    // Telegram WebApp instance
    tg,
    
    // Reactive state - spread to maintain reactivity
    ...state
  }
})
