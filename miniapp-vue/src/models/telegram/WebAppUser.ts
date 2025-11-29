/**
 * This object contains the data of the Mini App user.
 * @see https://core.telegram.org/bots/webapps#webappuser
 */
export interface WebAppUser {
  /**
   * A unique identifier for the user or bot.
   * This number may have more than 32 significant bits and some programming languages
   * may have difficulty/silent defects in interpreting it. It has at most 52 significant bits,
   * so a 64-bit integer or a double-precision float type is safe for storing this identifier.
   */
  id: number

  /**
   * Optional. True, if this user is a bot. Returns in the receiver field only.
   */
  is_bot?: boolean

  /**
   * First name of the user or bot.
   */
  first_name: string

  /**
   * Optional. Last name of the user or bot.
   */
  last_name?: string

  /**
   * Optional. Username of the user or bot.
   */
  username?: string

  /**
   * Optional. IETF language tag of the user's language. Returns in user field only.
   */
  language_code?: string

  /**
   * Optional. True, if this user is a Telegram Premium user.
   */
  is_premium?: true

  /**
   * Optional. True, if this user added the bot to the attachment menu.
   */
  added_to_attachment_menu?: true

  /**
   * Optional. True, if this user allowed the bot to message them.
   */
  allows_write_to_pm?: true

  /**
   * Optional. URL of the user's profile photo.
   * The photo can be in .jpeg or .svg formats.
   */
  photo_url?: string
}
