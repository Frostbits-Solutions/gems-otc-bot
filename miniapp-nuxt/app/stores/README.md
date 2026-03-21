# Telegram Store

## Overview

The Telegram store manages the Telegram Mini App state and provides access to the Telegram WebApp API data.

## Data Models

This store uses type definitions that strictly follow the **official Telegram Mini Apps documentation**:

- 📚 [Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps#implementing-mini-apps)
- 📚 [Initializing Mini Apps](https://core.telegram.org/bots/webapps#initializing-mini-apps)
- 📚 [WebAppInitData](https://core.telegram.org/bots/webapps#webappinitdata)

All TypeScript interfaces are located in `src/models/telegram/` and mirror the structure defined in the Telegram Bot API documentation.

## Usage

```typescript
import { useTelegramStore } from '@/stores/telegram'

const telegramStore = useTelegramStore()

// Access Telegram WebApp instance
telegramStore.tg.ready()

// Access user data
const user = telegramStore.initDataUnsafe?.user

// Access platform information
console.log(telegramStore.platform) // "android", "ios", "web", etc.
console.log(telegramStore.version)  // Bot API version
console.log(telegramStore.isActive) // Mini App active state
```

## Store Structure

### State Interface: `TelegramStoreState`

The store uses a well-defined TypeScript interface for all reactive properties. This makes it easy to extend the store with new properties as the Telegram API evolves.

#### Current Properties:

| Property | Type | Description |
|----------|------|-------------|
| `initDataUnsafe` | `WebAppInitData \| undefined` | Initialization data from Telegram (⚠️ requires validation) |
| `version` | `string \| undefined` | Bot API version available in user's Telegram app |
| `platform` | `string \| undefined` | Platform name (android, ios, web, macos, tdesktop) |
| `isActive` | `boolean \| undefined` | Whether the Mini App is currently active (Bot API 8.0+) |

### Adding New Properties

To add a new property to the store:

1. **Update the interface** in `src/stores/telegram.ts`:
   ```typescript
   interface TelegramStoreState {
     // ... existing properties
     
     /**
      * Your new property description
      */
     newProperty: Ref<YourType | undefined>
   }
   ```

2. **Initialize the property** in the store:
   ```typescript
   const state: TelegramStoreState = {
     // ... existing properties
     newProperty: ref<YourType | undefined>(tg?.newProperty)
   }
   ```

3. Done! The property is now available throughout your app with full type safety.

## Security Note

⚠️ **Important**: The `initDataUnsafe` field contains unvalidated data from the Telegram client. You **must** validate this data on your backend before trusting it.

See: [Validating data received via the Mini App](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app)

## Related Models

- [`WebAppInitData`](../models/telegram/WebAppInitData.ts) - Main initialization data structure
- [`WebAppUser`](../models/telegram/WebAppUser.ts) - User information
- [`WebAppChat`](../models/telegram/WebAppChat.ts) - Chat information
