<template>
  <div class="date-select-custom">
    <label v-if="label" class="date-select-label">{{ label }}</label>
    <div class="date-select-input-wrapper" @click="toggleCalendar">
      <span class="date-select-icon">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="gray" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      </span>
      <input
        :value="displayValue"
        :placeholder="placeholder"
        class="date-select-input"
        @input="handleInput"
        @blur="validateAndUpdateDate"
      />
    </div>
    <div v-if="showCalendar" class="date-select-calendar" :class="{'open-top': calendarPosition === 'top', 'open-bottom': calendarPosition === 'bottom'}" @click.stop>
      <div class="date-select-calendar-header">
        <div class="date-select-month-year">
          <CustomSelect
            v-model="selectedMonth"
            :options="monthOptions"
            :searchable="false"
            class="calendar-mini-select"
          />
          <CustomSelect
            v-model="selectedYear"
            :options="yearOptions"
            :searchable="false"
            class="calendar-mini-select"
          />
        </div>
        <div class="date-select-nav-buttons">
          <button class="date-select-calendar-nav" @click="prevMonth" :disabled="isPrevDisabled">&#8592;</button>
          <button class="date-select-calendar-nav" @click="nextMonth">&#8594;</button>
        </div>
      </div>
      <div class="date-select-calendar-grid">
        <div class="date-select-calendar-day" v-for="d in weekDays" :key="d">{{ d }}</div>
        <div
          v-for="(cell, idx) in calendarCells"
          :key="idx"
          class="date-select-calendar-cell"
          :class="{
            'is-today': isToday(cell),
            'is-selected': isSelected(cell),
            'is-disabled': isDisabled(cell)
          }"
          @click="selectDate(cell)"
        >
          {{ cell > 0 ? cell : '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { format, startOfMonth, endOfMonth, getDay, addMonths, subMonths, isSameDay, isToday as isTodayFn, isBefore, parse, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import CustomSelect from './CustomSelect.vue';

const props = defineProps({
  modelValue: [Date, String, Number, null],
  minDate: { type: [Date, String, Number], default: null },
  label: String,
  placeholder: { type: String, default: 'Selecione uma data' },
  format: { type: String, default: 'dd/MM/yyyy' }
});
const emit = defineEmits(['update:modelValue']);

const showCalendar = ref(false);
const selected = ref(props.modelValue ? new Date(props.modelValue) : null);
const today = new Date();
const calendarDate = ref(selected.value ? new Date(selected.value) : new Date());
const calendarPosition = ref('bottom');

// Inicializa os selects com o mês/ano atual ou da data selecionada
const selectedMonth = ref(selected.value ? selected.value.getMonth() : today.getMonth());
const selectedYear = ref(selected.value ? selected.value.getFullYear() : today.getFullYear());

function syncMonthYearFromDate(date) {
  if (!date || isNaN(date.getTime())) return;

  selectedMonth.value = date.getMonth();
  selectedYear.value = date.getFullYear();
}

function toggleCalendar() {
  showCalendar.value = !showCalendar.value;
  syncMonthYearFromDate(calendarDate.value);
  if (showCalendar.value) {
    // Sincroniza selects com o mês/ano do calendário ao abrir
    nextTick(() => {
      const inputEl = document.querySelector('.date-select-input-wrapper');
      if (!inputEl) return;
      const inputRect = inputEl.getBoundingClientRect();
      const spaceBelow = window.innerHeight - inputRect.bottom;
      const spaceAbove = inputRect.top;
      // Considera 320px como altura mínima do calendário
      if (spaceBelow < 320 && spaceAbove > spaceBelow) {
        calendarPosition.value = 'top';
      } else {
        calendarPosition.value = 'bottom';
      }
    });
  }
}

function closeCalendar() {
  showCalendar.value = false;
}

onMounted(() => {
  document.addEventListener('click', closeCalendar);
});

function prevMonth(e) {
  e.stopPropagation();
  calendarDate.value = subMonths(calendarDate.value, 1);
}
function nextMonth(e) {
  e.stopPropagation();
  calendarDate.value = addMonths(calendarDate.value, 1);
}

const monthYear = computed(() => {
  return format(calendarDate.value, 'MMMM yyyy', { locale: ptBR });
});

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const calendarCells = computed(() => {
  const start = startOfMonth(calendarDate.value);
  const end = endOfMonth(calendarDate.value);
  const startDay = getDay(start); // 0 (domingo) - 6 (sábado)
  const daysInMonth = end.getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(0);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(0);
  return cells;
});

function selectDate(day) {
  if (!day) return;
  const date = new Date(calendarDate.value.getFullYear(), calendarDate.value.getMonth(), day);
  if (isDisabled(day)) return;
  selected.value = date;
  emit('update:modelValue', date);
  showCalendar.value = false;
}

function isSelected(day) {
  if (!day || !selected.value) return false;
  return isSameDay(new Date(calendarDate.value.getFullYear(), calendarDate.value.getMonth(), day), selected.value);
}
function isToday(day) {
  if (!day) return false;
  return isTodayFn(new Date(calendarDate.value.getFullYear(), calendarDate.value.getMonth(), day));
}
function isDisabled(day) {
  if (!day) return true;
  if (!props.minDate) return false;
  const min = new Date(props.minDate);
  const date = new Date(calendarDate.value.getFullYear(), calendarDate.value.getMonth(), day);
  return isBefore(date, min);
}
const isPrevDisabled = computed(() => {
  if (!props.minDate) return false;
  const min = new Date(props.minDate);
  const prevMonthEnd = endOfMonth(subMonths(calendarDate.value, 1));
  return prevMonthEnd < min;
});

const displayValue = computed(() => {
  if (!selected.value) return '';
  return format(selected.value, props.format, { locale: ptBR });
});

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];
const monthOptions = months.map((m, i) => ({ value: i, label: m }));
const years = Array.from({ length: 201 }, (_, i) => 1900 + i);
const yearOptions = years.map(y => ({ value: y, label: y.toString() }));

function updateCalendarDate() {
  calendarDate.value = new Date(selectedYear.value, selectedMonth.value, 1);
}

watch(() => props.modelValue, (val) => {
  if (val) {
    const newDate = new Date(val);
    selected.value = newDate;
    calendarDate.value = newDate;
    syncMonthYearFromDate(newDate);
  } else {
    selected.value = null;
    calendarDate.value = new Date();
    syncMonthYearFromDate(new Date());
  }
}, { immediate: true });

function handleInput(event) {
  const value = event.target.value;
  // Aplica máscara de data (dd/mm/yyyy)
  let masked = value.replace(/\D/g, '');
  if (masked.length > 0) {
    masked = masked.replace(/^(\d{2})(\d)/, '$1/$2');
    if (masked.length > 3) {
      masked = masked.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    }
  }
  event.target.value = masked;
}

function validateAndUpdateDate(event) {
  const value = event.target.value;
  if (!value) return;

  const [day, month, year] = value.split('/').map(Number);
  if (!day || !month || !year) return;

  const date = new Date(year, month - 1, day);
  if (isValid(date) && !isDisabled(day)) {
    selected.value = date;
    calendarDate.value = date;
    syncMonthYearFromDate(date);
    emit('update:modelValue', date);
  } else {
    // Se a data for inválida, restaura o valor anterior
    event.target.value = displayValue.value;
  }
}
</script>

<style scoped>
.date-select-custom {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;
}
.date-select-label {
  font-size: 1rem;
  font-weight: 600;
  color: #00579d;
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
  cursor: text;
}
.date-select-input::placeholder {
  color: #b0b0b0;
  opacity: 1;
}
.date-select-calendar {
  position: absolute;
  left: 0;
  z-index: 20;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 8px 32px 0 rgba(80, 80, 160, 0.18);
  padding: 1rem;
  min-width: 270px;
  max-width: 100vw;
  animation: fadein 0.2s;
}
.date-select-calendar.open-bottom {
  top: 110%;
  bottom: auto;
}
.date-select-calendar.open-top {
  bottom: 110%;
  top: auto;
}
.date-select-calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}
.date-select-calendar-title {
  font-weight: 700;
  color: #6f6ee8;
  font-size: 1rem;
}
.date-select-calendar-nav {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #6f6ee8;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  transition: background 0.2s;
}
.date-select-calendar-nav:disabled {
  color: #ccc;
  cursor: not-allowed;
}
.date-select-calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
}
.date-select-calendar-day {
  text-align: center;
  font-size: 0.9rem;
  color: #a0aec0;
  font-weight: 600;
  padding-bottom: 0.2rem;
}
.date-select-calendar-cell {
  text-align: center;
  font-size: 1rem;
  padding: 0.4rem 0;
  border-radius: 0.5rem;
  cursor: pointer;
  background: none;
  color: #333;
  transition: background 0.15s, color 0.15s;
}
.date-select-calendar-cell.is-today {
  border: 1.5px solid #6f6ee8;
}
.date-select-calendar-cell.is-selected {
  background: #6f6ee8;
  color: #fff;
}
.date-select-calendar-cell.is-disabled {
  color: #ccc;
  pointer-events: none;
  background: none;
}
.date-select-calendar-cell:hover:not(.is-disabled) {
  background: #a18fff22;
}
@keyframes fadein {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.date-select-month-year {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.date-select-month {
  padding: 0.25rem 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: white;
  color: #4a5568;
  font-size: 0.9rem;
  cursor: pointer;
}

.date-select-year {
  width: 90px;
  padding: 0.25rem 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: white;
  color: #4a5568;
  font-size: 0.9rem;
  cursor: pointer;
}

.date-select-nav-buttons {
  display: flex;
  gap: 0.5rem;
}

:deep(.calendar-mini-select .custom-select-input-wrapper) {
  min-width: 60px !important;
  max-width: 90px !important;
  padding: 0.1rem 0.2rem 0.1rem 0.2rem !important;
}
:deep(.calendar-mini-select .custom-select-input) {
  font-size: 0.95rem !important;
  padding: 0.2rem 0 !important;
}
:deep(.calendar-mini-select .custom-select-label) {
  font-size: 0.85rem !important;
  margin-bottom: 0 !important;
}
:deep(.calendar-mini-select .custom-select-icon) {
  display: none !important;
}
</style> 