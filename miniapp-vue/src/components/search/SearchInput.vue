<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  close: []
}>()

const inputRef = ref<HTMLInputElement | null>(null)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <div
    class="sticky top-0 z-20 w-full px-4 pt-4 pb-2 bg-black/80 backdrop-blur-xl border-b border-white/5"
  >
    <div class="relative flex items-center gap-3">
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5 text-gray-400" />
        </div>
        <input
          ref="inputRef"
          type="text"
          :value="modelValue"
          placeholder="Search ticker..."
          class="w-full h-11 pl-10 pr-4 bg-white/10 border-none rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-primary/50 transition-all outline-none text-base"
          @input="handleInput"
        />
      </div>
      <button
        class="text-brand-primary font-medium px-2 py-1 transition-opacity active:opacity-50"
        @click="emit('close')"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
