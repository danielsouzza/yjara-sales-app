<template>
  <div class="tw-flex tw-flex-col tw-items-center">
    <div class="tw-w-full tw-max-w-[900px] tw-mx-4">
      <div class="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6">
        <h2 class="tw-text-2xl tw-font-bold tw-mb-6">Dados dos Passageiros</h2>
        
        <!-- Resumo da Viagem -->
        <div class="tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-mb-6">
          <h3 class="tw-font-bold tw-text-gray-800 tw-mb-3">Resumo da Viagem</h3>
          <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
            <div>
              <p class="tw-text-sm tw-text-gray-600">Origem: {{ viagem.municipio_origem.nome }}/{{ viagem.municipio_origem.uf }}</p>
              <p class="tw-text-sm tw-text-gray-600">Destino: {{ viagem.municipio_destino.nome }}/{{ viagem.municipio_destino.uf }}</p>
              <p class="tw-text-sm tw-text-gray-600">Data: {{ formatDate(viagem.data_embarque) }}</p>
            </div>
            <div>
              <p class="tw-text-sm tw-text-gray-600">Duração: {{ formatarTempoViagem(viagem.tempo_viagem) }}</p>
              <p class="tw-text-sm tw-text-gray-600">Embarcação: {{ viagem.embarcacao }}</p>
            </div>
          </div>
        </div>

        <!-- Formulário de Passageiros -->
        <form @submit.prevent="submitForm" class="tw-space-y-6">
          <FormPassenger
            v-for="(passageiro, index) in dataSale.dataComodos"
            :key="index"
            :form="passageiro"
            :index="index"
            :tipos-doc="tiposDoc"
            @add-comodo="addComodoRelated"
            @remove-passageiro="removerPassageiro"
            @add-to-contact="addToContact(index)"
            @remove-from-contact="removeFromContact(index)"
          />

          <!-- Dados de Contato -->
          <div class="tw-bg-white tw-shadow-md tw-rounded-xl tw-p-6 tw-border tw-border-gray-100">
            <h3 class="tw-font-bold tw-text-lg tw-text-gray-800 tw-mb-6">Dados para Contato</h3>
            
            <div class="tw-space-y-6">
              <!-- Nome para Contato -->
              <div>
                <label class="tw-block tw-text-xs tw-font-normal tw-text-[#374151] tw-mb-1">Nome para Contato</label>
                <div class="tw-border tw-rounded tw-bg-white tw-px-4 tw-py-3 tw-border-[#bdbdbd]">
                  <input
                    type="text"
                    v-model="props.dataSale.contato.nome"
                    placeholder="Digite seu nome"
                    required
                    class="tw-w-full tw-bg-transparent tw-border-none tw-outline-none tw-h-[28px] tw-placeholder:text-[#9ca3af] tw-text-base focus:tw-border-none focus:tw-outline-none focus:tw-ring-0"
                  />
                </div>
              </div>

              <!-- E-mail -->
              <div>
                <label class="tw-block tw-text-xs tw-font-normal tw-text-[#374151] tw-mb-1">E-mail</label>
                <div class="tw-border tw-rounded tw-bg-white tw-px-4 tw-py-3 tw-border-[#bdbdbd]">
                  <input
                    type="email"
                    v-model="props.dataSale.contato.email"
                    placeholder="Digite seu e-mail"
                    required
                    class="tw-w-full tw-bg-transparent tw-border-none tw-outline-none tw-h-[28px] tw-placeholder:text-[#9ca3af] tw-text-base focus:tw-border-none focus:tw-outline-none focus:tw-ring-0"
                  />
                </div>
              </div>

              <!-- Telefone -->
              <div>
                <label class="tw-block tw-text-xs tw-font-normal tw-text-[#374151] tw-mb-1">Telefone</label>
                <div class="tw-border tw-rounded tw-bg-white tw-px-4 tw-py-3 tw-border-[#bdbdbd]">
                  <input
                    type="tel"
                    v-model="props.dataSale.contato.telefone"
                    placeholder="Digite seu telefone"
                    required
                    v-mask="'(##) #####-####'"
                    class="tw-w-full tw-bg-transparent tw-border-none tw-outline-none tw-h-[28px] tw-placeholder:text-[#9ca3af] tw-text-base focus:tw-border-none focus:tw-outline-none focus:tw-ring-0"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Botões de Ação -->
          <div class="tw-flex tw-justify-between tw-mt-6">
            <button 
              type="button"
              @click="voltar"
              class="tw-bg-gray-500 hover:tw-bg-gray-600 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-font-medium tw-transition-colors tw-flex tw-items-center tw-gap-2"
            >
              <svg class="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>
            
            <div class="tw-flex tw-gap-4">
              <button 
                type="submit"
                class="tw-bg-blue-500 hover:tw-bg-blue-600 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-font-medium tw-transition-colors tw-flex tw-items-center tw-gap-2"
              >
                Ir para Pagamento
                <svg class="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { formatDate, formatarTempoViagem } from '@/js/utils';
import FormPassenger from './FormPassenger.vue';

const props = defineProps({
  viagem: {
    type: Object,
    required: true
  },
  dataSale: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['continue', 'back']);

const tiposDoc = [
  { id: 1, nome: 'RG', tamanho: 15, mask: '###############' },
  { id: 2, nome: 'Titulo de Eleitor', tamanho: 12, mask: '#### #### ####' },
  { id: 3, nome: 'Passaporte', tamanho: 20, mask: '#################' },
  { id: 4, nome: 'CNH', tamanho: 11, mask: '###########' },
  { id: 5, nome: 'CPF', tamanho: 0, mask: '###.###.###-##' }
];

function addComodoRelated(index) {
  const passageiro = props.dataSale.dataComodos[index];
  passageiro.qtd_comodos_filhos++;
  props.dataSale.dataComodos.push({
    ...passageiro,
    comodo_relacionado: passageiro.comodo,
    comodos_filhos: 1,
    qtd_comodos_filhos: 1
  });
}

function removerPassageiro(index) {
  const passageiro =  props.dataSale.dataComodos[index];
  const comodoPivotIndex = props.dataSale.dataComodos.findIndex(p => p.comodo === passageiro.comodo_relacionado);
  if (comodoPivotIndex > -1) {
    props.dataSale.dataComodos[comodoPivotIndex].qtd_comodos_filhos--;
  }
  props.dataSale.dataComodos.splice(index, 1);
}

function addToContact(index) {
  const passageiro = props.dataSale.dataComodos[index];
  props.dataSale.contato = {
    nome: passageiro.nome,
    telefone: passageiro.telefone
  };
}

function removeFromContact() {
    props.dataSale.contato = {
    nome: '',
    email: '',
    telefone: ''
  };
}

function submitForm() {
  const formData = {
    dataSale: props.dataSale
  };
  
  emit('continue', formData);
}

function voltar() {
  emit('back');
}
</script> 