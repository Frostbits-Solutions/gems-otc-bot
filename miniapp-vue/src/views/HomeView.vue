<script setup lang="ts">
import { useTelegramStore } from '../stores/telegram'
import { useRouter } from 'vue-router'

const telegramStore = useTelegramStore()
const user = telegramStore.initDataUnsafe?.user
const router = useRouter()

const goToDevView = () => {
  router.push('/dev-telegram')
}
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>Mini App</h1>
      Coucou Coco !
      <p v-if="user">Hello {{ user.first_name }}!</p>
    </div>

    <div class="info" v-if="telegramStore.tg">
      <p>Platform: {{ telegramStore.platform || 'Unknown' }}</p>
      <p>Version: {{ telegramStore.version || 'Unknown' }}</p>
    </div>

    <div class="actions">
      <button @click="goToDevView" class="btn btn-dev">🔧 Dev: View Telegram Data</button>
      <button v-if="telegramStore.tg" @click="telegramStore.tg.close()" class="btn btn-close">Close App</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}

.header {
  margin-bottom: 20px;
}

.header h1 {
  color: var(--tg-theme-text-color, #000);
  margin-bottom: 10px;
}

.header p {
  color: var(--tg-theme-hint-color, #666);
}

.info {
  margin: 20px 0;
  padding: 15px;
  background-color: var(--tg-theme-secondary-bg-color, #f5f5f5);
  border-radius: 8px;
}

.info p {
  margin: 5px 0;
  color: var(--tg-theme-text-color, #000);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 12px 24px;
  background-color: var(--tg-theme-button-color, #007aff);
  color: var(--tg-theme-button-text-color, #fff);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.8;
}

.btn-dev {
  background-color: #6c757d;
}

.btn-close {
  background-color: var(--tg-theme-button-color, #007aff);
}
</style>
