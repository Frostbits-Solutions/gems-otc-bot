<script setup lang="ts">
import { useTelegramStore } from '../stores/telegram'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const telegramStore = useTelegramStore()
const router = useRouter()

const goBack = () => {
  router.push('/')
}

// Format JSON for display
const formatJson = (obj: any) => {
  if (obj === undefined) return 'undefined'
  if (obj === null) return 'null'
  return JSON.stringify(obj, null, 2)
}

// Compute display values
const storeData = computed(() => ({
  platform: telegramStore.platform || 'Not available',
  version: telegramStore.version || 'Not available',
  isActive: telegramStore.isActive !== undefined ? telegramStore.isActive : 'Not available',
  colorScheme: telegramStore.tg?.colorScheme || 'Not available',
  isExpanded: telegramStore.tg?.isExpanded !== undefined ? telegramStore.tg.isExpanded : 'Not available',
  viewportHeight: telegramStore.tg?.viewportHeight || 'Not available',
  viewportStableHeight: telegramStore.tg?.viewportStableHeight || 'Not available',
}))
</script>

<template>
  <div class="dev-container">
    <button @click="goBack" class="back-btn">← Back to Home</button>
    
    <div class="dev-header">
      <h1>🔧 Dev: Telegram App Data</h1>
      <p class="subtitle">Telegram Mini App Store Inspector</p>
    </div>

    <div class="section">
      <h2>📱 Platform Information</h2>
      <div class="data-grid">
        <div class="data-item">
          <span class="label">Platform:</span>
          <span class="value">{{ storeData.platform }}</span>
        </div>
        <div class="data-item">
          <span class="label">Bot API Version:</span>
          <span class="value">{{ storeData.version }}</span>
        </div>
        <div class="data-item">
          <span class="label">Is Active:</span>
          <span class="value" :class="{ active: storeData.isActive === true }">
            {{ storeData.isActive }}
          </span>
        </div>
        <div class="data-item">
          <span class="label">Color Scheme:</span>
          <span class="value">{{ storeData.colorScheme }}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>📐 Viewport Information</h2>
      <div class="data-grid">
        <div class="data-item">
          <span class="label">Is Expanded:</span>
          <span class="value">{{ storeData.isExpanded }}</span>
        </div>
        <div class="data-item">
          <span class="label">Viewport Height:</span>
          <span class="value">{{ storeData.viewportHeight }}px</span>
        </div>
        <div class="data-item">
          <span class="label">Stable Height:</span>
          <span class="value">{{ storeData.viewportStableHeight }}px</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>👤 User Data (initDataUnsafe.user)</h2>
      <div v-if="telegramStore.initDataUnsafe?.user" class="data-grid">
        <div class="data-item">
          <span class="label">ID:</span>
          <span class="value">{{ telegramStore.initDataUnsafe.user.id }}</span>
        </div>
        <div class="data-item">
          <span class="label">First Name:</span>
          <span class="value">{{ telegramStore.initDataUnsafe.user.first_name }}</span>
        </div>
        <div class="data-item" v-if="telegramStore.initDataUnsafe.user.last_name">
          <span class="label">Last Name:</span>
          <span class="value">{{ telegramStore.initDataUnsafe.user.last_name }}</span>
        </div>
        <div class="data-item" v-if="telegramStore.initDataUnsafe.user.username">
          <span class="label">Username:</span>
          <span class="value">@{{ telegramStore.initDataUnsafe.user.username }}</span>
        </div>
        <div class="data-item" v-if="telegramStore.initDataUnsafe.user.language_code">
          <span class="label">Language:</span>
          <span class="value">{{ telegramStore.initDataUnsafe.user.language_code }}</span>
        </div>
        <div class="data-item" v-if="telegramStore.initDataUnsafe.user.is_premium">
          <span class="label">Premium:</span>
          <span class="value premium">⭐ Yes</span>
        </div>
        <div class="data-item" v-if="telegramStore.initDataUnsafe.user.photo_url">
          <span class="label">Photo URL:</span>
          <span class="value small">{{ telegramStore.initDataUnsafe.user.photo_url }}</span>
        </div>
      </div>
      <div v-else class="no-data">
        <p>No user data available</p>
      </div>
    </div>

    <div class="section">
      <h2>💬 Chat Data (initDataUnsafe.chat)</h2>
      <div v-if="telegramStore.initDataUnsafe?.chat" class="data-grid">
        <div class="data-item">
          <span class="label">Chat ID:</span>
          <span class="value">{{ telegramStore.initDataUnsafe.chat.id }}</span>
        </div>
        <div class="data-item">
          <span class="label">Type:</span>
          <span class="value">{{ telegramStore.initDataUnsafe.chat.type }}</span>
        </div>
        <div class="data-item">
          <span class="label">Title:</span>
          <span class="value">{{ telegramStore.initDataUnsafe.chat.title }}</span>
        </div>
        <div class="data-item" v-if="telegramStore.initDataUnsafe.chat.username">
          <span class="label">Username:</span>
          <span class="value">@{{ telegramStore.initDataUnsafe.chat.username }}</span>
        </div>
      </div>
      <div v-else class="no-data">
        <p>No chat data available</p>
      </div>
    </div>

    <div class="section">
      <h2>🔐 Init Data Details</h2>
      <div v-if="telegramStore.initDataUnsafe" class="data-grid">
        <div class="data-item" v-if="telegramStore.initDataUnsafe.query_id">
          <span class="label">Query ID:</span>
          <span class="value small">{{ telegramStore.initDataUnsafe.query_id }}</span>
        </div>
        <div class="data-item" v-if="telegramStore.initDataUnsafe.chat_type">
          <span class="label">Chat Type:</span>
          <span class="value">{{ telegramStore.initDataUnsafe.chat_type }}</span>
        </div>
        <div class="data-item" v-if="telegramStore.initDataUnsafe.chat_instance">
          <span class="label">Chat Instance:</span>
          <span class="value small">{{ telegramStore.initDataUnsafe.chat_instance }}</span>
        </div>
        <div class="data-item" v-if="telegramStore.initDataUnsafe.start_param">
          <span class="label">Start Param:</span>
          <span class="value">{{ telegramStore.initDataUnsafe.start_param }}</span>
        </div>
        <div class="data-item">
          <span class="label">Auth Date:</span>
          <span class="value">{{ new Date(telegramStore.initDataUnsafe.auth_date * 1000).toLocaleString() }}</span>
        </div>
        <div class="data-item">
          <span class="label">Hash:</span>
          <span class="value small">{{ telegramStore.initDataUnsafe.hash }}</span>
        </div>
      </div>
      <div v-else class="no-data">
        <p>No initialization data available</p>
      </div>
    </div>

    <div class="section">
      <h2>📦 Raw initDataUnsafe (JSON)</h2>
      <pre class="json-display">{{ formatJson(telegramStore.initDataUnsafe) }}</pre>
    </div>

    <div class="section">
      <h2>🌈 Theme Parameters</h2>
      <div v-if="telegramStore.tg?.themeParams" class="theme-colors">
        <div v-for="(value, key) in telegramStore.tg.themeParams" :key="key" class="color-item">
          <div class="color-preview" :style="{ backgroundColor: value }"></div>
          <div class="color-info">
            <span class="color-name">{{ key }}</span>
            <span class="color-value">{{ value }}</span>
          </div>
        </div>
      </div>
      <div v-else class="no-data">
        <p>No theme parameters available</p>
      </div>
    </div>

    <div class="section warning">
      <h3>⚠️ Security Note</h3>
      <p>
        The data displayed here is from <code>initDataUnsafe</code> and has not been validated.
        Always validate this data on your backend before trusting it.
      </p>
      <p>
        <a href="https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app" target="_blank">
          Learn more about data validation →
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.dev-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--tg-theme-bg-color, #1a1b26);
  color: var(--tg-theme-text-color, #ffffff);
  min-height: 100vh;
}

