<script setup lang="ts">
import { useTelegram } from '../composables/useTelegram'

const { tg, user } = useTelegram()
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>Mini App</h1>
      Coucou Coco !
      <p v-if="user">Hello {{ user.first_name }}!</p>
    </div>

    <div class="info" v-if="tg">
      <p>Platform: {{ tg.platform || 'Unknown' }}</p>
      <p>Version: {{ tg.version || 'Unknown' }}</p>
    </div>

    <button v-if="tg" @click="tg.close()" class="btn">Close App</button>
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

.btn {
  padding: 10px 20px;
  background-color: var(--tg-theme-button-color, #007aff);
  color: var(--tg-theme-button-text-color, #fff);
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
