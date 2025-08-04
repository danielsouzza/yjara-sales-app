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
        <img :src="logoUrl" alt="Logo Yjara" class="tw-my-2 tw-w-40 !tw-object-cover  tw-h-14 tw-rounded-lg" />
        <button @click="abrirFiltros" class="tw-bg-gray-100 tw-rounded-full tw-shadow-sm tw-p-1 tw-h-9 tw-w-9 tw-flex tw-items-center tw-justify-center tw-transition hover:tw-bg-primary/10">
         
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="currentColor" d="M6.532 4.75h6.936c.457 0 .854 0 1.165.03c.307.028.685.095.993.348c.397.326.621.814.624 1.322c.002.39-.172.726-.34.992c-.168.27-.411.59-.695.964l-2.596 3.422c-.252.332-.315.42-.359.51a1.2 1.2 0 0 0-.099.297c-.02.1-.023.212-.023.634v4.243c0 .208 0 .412-.014.578c-.015.164-.052.427-.224.663c-.21.287-.537.473-.9.495c-.302.019-.547-.103-.69-.183a7 7 0 0 1-.476-.31l-.989-.683l-.048-.033c-.191-.131-.403-.276-.562-.477a1.7 1.7 0 0 1-.303-.585c-.071-.244-.07-.5-.07-.738v-2.97c0-.422-.004-.534-.023-.634a1.2 1.2 0 0 0-.1-.297c-.043-.09-.106-.178-.358-.51L4.785 8.406c-.284-.374-.527-.694-.696-.964c-.167-.266-.34-.602-.339-.992a1.72 1.72 0 0 1 .624-1.322c.308-.253.686-.32.993-.349c.311-.029.707-.029 1.165-.029M5.308 6.305a.22.22 0 0 0-.057.134c.006.019.03.081.11.207c.128.205.33.472.64.881l2.575 3.394l.035.046c.201.264.361.475.478.715q.154.317.222.665c.051.261.05.527.05.864v2.968c0 .158.001.247.005.314l.006.062a.2.2 0 0 0 .036.073l.041.034c.05.04.12.088.248.176l.941.65V13.21c0-.337 0-.603.051-.864q.068-.347.222-.665c.117-.24.277-.45.478-.715l.035-.046l2.575-3.394c.31-.41.512-.676.64-.881c.08-.126.104-.188.11-.207a.22.22 0 0 0-.057-.134a1 1 0 0 0-.2-.032c-.232-.022-.556-.023-1.06-.023H6.568c-.504 0-.828 0-1.06.023a1 1 0 0 0-.2.032M15.75 10.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75m-1.5 2.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75m-.5 2.5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75m0 2.5a.75.75 0 0 1 .75-.75H17a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75" />
            <path fill="currentColor" d="M13.64 8H6.36l2.251 2.967c.201.264.361.475.478.715q.154.317.222.665c.051.261.05.527.05.864v2.968c0 .158.001.247.005.314l.006.062a.2.2 0 0 0 .036.073l.041.034c.05.04.12.088.248.176l.941.65V13.21c0-.337 0-.603.051-.864q.068-.347.222-.665c.117-.24.277-.45.478-.715z" opacity="0.5" />
          </svg>
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
          :logo-url="logoUrl"
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
    <div
      v-if="showInstallPopup"
      class="tw-fixed tw-inset-0 tw-bg-black/40 tw-z-[9999] tw-flex tw-items-center tw-justify-center"
    >
      <div class="tw-bg-white tw-rounded-2xl tw-shadow-2xl tw-p-8 tw-flex tw-flex-col tw-items-center tw-gap-4 tw-max-w-xs">
        <h2 class="tw-text-lg tw-font-bold tw-text-center">Instale o aplicativo!</h2>
        <p class="tw-text-gray-600 tw-text-center">Adicione o Passagem Express à sua tela inicial para uma experiência melhor.</p>
        <button
          @click="instalarPWA"
          class="tw-bg-primary tw-text-white tw-px-6 tw-py-2 tw-rounded-xl tw-font-bold tw-shadow hover:tw-bg-primary/90 tw-transition tw-mt-2"
        >
          Instalar agora!!!
        </button>
        <button
          @click="showInstallPopup = false"
          class="tw-text-gray-400 tw-mt-2 tw-text-sm"
        >
          Não, obrigado
        </button>
      </div>
    </div>
  </f7-page>
