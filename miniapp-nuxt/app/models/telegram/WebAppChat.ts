/**
 * This object represents a chat.
 * @see https://core.telegram.org/bots/webapps#webappchat
 */
export interface WebAppChat {
  /**
   * Unique identifier for this chat.
   * This number may have more than 32 significant bits and some programming languages
   * may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits,
   * so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
   */
  id: number

  /**
   * Type of chat, can be either "group", "supergroup" or "channel"
   */
  type: 'group' | 'supergroup' | 'channel'

  /**
   * Title of the chat
   */
  title: string

  /**
   * Optional. Username of the chat
   */
  username?: string

  /**
   * Optional. URL of the chat's photo.
   * The photo can be in .jpeg or .svg formats.
   * Only returned for Mini Apps launched from the attachment menu.
   */
  photo_url?: string
}
