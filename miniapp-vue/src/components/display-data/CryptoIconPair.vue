<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { getCryptoIconAsync } from '@/utils/cryptoIcons'

interface Props {
  baseTicker: string
  quoteTicker: string
  size?: 'small' | 'medium'
  sided?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'small',
  sided: false,
})

const baseIcon = ref('')
const quoteIcon = ref('')
const loading = ref(true)

const loadIcons = async () => {
  loading.value = true
  const [base, quote] = await Promise.all([
    getCryptoIconAsync(props.baseTicker),
    getCryptoIconAsync(props.quoteTicker),
  ])
  baseIcon.value = base
  quoteIcon.value = quote
  loading.value = false
}

onMounted(loadIcons)

watch([() => props.baseTicker, () => props.quoteTicker], loadIcons)
</script>

<template>
  <div class="icon-pair" :class="[`size-${size}`, { sided }]">
    <div v-if="loading || !baseIcon" class="icon icon-base skeleton" />
    <img v-else :src="baseIcon" :alt="baseTicker" class="icon icon-base" />
    <div v-if="loading || !quoteIcon" class="icon icon-quote skeleton" />
    <img v-else :src="quoteIcon" :alt="quoteTicker" class="icon icon-quote" />
  </div>
</template>

<style scoped>
.icon-pair {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.icon {
  border-radius: 50%;
  border: 2px solid rgba(168, 85, 247, 0.3);
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.icon-base {
  position: relative;
  z-index: 2;
}

.icon-quote {
  position: relative;
  z-index: 1;
}

/* Small size */
.size-small {
  width: 44px;
}

.size-small .icon {
  width: 32px;
  height: 32px;
}

.size-small .icon-quote {
  margin-left: -12px;
}

/* Medium size */
.size-medium {
  width: 88px;
}

.size-medium .icon {
  width: 64px;
  height: 64px;
  border-width: 3px;
}

.size-medium .icon-quote {
  margin-left: -24px;
}

/* Sided mode */
.sided .icon-quote {
  margin-left: 8px;
}

/* Skeleton loading */
.skeleton {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
