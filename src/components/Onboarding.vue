<template>
  <div class=" tw-min-h-[100vh] tw-flex tw-flex-col tw-items-center  tw-px-3">
    <div class="tw-w-full tw-max-w-md">
      <div class="tw-bg-white tw-rounded-3xl tw-shadow-2xl tw-p-8 tw-flex tw-flex-col tw-items-center tw-gap-4 animate-fadein">
        <!-- Logo -->
        <img :src="logoUrl" alt="Logo Yjara" class="tw-mb-2 tw-w-40 tw-mx-auto" />
        <!-- Mascote/Emoji -->
        <!-- <div class="tw-text-5xl tw-mb-2">🚢</div> -->
        <!-- Loading -->
        <div v-if="loading" class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-12">
          <f7-preloader size="40px" color="primary" />
          <span class="tw-text-gray-500 tw-mt-4">Carregando dados...</span>
        </div>
        <div v-else>
          <!-- Passos -->
          <div v-if="step === 1" class="tw-w-full tw-flex tw-flex-col tw-items-center">
            <div class="tw-text-lg tw-font-bold tw-mb-4 tw-text-center">De qual porto você está saindo?</div>
            <!-- Busca Porto Origem -->
            <div class="onboarding-search tw-mb-2 tw-w-full ">
              <span class="onboarding-search-icon">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/></svg>
              </span>
              <input v-model="searchPorto" type="text" placeholder="Buscar porto..." class="onboarding-search-input" />
            </div>
            <div class="tw-flex tw-flex-col tw-gap-2 tw-w-full onboarding-list-scroll">
              <button
                v-for="p in filteredPortos"
                :key="p.id"
                @click="selectPorto(p.slug)"
                class="onboarding-option tw-py-3 tw-px-4 tw-rounded-xl tw-bg-gray-100 hover:tw-bg-primary/10 tw-transition tw-text-base tw-font-medium tw-text-left tw-w-full"
              >
                {{ p.nome }} / {{ p.municipio_nome }}
              </button>
              <div v-if="filteredPortos.length === 0" class="tw-text-center tw-text-gray-400 tw-py-4">Nenhum porto encontrado</div>
            </div>
          </div>
          <div v-else-if="step === 2" class="tw-w-full tw-flex  tw-flex-col tw-items-center">
            <div v-if="portoOrigemObj" class="tw-text-lg  tw-mb-2 tw-text-primary tw-text-center">
              Bem-vindo ao porto <br><span class="tw-font-bold ">{{ portoOrigemObj.nome }} / {{ portoOrigemObj.municipio_nome }}</span>
            </div>
            <div class="tw-text-lg  tw-mb-4 tw-text-center">Para qual município você vai?</div>
            <!-- Busca Município Destino -->
            <div class="onboarding-search tw-mb-2 tw-w-full ">
              <span class="onboarding-search-icon">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/></svg>
              </span>
              <input v-model="searchDestino" type="text" placeholder="Buscar município..." class="onboarding-search-input " />
            </div>
            <div class="tw-flex tw-flex-col tw-gap-2 tw-w-full onboarding-list-scroll">
              <button
                v-for="m in filteredMunicipiosDestino"
                :key="m.id"
                @click="selectDestino(m.slug)"
                class="onboarding-option tw-py-3 tw-px-4 tw-rounded-xl tw-bg-gray-100 hover:tw-bg-primary/10 tw-transition tw-text-base tw-font-medium tw-text-left tw-w-full"
              >
                {{ m.nome }}/{{ m.uf }}
              </button>
              <div v-if="filteredMunicipiosDestino.length === 0" class="tw-text-center tw-text-gray-400 tw-py-4">Nenhum município encontrado</div>
            </div>
            <f7-button outline class="tw-mt-4 onboarding-btn" @click="step = 1">Voltar</f7-button>
          </div>
          <div v-else-if="step === 3" class="tw-w-full tw-flex tw-flex-col tw-items-center ">
            <div class="tw-text-lg tw-font-bold tw-mb-4 tw-text-center">Quando você pretende viajar?</div>
            <DateSelectCustom v-model="data" :min-date="minDate" label="" placeholder="Selecione a data" class="tw-mb-6 tw-w-full" />
            <f7-button fill large class="onboarding-btn" @click="finishOnboarding">Ver viagens</f7-button>
            <f7-button outline class="tw-mt-2 onboarding-btn" @click="step = 2">Voltar</f7-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import DateSelectCustom from '@/components/ui/DateSelectCustom.vue';