.back-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.dev-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.dev-header h1 {
  margin: 0 0 10px 0;
  color: var(--tg-theme-text-color, #ffffff);
  font-weight: 700;
  font-size: 2em;
}

.subtitle {
  color: var(--tg-theme-hint-color, #9ca3af);
  margin: 0;
  font-size: 1.1em;
}

.section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section h2 {
  margin: 0 0 15px 0;
  color: var(--tg-theme-text-color, #ffffff);
  font-size: 18px;
  font-weight: 600;
}

.section h3 {
  margin: 0 0 10px 0;
  color: var(--tg-theme-text-color, #ffffff);
  font-weight: 600;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}

.data-item {
  background: rgba(255, 255, 255, 0.03);
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.label {
  font-weight: 600;
  color: var(--tg-theme-hint-color, #9ca3af);
  font-size: 14px;
}

.value {
  color: var(--tg-theme-text-color, #ffffff);
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 14px;
  text-align: right;
  word-break: break-word;
}

.value.small {
  font-size: 11px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.value.active {
  color: #4CAF50;
  font-weight: bold;
}

.value.premium {
  color: #FFD700;
  font-weight: bold;
}

.no-data {
  text-align: center;
  padding: 30px;
  color: var(--tg-theme-hint-color, #6b7280);
}

.json-display {
  background: rgba(0, 0, 0, 0.3);
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 12px;
  line-height: 1.5;
  color: var(--tg-theme-text-color, #e0e0e0);
  margin: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.theme-colors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.color-item {
  background: rgba(255, 255, 255, 0.03);
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.color-preview {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
}

.color-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.color-name {
  font-size: 13px;
  color: var(--tg-theme-hint-color, #9ca3af);
}

.color-value {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 12px;
  color: var(--tg-theme-text-color, #e0e0e0);
}

.warning {
  background: rgba(255, 165, 0, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.3);
  color: #ffa500;
}

.warning h3 {
  color: #ffa500;
}

.warning p {
  color: #e0e0e0;
}

.warning code {
  background: rgba(255, 165, 0, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'SF Mono', Monaco, monospace;
  color: #ffa500;
}

.warning a {
  color: #667eea;
  text-decoration: none;
}

.warning a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .dev-container {
    padding: 15px;
  }

  .data-grid {
    grid-template-columns: 1fr;
  }

  .theme-colors {
    grid-template-columns: 1fr;
  }
}
</style>
