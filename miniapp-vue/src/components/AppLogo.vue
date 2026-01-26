<script setup lang="ts">
/**
 * AppLogo Component - SVG circular text with gradient
 */

// ============ CONFIGURATION ============

// Container size
const size = 200

// Text settings
const text = '• GEMS • APP • TRADE '
const fontSize = 20 // px
const letterSpacing = 0.3 // em
const fontFamily = "'Archivo Black', sans-serif"

// Circle settings
const circleRadius = 60 // Distance from center (smaller = closer to logo)

// Gradient colors (purple to blue)
const gradientStart = '#a855f7' // Purple
const gradientEnd = '#3b82f6' // Blue

// Logo settings
const logoSize = 80 // px
const logoGlowColor = 'rgba(59,130,246,0.6)'
const logoGlowSize = 25 // px

// Animation settings
const fadeInDuration = 2 // seconds
const spinDuration = 3 // seconds
const spinRotation = 384 // degrees

// ============ COMPUTED VALUES ============
const center = size / 2
const circlePath = `M ${center}, ${center} m -${circleRadius}, 0 a ${circleRadius},${circleRadius} 0 1,1 ${circleRadius * 2},0 a ${circleRadius},${circleRadius} 0 1,1 -${circleRadius * 2},0`
</script>

<template>
  <div
    class="relative inline-flex items-center justify-center logo-fade-in"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      '--fade-duration': `${fadeInDuration}s`,
      '--spin-duration': `${spinDuration}s`,
      '--spin-rotation': `${spinRotation}deg`,
    }"
  >
    <!-- Circular Text using SVG textPath with gradient -->
    <svg
      :width="size"
      :height="size"
      :viewBox="`0 0 ${size} ${size}`"
      class="absolute inset-0 logo-spin"
    >
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :stop-color="gradientStart" />
          <stop offset="100%" :stop-color="gradientEnd" />
        </linearGradient>
        <path id="circlePath" :d="circlePath" fill="none" />
      </defs>
      <text
        fill="url(#textGradient)"
        :font-family="fontFamily"
        font-weight="400"
        :font-size="`${fontSize}px`"
        :letter-spacing="`${letterSpacing}em`"
      >
        <textPath href="#circlePath">{{ text }}</textPath>
      </text>
    </svg>

    <!-- Center Gem Icon -->
    <div class="absolute inset-0 flex items-center justify-center z-10">
      <img
        src="/gem_icon.png"
        alt="Gem"
        class="object-contain"
        :style="{
          width: `${logoSize}px`,
          height: `${logoSize}px`,
          filter: `drop-shadow(0 0 ${logoGlowSize}px ${logoGlowColor})`,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes spin-slowdown {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(var(--spin-rotation));
  }
}

.logo-spin {
  animation: spin-slowdown var(--spin-duration) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.logo-fade-in {
  animation: fade-in var(--fade-duration) ease-out forwards;
}
</style>