import { ViagemService } from '@/js/services/ViagemService';

const props = defineProps({
  portos: Array,
  portoUrl: String,
  logoUrl: String
});
const emit = defineEmits(['onboarding-finish']);

const step = ref(1);
const portoOrigem = ref(null);
const municipioDestino = ref(null);
const data = ref(new Date());
const minDate = ref(new Date(new Date().setHours(0,0,0,0)));

const municipiosDestino = ref([]);

const searchPorto = ref('');
const searchDestino = ref('');

const loading = ref(true);

function normalizeString(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const filteredPortos = computed(() => {
  let portosFiltrados = props.portos;

  // Filtro por busca (ignorando acentos)
  if (searchPorto.value) {
    const search = normalizeString(searchPorto.value);
    portosFiltrados = portosFiltrados.filter(p =>
      normalizeString(p.nome + ' ' + p.municipio_nome).includes(search)
    );
  }

  // Se já tem um porto selecionado, priorize portos do mesmo município
  if (portoOrigem.value) {
    const portoSel = props.portos.find(p => p.slug === portoOrigem.value);
    if (portoSel) {
      const codMun = portoSel.municipio_codigo;
      portosFiltrados = [
        ...portosFiltrados.filter(p => p.municipio_codigo === codMun),
        ...portosFiltrados.filter(p => p.municipio_codigo !== codMun)
      ];
    }
  }

  return portosFiltrados;
});

const filteredMunicipiosDestino = computed(() => {
  if (!searchDestino.value) return municipiosDestino.value;
  const search = normalizeString(searchDestino.value);
  return municipiosDestino.value.filter(m => normalizeString(m.nome+' '+m.uf).includes(search));
});

const portoOrigemObj = computed(() => {
  if (!portoOrigem.value) return null;
  return props.portos.find(p => p.slug === portoOrigem.value) || null;
});

function selectPorto(id) {
  portoOrigem.value = id;
  carregarFiltros();
  nextStep();
  searchPorto.value = '';
}

function nextStep() {
  step.value = 2;
}

function selectDestino(id) {
  municipioDestino.value = id;
  step.value = 3;
  searchDestino.value = '';
}

function finishOnboarding() {
  emit('onboarding-finish', {
    porto: portoOrigem.value,
    destino: municipioDestino.value,
    data: data.value
  });
}

async function carregarFiltros() {
  loading.value = true;
  const resp = await ViagemService.getFiltros({ porto_id: portoOrigem.value });
  if (resp.data && resp.data.data && resp.data.data.municipiosDestino ) {
    municipiosDestino.value = resp.data.data.municipiosDestino;
  } 
  loading.value = false;
}   

onMounted(async () => {
  // Se já veio o porto na URL, pula direto para o step 2
  if (props.portoUrl) {
    portoOrigem.value = props.portoUrl
    step.value = 2;
    nextTick(() => {
      carregarFiltros();
    });
  }
  loading.value = false;
});
</script>

<style scoped>

.onboarding-btn {
  width: 100%;
  border-radius: 9999px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  margin-top: 0.5rem;
}
.onboarding-option {
  transition: background 0.2s, color 0.2s;
}
.onboarding-list-scroll {
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  padding-right: 2px;
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
  border: 1.5px solid #00579d;
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
.animate-fadein {
  animation: fadein 0.5s;
}
@keyframes fadein {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> 