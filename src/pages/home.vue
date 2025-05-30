<template>
  <f7-page name="home">
    <!-- Navbar -->
    <f7-navbar>
      <template #title>
        <div style="min-width: 200px;">
          TechRios
        </div>
      </template>
    </f7-navbar>
    <div class="tw-flex tw-flex-col tw-items-center">
      <div class="tw-w-full tw-max-w-[900px] tw-mx-4 tw-mt-4">
        <F7CustomSelect
            v-model="portoSelecionado"
            :searchable="true"
            @update:modelValue="carregarViagens"
            :options="[{ value: '', label: 'Todos os portos' }, ...portos.map(p => ({ value: p.id, label: p.nome }))]"
            placeholder="Selecione o porto"
          
          />


          <StepEscolherViagem
      v-if="step === 1"
      :viagens="viagens.trechos?.data"
      @selecionar="selecionarViagem"
    ></StepEscolherViagem>

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
    />
      </div>

    </div>
    
   

    <!-- Loading -->
    <f7-preloader v-if="loading" />

    <!-- Mensagem de erro -->
    <f7-block v-if="error" class="text-color-red">
      {{ error }}
    </f7-block>

    <!-- PWA Install Prompt -->
    <PwaInstallPrompt />
  </f7-page>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { ViagemService } from '@/js/services/ViagemService';
import { PedidoService } from '@/js/services/PedidoService';
import StepEscolherViagem from '@/components/steps/StepEscolherViagem.vue';
import StepSelecionarComodo from '@/components/steps/StepSelecionarComodo.vue';
import StepInsertData from '@/components/steps/StepInsertData.vue';
import StepPagamento from '@/components/steps/StepPagamento.vue'
import { formatMoney, formatDate } from '@/js/utils';
import F7CustomSelect from '@/components/ui/F7CustomSelect.vue'
import { f7 } from 'framework7-vue'
import PwaInstallPrompt from '@/components/ui/PwaInstallPrompt.vue'

const step = ref(1);
const viagemSelecionada = ref(null);
const viagens = ref([]);
const portos = ref([]);
const loading = ref(false);
const orderResponse = ref(null)
const error = ref(null);
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
        data_nascimento:null,
        tipo_doc:null,
        document:"",
    },
    dataComodos:[],
    dataVolta:null,
    errors:{},
    processing:false
})
const portoSelecionado = ref('');
const route = f7.views.main.router.currentRoute

const carregarViagens = async () => {
  loading.value = true;
  error.value = null;
ViagemService.getTrechosViagem({porto:portoSelecionado.value}).then(response => {
      viagens.value = response.data.data;
      loading.value = false;
    });
};

const carrgarPortos = async () => {
  await ViagemService.getPortos().then(response => {
    portos.value = response.data.data;
  });
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
  if (step.value === 3) {
    step.value = 2;
  } else if (step.value === 2) {
    step.value = 1;
    viagemSelecionada.value = null;
  }
}

onMounted(() => {
  // carregarViagens();
  carrgarPortos();
  if (route.query?.porto) {
    portoSelecionado.value = route.query.porto
    carregarViagens();
  }
});
</script>

<style scoped>

</style>