<script setup lang="ts">
import { useKeyboard } from '@/composables/useKeyboard'

const { isKeyboardVisible, closeKeyboard } = useKeyboard()
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="isKeyboardVisible"
      class="fixed bottom-2 left-0 right-0 z-[100] flex items-center justify-center pointer-events-none"
    >
      <UButton
        icon="i-heroicons-check"
        variant="soft"
        color="neutral"
        class="w-20 h-8 rounded-lg flex items-center justify-center bg-white/10 text-white/90 backdrop-blur-md border border-white/10 hover:bg-white/20 active:scale-95 transition-all shadow-lg pointer-events-auto"
        @click="closeKeyboard"
      />
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.2s linear;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
