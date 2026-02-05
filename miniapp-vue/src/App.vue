<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTelegramStore } from './stores/telegram'
import KeyboardAccessoryBar from '@/components/navigation/KeyboardAccessoryBar.vue'

const telegramStore = useTelegramStore()

if (telegramStore.tg) {
  telegramStore.tg.ready()
}
</script>

<template>
  <UApp>
    <RouterView />
    <KeyboardAccessoryBar />
  </UApp>
</template>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--tg-theme-bg-color, #fff);
  color: var(--tg-theme-text-color, #000);
  margin: 0;
  padding: 0;
}
</style>
