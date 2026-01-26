<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
</script>

<template>
  <div class="w-full max-w-xs">
    <UInput
      v-model="searchQuery"
      disabled
      placeholder="Search"
      icon="i-heroicons-magnifying-glass"
      size="sm"
      variant="none"
      :ui="{
        base: 'rounded-full bg-white/10 border-0',
      }"
      class="transition-all duration-200 [&_input]:text-white [&_input]:placeholder-purple-300/50 [&_input:focus]:ring-1 [&_input:focus]:ring-purple-500/50 [&_input:focus]:bg-white/15"
    />
  </div>
</template>
