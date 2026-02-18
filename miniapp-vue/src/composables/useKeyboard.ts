import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable to detect if the mobile keyboard is visible.
 * It uses the Visual Viewport API which is the most reliable way 
 * to detect keyboard presence in Telegram Mini Apps and mobile browsers.
 */
export function useKeyboard() {
  const isKeyboardVisible = ref(false)
  let initialHeight = window.visualViewport?.height || window.innerHeight

  const handleResize = () => {
    const currentHeight = window.visualViewport?.height || window.innerHeight
    
    // If the height decreases significantly (more than 20%), 
    // it's highly likely the keyboard is visible.
    // Also check if an input element is focused.
    const threshold = initialHeight * 0.8
    const isInputFocused = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')
    
    isKeyboardVisible.value = currentHeight < threshold && isInputFocused
  }

  const handleInput = (event: Event) => {
    const target = event.target
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      const type = target.getAttribute('type')
      const inputMode = target.getAttribute('inputmode')
      
      if (type === 'number' || inputMode === 'decimal' || inputMode === 'numeric') {
        const value = target.value
        if (value.includes(',')) {
          // Store cursor position
          const start = target.selectionStart
          const end = target.selectionEnd
          
          target.value = value.replace(/,/g, '.')
          
          // Restore cursor position
          if (start !== null && end !== null) {
            target.setSelectionRange(start, end)
          }
          
          // Trigger input event to update Vue's v-model if necessary
          target.dispatchEvent(new Event('input', { bubbles: true }))
        }
      }
    }
  }

  onMounted(() => {
    document.addEventListener('input', handleInput, true)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
    } else {
      window.addEventListener('resize', handleResize)
    }
  })

  onUnmounted(() => {
    document.removeEventListener('input', handleInput, true)
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', handleResize)
    } else {
      window.removeEventListener('resize', handleResize)
    }
  })

  const closeKeyboard = () => {
    if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) {
      // For numeric/decimal inputs, replace commas with dots
      const type = document.activeElement.getAttribute('type')
      const inputMode = document.activeElement.getAttribute('inputmode')
      
      if (type === 'number' || inputMode === 'decimal' || inputMode === 'numeric') {
        const value = document.activeElement.value
        if (value.includes(',')) {
          document.activeElement.value = value.replace(/,/g, '.')
          // Trigger input event to update Vue's v-model if necessary
          document.activeElement.dispatchEvent(new Event('input', { bubbles: true }))
        }
      }
      document.activeElement.blur()
    }
  }

  return {
    isKeyboardVisible,
    closeKeyboard
  }
}