</template>

<script setup>
import { ref, onMounted, reactive, nextTick, computed, watch } from 'vue';
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
import { CustomizeService } from '@/js/services/Customize';

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

const portoUrl = ref(props.f7route.params?.portoId || null);
const empresaId = ref(props.f7route.params?.empresaId || null);
// Se tem empresaId, não mostra onboarding
const showOnboarding = ref(!empresaId.value);
const logoUrl = ref('/assets/images/logo-main-full-techrios.svg'); // valor padrão

const municipiosDestinoOptions = computed(() =>
  municipiosDestino.value.map(m => ({ value: m.slug, label: m.nome }))
);

const showFilters = ref(false);
const draftFilters = reactive({ 
  porto: '', 
  municipioDestino: '', 
  data: null 
});

const deferredPrompt = ref(null);
const showInstallPopup = ref(false);

function formSaleReset(){
  formSale.trecho = null;
  formSale.viagem = null;
  formSale.data_hora = null;
  formSale.total_passagems = 0.0;
  formSale.total_taxas = 0.0;
  formSale.dataComodos = [];
  formSale.dataVolta = null;
  formSale.errors = {};
  formSale.processing = false;
}


const carregarViagens = async () => {
  step.value = 1;
  formSaleReset()
  loading.value = true;
  error.value = null;
  
  try {
    const response = await ViagemService.getTrechosViagem({
      porto: form.porto || null, // permite null
      destino: form.municipioDestino || null, // permite null
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

const carregarMunicipiosDestino = async (portoId) => {
  let params = {};
  if (portoId) {
    params.porto_id = portoId;
  }
  const resp = await ViagemService.getFiltros(params);
  if (resp.data && resp.data.data && resp.data.data.municipiosDestino) {
    municipiosDestino.value = resp.data.data.municipiosDestino;
  } else {
    municipiosDestino.value = [];
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
        origem: 3,

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

async function carregarTema() {
  const response = await CustomizeService.getCustomize();
  if (response.data && response.data.data) {

    
    // Cores
    if (response.data.data.theme) {
      const { primary_color, secondary_color } = response.data.data.theme;
      document.documentElement.style.setProperty('--primary-color', primary_color);
      document.documentElement.style.setProperty('--secondary-color', secondary_color);
    }
    // Logo
    if (response.data.data.image_path) {
      logoUrl.value = process.env.API_BASE_URL + response.data.data.image_path;
    }
  }
}

function instalarPWA() {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    deferredPrompt.value.userChoice.then(() => {
      deferredPrompt.value = null;
      showInstallPopup.value = false;
    });
  }
}

watch(() => form.porto, (novoPorto) => {
  carregarMunicipiosDestino(novoPorto);
  form.municipioDestino = '';
});

// Scrolla para o topo ao trocar de step
watch(() => step.value, async () => {
  await nextTick();
  // Tente encontrar o container de scroll do Framework7
  const pageContent = document.querySelector('.page-content') || document.querySelector('.f7-page');
  if (pageContent) {
    pageContent.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

onMounted(() => {
  carrgarPortos();
  carregarMunicipiosDestino();
  
  if (empresaId.value) {
    // Se tem empresa, define a data atual e carrega viagens
    form.data = new Date(); // Define data atual
    carregarTema(empresaId.value);
    carregarViagens(); // carrega viagens com data atual
  } else {
    // Se não tem empresa, mostra onboarding
    nextTick(() => {
      if (portoUrl.value) {
        form.porto = portoUrl.value;
      }
    });
  }
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
    showInstallPopup.value = true;
  });
});
</script>

<style scoped>


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