<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-w-full tw-px-4 tw-mb-4">
    <div class="tw-bg-white tw-rounded-3xl tw-shadow-2xl tw-py-4 tw-px-2 tw-w-full tw-max-w-2xl ">
      <!-- Título -->
      <div class="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-mb-6">
        <!-- <i class="icon f7-icons  tw-text-2xl">person_2_fill</i> -->
        <h2 class="tw-text-2xl tw-font-bold  tw-text-center tw-drop-shadow-sm">Dados dos Passageiros</h2>
      </div>
      <!-- Resumo da Viagem -->
      <!-- <div class="tw-bg-primary/10 tw-rounded-2xl tw-p-6 tw-mb-6 tw-shadow-inner">
        <h3 class="tw-font-bold tw-text-primary tw-mb-3 tw-flex tw-items-center tw-gap-2">
       Resumo da Viagem
        </h3>
        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
          <div>
            <p class="tw-text-sm tw-text-primary">Origem: <span class="tw-font-bold">{{ viagem.municipio_origem.nome }}/{{ viagem.municipio_origem.uf }}</span></p>
            <p class="tw-text-sm tw-text-primary">Destino: <span class="tw-font-bold">{{ viagem.municipio_destino.nome }}/{{ viagem.municipio_destino.uf }}</span></p>
            <p class="tw-text-sm tw-text-primary">Data: <span class="tw-font-bold">{{ formatDate(viagem.data_embarque) }}</span></p>
          </div>
          <div>
            <p class="tw-text-sm tw-text-primary">Duração: <span class="tw-font-bold">{{ formatarTempoViagem(viagem.tempo_viagem) }}</span></p>
            <p class="tw-text-sm tw-text-primary">Embarcação: <span class="tw-font-bold">{{ viagem.embarcacao }}</span></p>
          </div>
        </div>
      </div> -->
      <!-- Formulário de Passageiros -->
      <form @submit.prevent="submitForm" class="tw-space-y-6" id="form-passageiros">
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
        <div class="tw-bg-gray-50 tw-shadow-inner tw-rounded-2xl tw-p-6 tw-border tw-border-gray-100">
          <h3 class="tw-font-bold tw-text-lg  tw-mb-6 flex items-center gap-2"><i class="icon f7-icons ">person_crop_circle</i> Dados para Contato</h3>
          <div class="tw-space-y-6">
            <!-- Nome para Contato -->
            <div>
              <label class="custom-select-label">Nome para Contato</label>
              <div class="onboarding-search">
                <span class="onboarding-search-icon">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/></svg>
                </span>
                <input
                  type="text"
                  v-model="props.dataSale.contato.nome"
                  placeholder="Digite seu nome"
                  required
                  class="onboarding-search-input"
                />
              </div>
            </div>
            <!-- E-mail -->
            <div>
              <label class="custom-select-label">E-mail</label>
              <div class="onboarding-search">
                <span class="onboarding-search-icon">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/></svg>
                </span>
                <input
                  type="email"
                  v-model="props.dataSale.contato.email"
                  placeholder="Digite seu e-mail"
                  required
                  class="onboarding-search-input"
                />
              </div>
            </div>
            <!-- Telefone -->
            <div>
              <label class="custom-select-label">Telefone</label>
              <div class="onboarding-search">
                <span class="onboarding-search-icon">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/></svg>
                </span>
                <input
                  type="tel"
                  v-model="props.dataSale.contato.telefone"
                  placeholder="Digite seu telefone"
                  required
                  v-mask="'(##) #####-####'"
                  class="onboarding-search-input"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Botões -->
        <div class="tw-flex tw-justify-center tw-mt-6 tw-gap-4">
          <button
            class="tw-bg-gray-200 tw-text-gray-700 tw-px-6 tw-py-2 tw-rounded-xl tw-font-medium hover:tw-bg-gray-300"
            @click="voltar"
            type="button"
          >
            Voltar
          </button>
          <button
            class="tw-bg-primary tw-flex tw-items-center tw-justify-center tw-text-white tw-px-8 tw-py-2 tw-rounded-xl tw-font-bold shadow-lg hover:tw-bg-primary/90 disabled:tw-opacity-50"
            type="submit"
            @click="initSale"
            :disabled="dataSale.processing"
          >
            <template v-if="dataSale.processing">
              <f7-preloader size="20px" color="white" />
              <span class="tw-ml-2">Processando...</span>
            </template>
            <template v-else>
              Ir para Pagamento
              <svg class="tw-w-4 tw-h-4 tw-ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import FormPassenger from './FormPassenger.vue';
import {  nextTick } from 'vue';
import { ComodoService } from '../../js/services/ComodoService';

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

const validateForm = () => {
  let hasError = false;
  const validateField = (field, value, errorMessage, form) => {
    if (value === null || value === undefined || value === '') {
      form.errors[field] = errorMessage;
      hasError = true;
    } else {
      delete form.errors[field];
    }
  };

  // Validação dos passageiros
  props.dataSale.dataComodos.forEach(it => {
    validateField('nome', it.nome, 'Por favor, insira seu nome e sobrenome.', it);
    validateField('tipo_doc', it.tipo_doc, 'Por favor, escolha um tipo de documento.', it);
    validateField('document', it.document, 'Por favor, insira número do documento.', it);
    validateField('nascimento', it.nascimento, 'Por favor, insira uma data de nascimento.', it);
  });

  // Validação dos dados de contato
  validateField('contato.nome', props.dataSale.contato.nome, 'Por favor, insira seu nome e sobrenome.', props.dataSale);
  validateField('contato.email', props.dataSale.contato.email, 'Por favor, insira seu email.', props.dataSale);
  validateField('contato.telefone', props.dataSale.contato.telefone, 'Por favor, insira um número de telefone.', props.dataSale);

  return !hasError;
};

async function focusErro() {
  await nextTick();
  // Busca todos os inputs visíveis e habilitados dentro do formulário
  const inputs = document.querySelectorAll("#form-passageiros input");
  for (const input of inputs) {
    if (!input.value) {
      input.focus();
      break;
    }
  }
}

function deleteReserva(room){

  const params = {
    trecho_id: props.viagem.id,
    viagem_id: props.viagem.id_viagem,
    comodo_ids: [room]
  }
  ComodoService.deletarReserva(params).then((response) => {

  }).catch(error => {
      window.$notify(error.response.data.data.error,'error');
  })

}

async function submitForm() {
  if (validateForm()) {
    const formData = {
      dataSale: props.dataSale
    };

    emit('continue', formData);
  } else {
    await focusErro();
  }
}

function voltar() {
  props.dataSale.dataComodos.forEach(item => {
    deleteReserva(item.comodo)
  })
  nextTick(() => {
    emit('back');
  })
}
</script>

<style scoped>
.custom-select-label {
  font-size: 1rem;
  font-weight: 600;
  color: #00579d;
  margin-bottom: 0.25rem;
}

.onboarding-search {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 9999px;
  box-shadow: 0 1px 4px 0 rgba(160, 174, 192, 0.08);
  padding: 0.25rem 1rem 0.25rem 0.75rem;
  border: 1.5px solid #f3f4f6;
  transition: border 0.2s;
  width: 100%;
}
.onboarding-search:focus-within {
  border: 1.5px solid #6f6ee8;
}
.onboarding-search-icon {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}
.onboarding-search-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #333;
  width: 100%;
  padding: 0.5rem 0;
  font-weight: 500;
}
.onboarding-search-input::placeholder {
  color: #b0b0b0;
  opacity: 1;
}
</style>
