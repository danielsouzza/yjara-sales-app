<template>
  <f7-page name="home" class="my-page onboarding-bg">
    <!-- Topbar elegante, só aparece depois do onboarding -->
    <!-- <f7-navbar v-if="!showOnboarding">
      <template #title>
        <img src="@/assets/images/logo-yjara.svg" alt="Logo Yjara" class="tw-my-2 tw-w-40 " />
      </template>
      <template #right>
        <button @click="abrirFiltros" class="tw-mr-2 tw-bg-gray-100 tw-rounded-full tw-shadow-sm tw-p-1 tw-h-9 tw-w-9 tw-flex tw-items-center tw-justify-center tw-transition hover:tw-bg-primary/10">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#6f6ee8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 4h16M6 8h12M8 12h8m2 0v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6"/></svg>
        </button>
      </template>
    </f7-navbar> -->
    <div v-if="!showOnboarding" class="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-z-30 tw-bg-white tw-shadow-md tw-h-16 tw-flex tw-items-center tw-justify-center">
      <div class="tw-flex tw-items-center tw-justify-between tw-w-full tw-max-w-[900px] tw-px-4">
        <img src="@/assets/images/logo-yjara.svg" alt="Logo Yjara" class="tw-my-2 tw-w-40 " />
        <button @click="abrirFiltros" class="tw-bg-gray-100 tw-rounded-full tw-shadow-sm tw-p-1 tw-h-9 tw-w-9 tw-flex tw-items-center tw-justify-center tw-transition hover:tw-bg-primary/10">
         
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="#6f6ee8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 4h16M6 8h12M8 12h8m2 0v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6"/></svg>
        </button>
      </div>
    </div>
    <!-- Título do step -->
    <!-- <div v-if="!showOnboarding" class="tw-w-full  tw-max-w-[900px] tw-mx-auto tw-mt-5 tw-flex tw-items-center tw-justify-center">
      <span class="tw-bg-primary/10 tw-text-primary tw-px-3 tw-py-1 tw-rounded-full tw-text-xl tw-font-bold tw-text-primary tw-text-center  tw-w-full tw-mx-4">
        {{ stepTitle }}
          </span>
    
    </div> -->
    <div class="tw-flex tw-flex-col tw-items-center tw-pt-0 tw-my-20">
      <div class="tw-w-full tw-max-w-[900px] tw-mx-4 ">
        <Onboarding
          class="tw-w-fult tw-pt-5"
          v-if="showOnboarding"
          :portos="portos"
          :porto-url="portoUrl"
          @onboarding-finish="handleOnboardingFinish"
        />

        <div v-if="step === 1 && !showOnboarding" class="tw-w-full  tw-px-4">
          <QuickDateSelector
          v-model="form.data"
          :min-date="minDate"
          @select="carregarViagens"
        />
          <!-- Loading -->
          <div v-if="loading" class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-8">
            <f7-preloader size="40px" color="white" />
            <span class="tw-text-white tw-mt-4">Carregando viagens...</span>
          </div>
          
          <!-- Lista de viagens -->
          <StepEscolherViagem
            v-else-if="viagens.trechos?.data?.length > 0"
            :viagens="viagens.trechos?.data"
            @selecionar="selecionarViagem"
          ></StepEscolherViagem>

          <!-- Mensagem de não encontrado -->
          <div v-else-if="viagens.trechos?.data?.length === 0 && !showOnboarding" class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-8 ">
            <div class="tw-bg-gray-50 tw-rounded-2xl tw-p-6 tw-text-center tw-max-w-sm">
              <svg class="tw-w-16 tw-h-16 tw-mx-auto tw-text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="tw-mt-4 tw-text-lg tw-font-medium tw-text-gray-900">Nenhuma viagem encontrada</h3>
              <p class="tw-mt-2 tw-text-sm tw-text-gray-500">Tente ajustar os filtros ou verificar novamente mais tarde.</p>
            </div>
          </div>

          <f7-button
            v-if="viagens.trechos?.data?.length > 0 && form.quantia < viagens.trechos?.total"
            @click="showMoreTicket"
            fill
            class="tw-flex tw-items-center tw-my-4 !tw-font-extrabold tw-text-sm"
          >
            <i class="icon f7-icons mr-2">arrow_down</i>
            Mostrar mais
          </f7-button>
        </div>
        <StepSelecionarComodo 
            :viagem="viagemSelecionada" 
            v-else-if="step === 2" 
            @continue="saveTicket"
            @voltar="voltar"
        ></StepSelecionarComodo>
        <StepInsertData
            v-else-if="step === 3"
            :viagem="viagemSelecionada"
            :data-sale="formSale"
            @continue="handleInsertData"
            @back="voltar"
        ></StepInsertData>
        <StepPagamento
            v-else-if="step === 4"
            :order="orderResponse"
            @voltar="voltar"
        />
      </div>
    </div>
    <!-- Modal de filtros customizado FORA do conteúdo principal -->
    <div v-if="showFilters" class="tw-fixed tw-inset-0 tw-z-[9999]">
      <transition name="fade">
        <div v-if="showFilters" class="tw-absolute tw-inset-0 tw-bg-black/40" @click="showFilters = false"></div>
      </transition>
      <transition name="slide-up">
        <div v-if="showFilters" class="tw-bg-white tw-rounded-t-3xl tw-shadow-2xl tw-px-4 tw-pt-4 tw-pb-2 tw-flex tw-flex-col tw-gap-4 tw-max-w-lg tw-mx-auto tw-min-h-[340px] tw-w-full md:tw-w-[420px] tw-absolute tw-bottom-0 tw-left-1/2 tw--translate-x-1/2" @click.stop>
          <div class="tw-flex tw-items-center tw-justify-between tw-mb-2">
            <span class="tw-text-lg tw-font-bold tw-text-gray-800">Filtros</span>
            <button @click="showFilters = false" class="tw-text-gray-400 tw-bg-transparent tw-border-none tw-text-2xl">&times;</button>
          </div>
          <CustomSelect
            v-model=" form.porto"
            :options="[{ value: '', label: 'Todos os portos' }, ...portos.map(p => ({ value: p.slug, label: p.nome }))]"
            label="Porto de origem"
            placeholder="Selecione o porto"
            class="tw-mb-2"
          />
          <CustomSelect
            v-model="form.municipioDestino"
            :options="[{ value: '', label: 'Todos os municípios' }, ...municipiosDestinoOptions]"
            label="Município de destino"
            placeholder="Selecione o município"
            class="tw-mb-2"
          />
          <DateSelectCustom
            v-model="form.data"
            :min-date="minDate"
            label="Data"
            placeholder="Selecione a data"
            class="tw-mb-2"
          />
          <div class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-2 tw-mt-auto tw-pt-4">
            <button 
              @click="aplicarFiltros" 
              class="!tw-bg-indigo-700 tw-text-white tw-font-bold tw-rounded-xl tw-px-8 tw-py-3 tw-shadow-md hover:!tw-bg-indigo-700 tw-transition tw-w-full tw-flex tw-items-center tw-justify-center"
              :disabled="loading"
            >
              <f7-preloader v-if="loading" size="20px" color="white" class="tw-mr-2" />
              {{ loading ? 'Aplicando...' : 'Aplicar' }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </f7-page>
</template>

<script setup>
import { ref, onMounted, reactive, nextTick, computed } from 'vue';
import { ViagemService } from '@/js/services/ViagemService';
import { PedidoService } from '@/js/services/PedidoService';
import StepEscolherViagem from '@/components/steps/StepEscolherViagem.vue';
import StepSelecionarComodo from '@/components/steps/StepSelecionarComodo.vue';
import StepInsertData from '@/components/steps/StepInsertData.vue';
import StepPagamento from '@/components/steps/StepPagamento.vue'
import { formatMoney, formatDate } from '@/js/utils';
import CustomSelect from '@/components/ui/CustomSelect.vue';
import DateSelectCustom from '@/components/ui/DateSelectCustom.vue';
import Onboarding from '@/components/Onboarding.vue';
import QuickDateSelector from '@/components/ui/QuickDateSelector.vue';

const props = defineProps({
    f7route: Object,
    f7router: Object,
})


const step = ref(1);
const viagemSelecionada = ref(null);
const viagens = ref([]);
const portos = ref([]);
const municipiosDestino = ref([]);
const loading = ref(false);
const orderResponse = ref(null)
const error = ref(null);
const minDate = ref(new Date(new Date().setHours(0,0,0,0)));
const formSale = reactive({
    trecho:null,
    viagem:null,
    data_hora:null,
    total_passagems:0.0,
    total_taxas:0.0,
    contato:{
        nome:'',
        email:'',
        telefone:'',
        nascimento:null,
        tipo_doc:null,
        document:"",
    },
    dataComodos:[],
    dataVolta:null,
    errors:{},
    processing:false
})
const form = reactive({
  porto: '',
  municipioDestino: '',
  data: null,
  quantia: 10
});

const portoUrl = ref(props.f7route.query?.porto || null);
const showOnboarding = ref(true);

const municipiosDestinoOptions = computed(() =>
  municipiosDestino.value.map(m => ({ value: m.slug, label: m.nome }))
);

const showFilters = ref(false);
const draftFilters = reactive({ 
  porto: '', 
  municipioDestino: '', 
  data: null 
});

const filtrosAtivos = computed(() => {
  return !!form.porto || !!form.municipioDestino || !!form.data;
});

const stepTitle = computed(() => {
  switch (step.value) {
    case 1:
      return 'Escolha sua viagem';
    case 2:
      return 'Selecione o cômodo';
    case 3:
      return 'Preencha seus dados';
    case 4:
      return 'Pagamento';
    default:
      return '';
  }
});

const carregarViagens = async () => {
  loading.value = true;
  error.value = null;
  console.log(form.porto);
  const porto = portos.value.find(p => p.slug == form.porto);
  try {
    const response = await ViagemService.getTrechosViagem({
      porto: porto.id,
      destino: form.municipioDestino,
      data_hora: form.data ? formatDate(form.data) : '',
      quantia: form.quantia
    });
    viagens.value = response.data.data;
  } catch (err) {
    error.value = 'Erro ao carregar viagens. Tente novamente.';
  } finally {
    loading.value = false;
  }
};

const carrgarPortos = async () => {
  await ViagemService.getPortos().then(response => {
    portos.value = response.data.data;
  });
}

const carregarMunicipiosDestino = async () => {
  const resp = await ViagemService.getFiltros();
  if (resp.data && resp.data.data && resp.data.data.municipiosOrigem) {
    municipiosDestino.value = resp.data.data.municipiosOrigem;
  }
}

function selecionarViagem(viagem) {
  viagemSelecionada.value = viagem;
  step.value = 2;
}

function calculateTotal(items) {
  const valor = items.rooms.reduce((acc, item) => {
    let total = (item.comodo_trechos?.valor ? item.comodo_trechos?.valor : parseFloat(formatMoney(items.trecho.valor)))
    if (items.trecho.desconto) {
      total = total - items.trecho.desconto.desconto
    }
    return acc + total
  }, 0)

  const length = items.rooms.length;
  const taxa = length * parseInt(formatMoney(items.trecho.taxa_de_embarque))
  return {
    passagens: valor,
    taxa: taxa,
  };
}

function populateComodos(rooms, trecho) {
  const comodos = [];

  rooms.forEach(item => {
    const baseComodo = {
      tipo_doc: null,
      nome: '',
      document: '',
      nascimento: null,
      desconto_id: trecho.desconto?.id ?? null,
      comodo: item.id,
      tipo_comodidade: item.tipo_comodidade,
      embarque: parseInt(formatMoney(trecho.taxa_de_embarque)),
      valor: item.comodo_trechos?.valor ?? parseFloat(formatMoney(trecho.valor)),
      telefone: '',
      isContact: false,
      errors: {}
    };

    comodos.push({ 
      ...baseComodo, 
      comodo_relacionado: null, 
      comodos_filhos: item.quantidade, 
      qtd_comodos_filhos: item.quantidade 
    });

    for (let i = 1; i < item.quantidade; i++) {
      comodos.push({ 
        ...baseComodo, 
        comodo_relacionado: item.id, 
        comodos_filhos: 1,
        qtd_comodos_filhos: 1 
      });
    }
  });

  return comodos;
}

function saveTicket(data) {
  const totalIda = calculateTotal(data);

    Object.assign(formSale, {
        total_passagems: totalIda.passagens,
        total_taxas: 0,
    trecho: data.trecho,
    viagem: data.trecho.id_viagem,
    data_hora: data.trecho.data_embarque,
    dataComodos: populateComodos(data.rooms, data.trecho)
    });

  formSale.total_taxas = formSale.dataComodos.length * parseInt(formatMoney(data.trecho.taxa_de_embarque));

  step.value = 3;
}


function handleInsertData(){
    formSale.contato.data_nascimento = formatDate(formSale.contato.nascimento)
    formSale.dataComodos.forEach(item => {
        item.data_nascimento = formatDate(item.nascimento)
    })


    formSale.total = formSale.total_passagems + formSale.total_taxas;

    const params = {
        ...formSale,
        pedido_id: orderResponse.value?.id,
        trecho:formSale.trecho.id,

    }
    formSale.processing = true
    PedidoService.create(params).then(response => {
        if(response.data.success){
            orderResponse.value = response.data.data;
            step.value = 4;
        }
        formSale.processing = false
    }).catch(error=>{
        formSale.processing = false
    })
}

function voltar() {
  if (step.value === 4) {
    step.value = 3;
  } else if (step.value === 3) {
    step.value = 2;
  } else if (step.value === 2) {
    step.value = 1;
    viagemSelecionada.value = null;
  }
}

function showMoreTicket() {
  form.quantia += 4;
  carregarViagens();
}

function handleOnboardingFinish({ porto, destino, data }) {
  form.porto = porto;
  form.municipioDestino = destino;
  form.data = data;
  showOnboarding.value = false;
  carregarViagens();
}


async function aplicarFiltros() {
  loading.value = true;
  try {
    await carregarViagens();
    showFilters.value = false;
  } finally {
    loading.value = false;
  }
}

function abrirFiltros() {
  draftFilters.porto = form.porto;
  draftFilters.municipioDestino = form.municipioDestino;
  draftFilters.data = form.data;
  showFilters.value = true;
}

onMounted(() => {
  carrgarPortos();
  carregarMunicipiosDestino();
  nextTick(() => {
    if (portoUrl.value) {
      form.porto = portoUrl.value;
      // Não carrega viagens ainda, espera onboarding
    }
  });
});
</script>

<style scoped>

.onboarding-bg {
  background: linear-gradient(135deg, #00579d 0%, #3dccfd    100%);
  min-height: 100vh;
}


.my-datepicker:deep(.dp__outer_menu_wrap){
  top: 45px !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.25s cubic-bezier(.4,0,.2,1);
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
}
</style>