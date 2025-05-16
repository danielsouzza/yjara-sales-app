<template>
  <div class="cartoes-viagem">
    <div
      v-for="viagem in viagens"
      :key="viagem.id"
    >
      <StepViagemCard :viagem="viagem" @selecionar="$emit('selecionar', viagem)" />
      
    </div>
  </div>
</template>

<script setup>
import StepViagemCard from './StepViagemCard.vue';
defineProps(['viagens']);
defineEmits(['selecionar']);
</script>
