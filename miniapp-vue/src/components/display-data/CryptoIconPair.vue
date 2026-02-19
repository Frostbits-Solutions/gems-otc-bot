<script setup lang="ts">
import { computed } from 'vue'
import { getCryptoIconByAsaId } from '@/utils/cryptoIcons'

interface Props {
  baseAsaId: number
  quoteAsaId: number
  size?: 'small' | 'medium'
  sided?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'small',
  sided: false,
})

const baseIcon = computed(() => getCryptoIconByAsaId(props.baseAsaId))
const quoteIcon = computed(() => getCryptoIconByAsaId(props.quoteAsaId))
</script>

<template>
  <div class="icon-pair" :class="[`size-${size}`, { sided }]">
    <img :src="baseIcon" alt="" class="icon icon-base" />
    <img :src="quoteIcon" alt="" class="icon icon-quote" />
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
  width: 52px;
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
</style>
