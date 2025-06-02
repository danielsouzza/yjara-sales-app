<template>
  <div class="custom-select custom-select-container">
    <label v-if="label" class="custom-select-label">{{ label }}</label>
    <div class="custom-select-input-wrapper" @click.stop="toggleDropdown" :class="{ 'is-open': open }" ref="inputWrapperRef">
      <span class="custom-select-icon">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#00579d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </span>
      <input
        :value="displayLabel"
        :placeholder="placeholder"
        class="custom-select-input"
        readonly
        :required="required"
      />
    </div>
    <div v-if="open" class="custom-select-dropdown" :class="{'open-top': dropdownPosition === 'top', 'open-bottom': dropdownPosition === 'bottom'}" @click.stop>
      <div v-if="searchable" class="custom-select-search">
        <span class="custom-select-search-icon">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/></svg>
        </span>
        <input v-model="search" type="text" :placeholder="'Buscar...'" class="custom-select-search-input" />
      </div>
      <div class="custom-select-options">
        <div
          v-for="opt in filteredOptions"
          :key="opt.value"
          class="custom-select-option"
          :class="{ 'is-selected': opt.value === modelValue }"
          @click="selectOption(opt.value)"
        >
          {{ opt.label }}
        </div>
        <div v-if="filteredOptions.length === 0" class="custom-select-no-options">Nenhuma opção encontrada</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
const props = defineProps({
  modelValue: [String, Number, null],
  options: { type: Array, default: () => [] }, // [{ value, label }]
  label: String,
  placeholder: { type: String, default: 'Selecione...' },
  searchable: { type: Boolean, default: true },
  required: { type: Boolean, default: false }
});
const emit = defineEmits(['update:modelValue']);

const open = ref(false);
const search = ref('');
const inputWrapperRef = ref(null);
const dropdownPosition = ref('bottom');

const displayLabel = computed(() => {
  const found = props.options.find(opt => opt.value === props.modelValue);
  return found ? found.label : '';
});

const filteredOptions = computed(() => {
  if (!search.value) return props.options;
  return props.options.filter(opt => opt.label.toLowerCase().includes(search.value.toLowerCase()));
});

function toggleDropdown() {
  open.value = !open.value;
  if (open.value) {
    
    nextTick(() => {
      const inputEl = document.querySelector('.custom-select-input-wrapper');
      if (!inputEl) return;
      const inputRect = inputEl.getBoundingClientRect();
      const spaceBelow = window.innerHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;
      // Considera 240px como altura mínima do dropdown
      if (spaceBelow < 320 && spaceAbove > spaceBelow) {
        dropdownPosition.value = 'top';
      } else {
        dropdownPosition.value = 'bottom';
      }
    });
  }
}
function selectOption(val) {
  emit('update:modelValue', val);
  open.value = false;
  search.value = '';
}

function handleClickOutside(e) {
  if (!e.target.closest('.custom-select-container')) {
    open.value = false;
    search.value = '';
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<style>
.custom-select {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;
}
.custom-select-label {
  font-size: 1rem;
  font-weight: 600;
  color: #00579d;
  margin-bottom: 0.25rem;
}
.custom-select-input-wrapper {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 9999px;
  box-shadow: 0 1px 4px 0 rgba(160, 174, 192, 0.08);
  padding: 0.25rem 1rem 0.25rem 0.75rem;
  border: 1.5px solid #f3f4f6;
  transition: border 0.2s;
  cursor: pointer;
}
.custom-select-input-wrapper.is-open, .custom-select-input-wrapper:focus-within, .custom-select-input-wrapper:hover {
  border: 1.5px solid #00579d;
}
.custom-select-icon {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}
.custom-select-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #333;
  width: 100%;
  padding: 0.5rem 0;
  font-weight: 500;
  cursor: pointer;
}
.custom-select-input::placeholder {
  color: #b0b0b0;
  opacity: 1;
}
.custom-select-dropdown {
  position: absolute;
  left: 0;
  z-index: 30;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 8px 32px 0 rgba(80, 80, 160, 0.18);
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  min-width: 220px;
  max-width: 100vw;
  animation: fadein 0.2s;
}
.custom-select-dropdown.open-bottom {
  top: 110%;
  bottom: auto;
}
.custom-select-dropdown.open-top {
  bottom: 110%;
  top: auto;
}
.custom-select-search {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 9999px;
  padding: 0.25rem 1rem 0.25rem 0.75rem;
  margin-bottom: 0.5rem;
}
.custom-select-search-icon {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}
.custom-select-search-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #333;
  width: 100%;
  padding: 0.5rem 0;
  font-weight: 500;
}
.custom-select-options {
  max-height: 180px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.custom-select-option {
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
  transition: background 0.15s, color 0.15s;
}
.custom-select-option.is-selected {
  background: #00579d;
  color: #fff;
}
.custom-select-option:hover:not(.is-selected) {
  background: #a18fff22;
}
.custom-select-no-options {
  text-align: center;
  color: #b0b0b0;
  padding: 0.75rem 0;
  font-size: 0.95rem;
}
@keyframes fadein {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 