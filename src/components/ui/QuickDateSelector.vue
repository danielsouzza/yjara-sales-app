<template>
  <div class="tw-w-full tw-bg-gray-50 tw-rounded-xl tw-mb-3 tw-px-3 tw-py-2">
    <div class="tw-flex tw-gap-4 tw-items-center tw-justify-center tw-p-2 tw-text-xs">
      <button
        v-for="date in days"
        :key="date.getTime()"
        @click="selectDate(date)"
        :class="[
          'tw-font-semibold tw-px-4 tw-py-2 tw-rounded-lg tw-border tw-transition',
          isSelected(date)
            ? 'tw-bg-indigo-700 tw-text-white tw-border-primary'
            : 'tw-bg-white tw-text-primary tw-border-primary'
        ]"
      >
        {{ formatDates(date) }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const props = defineProps({
  modelValue: [Date, String, Number, null],
  minDate: { type: [Date, String, Number], default: null },
  maxDate: { type: [Date, String, Number], default: null },
  type: { type: String, default: 'ida' }
});
const emit = defineEmits(['update:modelValue', 'select']);

const isLargeScreen = ref(false);

onMounted(() => {
  isLargeScreen.value = window.innerWidth >= 1024;
  window.addEventListener('resize', () => {
    isLargeScreen.value = window.innerWidth >= 1024;
  });
});

function formatDates(date) {
  return date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit' }).replace('.', '').toUpperCase();
}

function isSelected(date) {
  if (!props.modelValue) return false;
  return new Date(props.modelValue).toDateString() === date.toDateString();
}

const days = computed(() => {
  let dateCurrent = props.modelValue ? new Date(props.modelValue) : new Date();
  let min = props.minDate ? new Date(props.minDate) : new Date();
  min.setHours(0, 0, 0, 0);

  if (dateCurrent < min) dateCurrent = min;

  let futureDates = [];
  let start = isLargeScreen.value ? -3 : -1;
  let end = isLargeScreen.value ? 4 : 2;

  while (start < 0) {
    let pastDate = new Date(dateCurrent);
    pastDate.setDate(dateCurrent.getDate() + start);
    if (pastDate < min) {
      start++;
    } else {
      break;
    }
  }

  for (let i = start; i < end; i++) {
    let futureDate = new Date(dateCurrent);
    futureDate.setDate(dateCurrent.getDate() + i);
    if (props.maxDate && futureDate > new Date(props.maxDate)) break;
    futureDates.push(futureDate);
  }
  return futureDates;
});

function selectDate(date) {
  emit('update:modelValue', date);
  emit('select', date);
}
</script> 