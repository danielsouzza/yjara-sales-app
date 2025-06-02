<template>
  <div class="date-select">
    <label v-if="label" class="date-select-label">{{ label }}</label>
    <div class="date-select-input-wrapper" @click="open = true">
      <span class="date-select-icon">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#6f6ee8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      </span>
      <input
        :value="displayValue"
        :placeholder="placeholder"
        class="date-select-input"
        readonly
      />
    </div>
    <Datepicker
      v-model="innerValue"
      :min-date="minDate"
      :max-date="maxDate"
      :format="formatDate"
      :teleport="true"
      :open="open"
      @closed="open = false"
      @update:modelValue="onSelect"
      class="date-select-datepicker"
      :input-class="'date-select-hide-input'"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits, defineAsyncComponent } from 'vue';
const Datepicker = defineAsyncComponent(() => import('@vuepic/vue-datepicker'));
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const props = defineProps({
  modelValue: [Date, String, Number, null],
  minDate: { type: [Date, String, Number], default: null },
  maxDate: { type: [Date, String, Number], default: null },
  label: String,
  placeholder: { type: String, default: 'Selecione uma data' },
  format: { type: String, default: 'dd/MM/yyyy' }
});
const emit = defineEmits(['update:modelValue']);

const open = ref(false);
const innerValue = ref(props.modelValue ? new Date(props.modelValue) : null);

watch(() => props.modelValue, (val) => {
  innerValue.value = val ? new Date(val) : null;
});

function onSelect(val) {
  emit('update:modelValue', val);
  open.value = false;
}

const displayValue = computed(() => {
  if (!innerValue.value) return '';
  return format(innerValue.value, props.format, { locale: ptBR });
});

function formatDate(date) {
  return format(date, props.format, { locale: ptBR });
}
</script>

<style scoped>
.date-select {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.date-select-label {
  font-size: 1rem;
  font-weight: 600;
  color: #6f6ee8;
  margin-bottom: 0.25rem;
}
.date-select-input-wrapper {
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
.date-select-input-wrapper:focus-within, .date-select-input-wrapper:hover {
  border: 1.5px solid #6f6ee8;
}
.date-select-icon {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}
.date-select-input {
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
.date-select-input::placeholder {
  color: #b0b0b0;
  opacity: 1;
}
.date-select-hide-input {
  display: none !important;
}
</style> 