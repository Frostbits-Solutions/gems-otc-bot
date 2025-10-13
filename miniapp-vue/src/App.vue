<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTelegram } from './composables/useTelegram'

const { tg } = useTelegram()

if (tg) {
  tg.ready()
}
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
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
