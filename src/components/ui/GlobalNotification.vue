<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="[
        'tw-fixed tw-top-6 tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-z-[99999] tw-px-6 tw-py-3 tw-rounded tw-shadow-lg tw-text-white tw-font-bold tw-text-center',
        type === 'success' ? 'tw-bg-green-600' : 'tw-bg-red-600'
      ]"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const type = ref('success')
let timeout = null

function show(msg, t = 'success', duration = 3000) {
  message.value = msg
  type.value = t
  visible.value = true
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    visible.value = false
  }, duration)
}

// Permite disparar de qualquer lugar
if (typeof window !== 'undefined') {
  window.$notify = show
}

defineExpose({ show })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 