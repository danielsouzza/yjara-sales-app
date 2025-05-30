<template>
  <div class="custom-select-container" :class="{ 'has-error': error }">
    <label v-if="label" class="custom-select-label">{{ label }}</label>
    <div
      class="custom-select-box"
      :class="{ open: isOpen }"
      @click="toggleDropdown"
      tabindex="0"
      @keydown.enter.prevent="toggleDropdown"
    >
      <span v-if="selectedLabel" class="custom-select-value">{{ selectedLabel }}</span>
      <span v-else class="custom-select-placeholder">{{ placeholder }}</span>
      <span class="custom-select-arrow">&#9662;</span>
    </div>
    <div v-if="isOpen" class="custom-select-overlay" @click="closeDropdown"></div>
    <div
      v-if="isOpen"
      class="custom-dropdown"
      @mousedown.stop
    >
      <div v-if="searchable" class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          class="search-input"
          placeholder="Buscar..."
          @click.stop
          @input="handleSearch"
        />
      </div>
      <div
        v-for="option in filteredOptions"
        :key="option.value"
        class="custom-option"
        :class="{ selected: modelValue === option.value }"
        @mousedown.prevent="selectOption(option)"
      >
        {{ option.label }}
      </div>
      <div v-if="filteredOptions.length === 0" class="no-results">
        Nenhum resultado encontrado
      </div>
    </div>
    <span v-if="error" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: { type: String, default: 'Selecione uma opção' },
  options: { type: Array, required: true }, // [{ value, label }]
  error: Boolean,
  errorMessage: String,
  searchable: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const searchQuery = ref('')
const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }
  
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return props.options

  return props.options.filter(option => {
    const label = String(option.label).toLowerCase()
    return label.includes(query)
  })
})

const selectedLabel = computed(() => {
  const found = props.options.find(opt => opt.value === props.modelValue)
  return found ? found.label : ''
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
  }
}

function selectOption(option) {
  emit('update:modelValue', option.value)
  isOpen.value = false
  searchQuery.value = ''
}

function handleSearch(e) {
  e.stopPropagation()
  // Força a atualização do computed
  searchQuery.value = e.target.value
}

function handleClickOutside(e) {
  if (!e.target.closest('.custom-select-container')) {
    isOpen.value = false
    searchQuery.value = ''
  }
}

function closeDropdown() {
  isOpen.value = false
  searchQuery.value = ''
}

watch(isOpen, (newValue) => {
  if (!newValue) {
    searchQuery.value = ''
  }
})

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
.custom-select-container {
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
}
.custom-select-label {
  display: block;
  font-size: 0.85em;
  color: #374151;
  margin-bottom: 2px;
  margin-left: 4px;
}
.custom-select-box {
  border: 1px solid #707070;
  border-radius: 0.3rem;
  background: #fff;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  padding: 0.7rem 1rem 0.7rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  transition: border-color 0.2s;
}
.custom-select-box.open,
.custom-select-box:focus {
  border-color: #2563eb;
  outline: none;
}
.custom-select-value {
  color: #374151;
}
.custom-select-placeholder {
  color: #9ca3af;
}
.custom-select-arrow {
  margin-left: auto;
  color: #9ca3af;
  font-size: 1.1em;
  pointer-events: none;
}
.custom-dropdown {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  max-height: 220px;
  overflow-y: auto;
  margin-top: 2px;
  z-index: 9999;
}
.search-container {
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
}
.search-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.3rem;
  font-size: 0.9rem;
  outline: none;
}
.search-input:focus {
  border-color: #2563eb;
}
.custom-option {
  padding: 0.75em 1em;
  cursor: pointer;
  font-size: 0.95em;
  color: #374151;
  transition: background 0.2s;
}
.custom-option:hover {
  background: #f3f4f6;
}
.custom-option.selected {
  background: #eff6ff;
  color: #2563eb;
  font-weight: 500;
}
.has-error .custom-select-box,
.has-error .custom-select-box.open {
  border-color: #ef4444;
}
.error-message {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #ef4444;
}
.custom-select-overlay {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: transparent;
}
.no-results {
  padding: 0.75em 1em;
  color: #6b7280;
  font-size: 0.9em;
  text-align: center;
}
</style> 