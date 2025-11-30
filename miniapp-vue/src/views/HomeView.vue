<script setup lang="ts">
import { useTelegramStore } from '../stores/telegram'
import { useRouter } from 'vue-router'

const telegramStore = useTelegramStore()
const user = telegramStore.initDataUnsafe?.user
const router = useRouter()

const goToDevView = () => {
  router.push('/dev-telegram')
}

const showComingSoon = () => {
  telegramStore.tg.showAlert('This feature doesn\'t work yet. Come back later!')
}
</script>

<template>
  <div class="container">
    <div class="header">
      <div v-if="!user" class="dev-banner">
        ⚠️ Dev Mode
      </div>
      <div class="title-wrapper">
        <h1 class="gradient-text">Gems App</h1>
        <p class="subtitle">Simple Crypto Payments</p>
      </div>

      <p class="welcome-text" v-if="user">Welcome {{ user.first_name }}! </p>
      <p class="welcome-text" v-else>Hello Dev User !</p>
      <p class="description">Easy Monetization for Telegram 💎</p>
    </div>

    <div class="otc-actions">
      <div class="wip-badge">🚧 Work In Progress</div>
      <div class="button-group">
        <button class="btn-otc btn-buy" @click="showComingSoon">
          <span class="material-symbols-outlined btn-icon">shopping_cart</span>
          <span class="btn-text">Buy OTC</span>
          <span class="btn-subtitle">Purchase crypto offers</span>
        </button>
        <button class="btn-otc btn-sell" @click="showComingSoon">
          <span class="material-symbols-outlined btn-icon">sell</span>
          <span class="btn-text">Sell OTC</span>
          <span class="btn-subtitle">Create sell offers</span>
        </button>
      </div>
    </div>

    <button @click="goToDevView" class="btn-dev-discrete">
      <span>🔧</span>
      <span>TG Data View</span>
    </button>

    <div class="footer">
      <button v-if="telegramStore.tg" @click="telegramStore.tg.close()" class="btn-close">
        Close App
      </button>
      <div class="app-info" v-if="telegramStore.tg">
        <span>v{{ telegramStore.version }} • {{ telegramStore.platform }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 30px 20px 20px;
  text-align: center;
  min-height: 100vh;
  max-height: 644px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--tg-theme-bg-color, #1a1b26);
  color: var(--tg-theme-text-color, #ffffff);
  overflow-y: auto;
}

.header {
  flex-shrink: 0;
}

.dev-banner {
  position: fixed;
  top: 10px;
  left: 10px;
  background: rgba(255, 165, 0, 0.15);
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  color: #ffa500;
  border: 1px solid rgba(255, 165, 0, 0.3);
  z-index: 10;
}

.title-wrapper {
  margin-bottom: 40px;
}

.gradient-text {
  font-size: 2.8em;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.subtitle {
  font-size: 1em;
  color: var(--tg-theme-hint-color, #9ca3af);
  margin: 8px 0 0;
  font-weight: 500;
}

.welcome-text {
  font-size: 1.4em;
  font-weight: 700;
  color: var(--tg-theme-text-color, #ffffff);
  margin: 16px 0 10px;
  letter-spacing: -0.01em;
}

.description {
  font-size: 0.95em;
  color: var(--tg-theme-hint-color, #9ca3af);
  margin: 8px 0;
  line-height: 1.4;
  font-weight: 400;
}

.app-info {
  position: fixed;
  bottom: 10px;
  right: 20px;
  font-size: 11px;
  color: var(--tg-theme-hint-color, #6b7280);
  opacity: 0.7;
}

.btn-dev-discrete {
  position: fixed;
  bottom: 10px;
  left: 10px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--tg-theme-hint-color, #9ca3af);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  cursor: pointer;
  font-size: 11px;
  opacity: 0.7;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  backdrop-filter: blur(10px);
  font-weight: 500;
}

.btn-dev-discrete:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.btn-close {
  padding: 14px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-close:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.otc-actions {
  flex-shrink: 0;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.wip-badge {
  background: rgba(255, 165, 0, 0.15);
  color: #ffa500;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid rgba(255, 165, 0, 0.3);
}

.button-group {
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
}

.btn-otc {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 95px;
}

.btn-otc:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.btn-buy:hover {
  border-color: rgba(76, 175, 80, 0.5);
  box-shadow: 0 8px 24px rgba(76, 175, 80, 0.3);
}

.btn-sell:hover {
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.btn-icon {
  font-size: 3em;
  line-height: 1;
  color: #ffffff;
}

.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 300,
  'GRAD' 0,
  'opsz' 48;
}

.btn-text {
  font-size: 1.1em;
  font-weight: 700;
  color: var(--tg-theme-text-color, #ffffff);
  letter-spacing: -0.01em;
}

.btn-subtitle {
  font-size: 0.85em;
  color: var(--tg-theme-hint-color, #9ca3af);
  font-weight: 400;
}

.footer {
  flex-shrink: 0;
  padding-top: 25px;
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
}

@media (max-width: 600px) {
  .button-group {
    padding: 0 10px;
  }
}
</style>
