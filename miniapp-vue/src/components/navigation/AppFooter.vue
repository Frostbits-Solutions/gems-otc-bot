<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTelegramStore } from '@/stores/telegram'
import { useKeyboard } from '@/composables/useKeyboard'

interface Props {
  showGoBack?: boolean
  showSearch?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showGoBack: false,
  showSearch: false,
})

const emit = defineEmits<{
  'search-click': []
}>()

const router = useRouter()
const telegramStore = useTelegramStore()
const { isKeyboardVisible } = useKeyboard()

const handleBack = () => {
  router.push('/')
}

const handleClose = () => {
  if (telegramStore.tg) {
    telegramStore.tg.close()
  } else {
    // Fallback for browser
    console.log('Close button clicked (fallback)')
  }
}
</script>

<template>
  <div class="z-50 pointer-events-none">
    <!-- Bottom Gradient Overlay -->
    <div
      v-if="!isKeyboardVisible"
      class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 pointer-events-none"
    />

    <!-- Back Button (Bottom Left) -->
    <div
      v-if="showGoBack && !isKeyboardVisible"
      class="absolute bottom-4 left-4 animate-fade-in pointer-events-auto"
    >
      <UButton
        icon="i-heroicons-arrow-left"
        size="md"
        color="neutral"
        variant="soft"
        class="rounded-full w-10 h-10 flex items-center justify-center bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all shadow-lg"
        @click="handleBack"
      />
    </div>

    <!-- Close Button (Bottom Right) -->
    <div v-if="!isKeyboardVisible" class="absolute bottom-4 right-4 pointer-events-auto">
      <UButton
        icon="i-heroicons-x-mark"
        size="md"
        color="neutral"
        variant="soft"
        class="rounded-full w-10 h-10 flex items-center justify-center bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all shadow-lg"
        @click="handleClose"
      />
    </div>

    <!-- Reduced Search Bar (Bottom Center) -->
    <div
      v-if="showSearch && !isKeyboardVisible"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 w-[220px] animate-fade-in pointer-events-auto"
    >
      <div
        class="relative flex items-center h-10 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-gray-400 cursor-text hover:bg-white/15 transition-all group active:scale-[0.98]"
        @click="emit('search-click')"
      >
        <UIcon
          name="i-heroicons-magnifying-glass"
          class="w-4 h-4 mr-2 text-gray-500 group-hover:text-gray-300"
        />
        <span class="text-xs font-medium">Search tickers...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rounded-full {
  border-radius: 9999px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
