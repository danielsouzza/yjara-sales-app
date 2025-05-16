<template>
  <f7-page name="home">
    <!-- Navbar -->
    <f7-navbar>
      <f7-nav-title>Trechos de Viagem</f7-nav-title>
    </f7-navbar>
    
    <StepEscolherViagem
      v-if="step === 1"
      :viagens="viagens.trechos?.data"
      @selecionar="selecionarViagem"
    ></StepEscolherViagem>

    <StepSelecionarComodo :viagem="viagemSelecionada" v-else-if="step === 2">
  
  
    </StepSelecionarComodo>

    <!-- Loading -->
    <f7-preloader v-if="loading" />

    <!-- Mensagem de erro -->
    <f7-block v-if="error" class="text-color-red">
      {{ error }}
    </f7-block>
  </f7-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ViagemService } from '@/js/services/ViagemService';
import StepEscolherViagem from '@/components/steps/StepEscolherViagem.vue';
import StepSelecionarComodo from '@/components/steps/StepSelecionarComodo.vue';

const step = ref(1);
const viagemSelecionada = ref(null);
const viagens = ref([]);
const loading = ref(false);
const error = ref(null);

const carregarViagens = async () => {
  loading.value = true;
  error.value = null;
  ViagemService.getTrechosViagem().then(response => {
      viagens.value = response.data.data;
      loading.value = false;
    });
};

function selecionarViagem(viagem) {
  viagemSelecionada.value = viagem;
  step.value = 2;
}

function voltar() {
  step.value = 1;
  viagemSelecionada.value = null;
}

onMounted(() => {
  carregarViagens();
});
</script>

<style scoped>

</style>