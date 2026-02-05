<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTelegramStore } from '@/stores/telegram'
import { useKeyboard } from '@/composables/useKeyboard'

interface Props {
  showGoBack?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showGoBack: false,
})

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
      class="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 pointer-events-none"
    />

    <!-- Back Button (Bottom Left) -->
    <div
      v-if="showGoBack && !isKeyboardVisible"
      class="fixed bottom-4 left-4 animate-fade-in pointer-events-auto"
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
    <div v-if="!isKeyboardVisible" class="fixed bottom-4 right-4 pointer-events-auto">
      <UButton
        icon="i-heroicons-x-mark"
        size="md"
        color="neutral"
        variant="soft"
        class="rounded-full w-10 h-10 flex items-center justify-center bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all shadow-lg"
        @click="handleClose"
      />
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
