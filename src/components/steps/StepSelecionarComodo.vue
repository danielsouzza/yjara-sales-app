<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-w-full tw-px-4 tw-mb-4">
    <div class="tw-bg-white tw-rounded-3xl tw-shadow-2xl tw-p-4 tw-w-full">
      <div v-if="loadingSets" class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-12">
        <f7-preloader size="40px" color="primary" />
        <span class="tw-text-gray-500 tw-mt-4">Carregando dados...</span>
      </div>
      <div v-else>
        <!-- Header -->
        <div class="tw-flex tw-flex-col tw-items-center tw-mb-6">
          <div class="tw-flex tw-items-center tw-gap-2 tw-text-primary tw-text-xl tw-font-bold">
            {{ viagem.municipio_origem.nome }}/{{ viagem.municipio_origem.uf }}
            <span class="tw-text-2xl tw-mb-2">→</span>
            {{ viagem.municipio_destino.nome }}/{{ viagem.municipio_destino.uf }}
          </div>
          <div class="tw-flex tw-gap-3 tw-mt-2">
            <span class="tw-bg-primary/10 tw-text-primary tw-px-2 tw-py-1 tw-rounded-full tw-text-xs tw-flex tw-items-center">
              <i class="icon f7-icons tw-mr-1">calendar</i> Saída: {{ formatDate(viagem.data_embarque) }}
            </span>
            <span class="tw-bg-secondary/10 tw-text-secondary tw-px-2 tw-py-1 tw-rounded-full tw-text-xs tw-flex tw-items-center">
              <i class="icon f7-icons tw-mr-1">clock</i> {{ formatarTempoViagem(viagem.tempo_viagem) }}
            </span>
            <span class="tw-bg-gray-100 tw-text-gray-700 tw-px-2 tw-py-1 tw-rounded-full tw-text-xs tw-flex tw-items-center">
              <i class="icon f7-icons tw-mr-1 ">ferry</i> {{ viagem.embarcacao }}
            </span>
          </div>
        </div>
        <!-- Legenda -->
        <div class="tw-flex tw-gap-4 tw-justify-center tw-mb-4">
          <span class="tw-flex tw-items-center tw-gap-1 tw-text-xs">
            <span class="tw-w-4 tw-h-4 tw-bg-green-500 tw-rounded"></span> Livre
          </span>
          <span class="tw-flex tw-items-center tw-gap-1 tw-text-xs">
            <span class="tw-w-4 tw-h-4 tw-bg-blue-400 tw-rounded"></span> Vendido
          </span>
          <span class="tw-flex tw-items-center tw-gap-1 tw-text-xs">
            <span class="tw-w-4 tw-h-4 tw-bg-yellow-400 tw-rounded"></span> Selecionado
          </span>
        </div>
        <!-- Grid de cômodos -->
        <div class="tw-bg-gray-50 tw-rounded-xl tw-shadow-inner tw-py-4 tw-mb-6">
          <!-- Mantém o grid/Boat existente -->
          <Boat v-if="matrizRooms?.length > 0" class="tw-mb-4 tw-px-2">
            <div
              :style="generateLayout()"
              class="tw-h-full"
            >
              <div
                v-for="(comodo, index) in matrizRooms"
                :key="index"
                :class="comodo?.id ? (comodo.is_ocupado ? '!tw-bg-blue-400 tw-cursor-not-allowed' : roomsSelected.selectedsById?.includes(comodo) ? '!tw-bg-yellow-400' : '!tw-bg-green-500') : 'tw-bg-gray-200'"
                class="tw-text-center tw-rounded-[5px] !tw-text-white tw-font-black tw-px-1 tw-py-[2px] tw-text-xs tw-h-[24px] tw-min-w-[32px] tw-cursor-pointer tw-transition-all"
                @click="comodo?.id && !comodo.is_ocupado ? onClickRoom(comodo, null) : ''"
              >
                {{ comodo?.id ? (comodo.numeracao < 10 ? '0' + comodo.numeracao : comodo.numeracao) : '' }}
              </div>
            </div>
          </Boat>
          <!-- Mantém os cards de tipos de cômodos e camarotes -->
          <div v-if="hasCamarotesAndRede" class="tw-w-full">
            <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4 tw-px-4">
              <template v-for="item in viagem.tipos_comodos">
                <div v-if="item.id !== 4 && item.id !== 1" :key="item.id" class="tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-4">
                  <div
                    class="tw-bg-white tw-rounded-lg tw-shadow-md tw-border-4 tw-border-blue-400 tw-cursor-pointer tw-transition-all"
                    :class="roomsFree.find(it=>it.tipo_comodidade_id === item.id)?.quantidade > 0 ? 'hover:tw-shadow-lg' : 'tw-opacity-50 tw-cursor-not-allowed'"
                    @click="roomsFree.find(it=>it.tipo_comodidade_id === item.id)?.quantidade > 0 ? onClickRoom(null, item.id) : ''"
                  >
                    <div class="tw-p-3 tw-rounded " :class="roomsSelected.selectedsByType?.find(it=>item.id == it.type_comodo_id)?.quantidade > 0 ? '!tw-bg-yellow-400' : roomsFree.find(it=>it.tipo_comodidade_id === item.id)?.quantidade === 0 ? '!tw-bg-blue-400 tw-text-white' : '!tw-bg-green-500 tw-text-white'">
                      <div class="tw-grid tw-grid-cols-12">
                        <div class="tw-col-span-8 tw-text-xs">
                          {{item.nome}}
                        </div>
                        <div class="tw-col-span-4 tw-text-sm tw-flex tw-items-center tw-justify-end">
                          <f7-icon f7="person" width="15" class="mr-1" />{{roomsFree.find(it=>it.tipo_comodidade_id === item.id)?.quantidade}}
                        </div>
                        <div class="tw-col-span-6 tw-text-xs !tw-pt-0">
                          Valor
                        </div>
                        <div class="tw-col-span-6 tw-text-right tw-text-sm tw-font-semibold !tw-pt-0">
                          {{formatCurrency(calcularValor(valor, viagem.desconto?.desconto))}}<br>
                          <span class="tw-text-[10px]"> no PIX</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div v-for="item in rooms[4]" class="tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-4">
                <div
                  class="tw-bg-white tw-rounded-lg tw-shadow-md tw-cursor-pointer hover:tw-shadow-lg tw-transition-all"
                  :class="(item.is_ocupado ? '!tw-bg-blue-400 tw-cursor-not-allowed' : roomsSelected.selectedsById?.includes(item) ? '!tw-bg-yellow-400' : '!tw-bg-green-500')"
                  @click="!item.is_ocupado ? onClickRoom(item, null) : ''"
                >
                  <div class="tw-p-3 tw-text-white">
                    <div class="tw-grid tw-grid-cols-12">
                      <div class="tw-col-span-9 tw-text-xs">
                        {{item.nome}}
                      </div>
                      <div class="tw-col-span-3 tw-text-sm tw-flex tw-items-center tw-justify-end">
                        <f7-icon f7="person" width="15" class="mr-1" />{{item.quantidade}}
                      </div>
                      <div class="tw-col-span-6 tw-text-xs !tw-pt-0">
                        Valor
                      </div>
                      <div class="tw-col-span-6 tw-text-right tw-text-sm tw-font-semibold !tw-pt-0">
                        {{formatCurrency(calcularValor(item.comodo_trechos.valor + formatMoney(viagem.taxa_de_embarque), null))}}<br>
                        <span class="tw-text-[10px]"> no PIX</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Cômodos selecionados -->
        <div class="tw-mb-6">
          <div class="tw-flex tw-justify-center  tw-w-full tw-font-bold tw-mb-2">Cômodos selecionados</div>
          <div v-if="roomsSelected.selectedsById?.length > 0" class="tw-flex tw-flex-col tw-gap-2 tw-mb-2">
            <div v-for="room in roomsSelected.selectedsById" :key="room.id" class="tw-bg-yellow-400  tw-rounded-xl tw-px-4 tw-py-3 tw-flex tw-items-center tw-justify-between tw-shadow tw-w-full tw-text-base">
              <span>{{ room.tipo_comodidade?.nome || room.nome }}</span>
              <span class="tw-font-bold">{{ room.numeracao ? (room.numeracao < 10 ? '0' + room.numeracao : room.numeracao) : '' }}</span>
              <span>{{ room.comodo_trechos?.valor ? formatCurrency(calcularValor(room.comodo_trechos?.valor + formatMoney(viagem.taxa_de_embarque))) : formatCurrency(calcularValor(valor, viagem.desconto?.desconto)) }}</span>
              <f7-icon f7="trash" @click="onClickRoom(room, null)" class="tw-cursor-pointer  hover:tw-text-red-200" size="18px" />
            </div>
          </div>
          <div v-if="roomsSelected.selectedsByType?.length > 0" class="tw-flex tw-flex-col tw-gap-2 tw-mb-2">
            <div
              v-for="(room, i) in roomsSelected.selectedsByType"
              :key="i"
              class="tw-bg-yellow-400  tw-rounded-xl tw-px-4 tw-py-3 tw-flex tw-items-center tw-justify-between tw-shadow tw-w-full tw-text-base"
            >
              <span class="tw-font-semibold">{{ viagem.tipos_comodos.find(it=>it.id == room.type_comodo_id).nome }}</span>
                <div class="tw-p-[2px] tw-rounded-full ">
                    <div class="tw-flex tw-items-center tw-bg-white tw-rounded-full tw-px-4 tw-py-1">
                        <f7-icon
                            f7="minus"
                            @click="decrementComodo(room.type_comodo_id)"
                            class="tw-cursor-pointer tw-border  hover:tw-bg-orange-100 tw-rounded-full  "
                            size="22px"
                        />
                        <span class="tw-mx-4 tw-font-bold tw-text-lg">{{ room.quantidade }}</span>
                        <f7-icon
                            f7="plus"
                            @click="incrementComodo(room.type_comodo_id)"
                            class="tw-cursor-pointer  tw-border tw-rounded-full hover:tw-bg-green-100  "
                            size="22px"
                        />
                    </div>
                </div>
              <span class="tw-font-semibold">{{ formatCurrency(room.quantidade * calcularValor(valor, viagem.desconto?.desconto)) }}</span>
              <f7-icon f7="trash" @click="onClickRoom(null, room.type_comodo_id)" class="tw-cursor-pointer  hover:tw-text-red-200" size="22px" />
            </div>
          </div>
          <div v-if="roomsSelected.selectedsByType?.length === 0 && roomsSelected.selectedsById?.length === 0" class="tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-p !tw-m-0">
            Nenhum cômodo selecionado, clique em um cômodo para continuar
          </div>
        </div>
        <!-- Botões -->
        <div class="tw-flex tw-justify-center tw-gap-4">
          <button
            class="tw-bg-gray-200 tw-text-gray-700 tw-px-6 tw-py-2 tw-rounded-xl tw-font-medium hover:tw-bg-gray-300"
            @click="onClickVoltar"
            type="button"
          >
            Voltar
          </button>
          <button
            class="tw-bg-primary tw-text-white tw-px-8 tw-py-2 tw-rounded-xl tw-font-bold shadow-lg hover:tw-bg-primary/90 disabled:tw-opacity-50"
            :disabled="loadingReserva || (roomsSelected.selectedsByType?.length === 0 && roomsSelected.selectedsById?.length === 0)"
            @click="initSale"
          >
            {{ loadingReserva ? 'Carregando...' : 'Avançar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { f7Icon } from 'framework7-vue';
import { formatarTempoViagem, formatDate, formatMoney, calcularValor, formatCurrency } from '@/js/utils';
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { ComodoService } from '../../js/services/ComodoService';
import Boat from '../Boat.vue';
const props = defineProps({
  viagem: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['continue', 'voltar'])
const loadingReserva = ref(false)
const loadingSets = ref(false)
const rooms = ref([])
const roomsFree = ref([])
const windowWidth = ref(window.innerWidth)
const isLargeScreen = computed(()=> windowWidth.value >= 1024)
const matrizRooms = ref([])
const roomsSelected = ref({
    trecho:null,
    selectedsById:[],
    selectedsByType:[],
  })

const hasCamarotesAndRede = computed(() => {
    return props.viagem.tipos_comodos.some((item)=> item.id >= 2 && item.id <=4)
})

const valor = computed(()=>{
  return formatMoney(props.viagem?.valor) + formatMoney(props.viagem?.taxa_de_embarque);
})

const quantityRoomsFree = computed(() => {
  return roomsFree.value.reduce((acc, room) => {
      return acc + room.quantidade
    },0)
})

function allRooms (data, rooms) {
  const totalSpaces = data.linhas * data.colunas;
  const linearRooms = Array(totalSpaces).fill(null);

  if (rooms["1"] && rooms["1"].length) {
    for (const comodo of rooms["1"]) {
      try {
          const linhaInvertida = data.linhas - comodo.linha + 1
          const index = isLargeScreen.value
              ? (comodo.linha - 1) * data.colunas + (comodo.coluna - 1)
              : (comodo.coluna - 1) * data.linhas + (linhaInvertida - 1)
          linearRooms[index] = comodo;
      } catch (e) {
        console.error('Erro ao posicionar cômodo:', comodo, e);
      }
    }
  }

  return linearRooms;
}

function getQuantityRoomsFree() {
  console.log('getQuantityRoomsFree')
  const params = new URLSearchParams();
  params.append('trecho_id', props.viagem.id);
  params.append('viagem_id', props.viagem.id_viagem);

  ComodoService.getComodosLivres(params).then((response) => {
    roomsFree.value = response.data.data;

  });

}

function getRoomsByTrecho() {
  loadingSets.value = true
  console.log('getRoomsByTrecho')
  const params = new URLSearchParams();
  let tipoComodos = []
  params.append('trecho_id', props.viagem.id);
  params.append('viagem_id', props.viagem.id_viagem);
  tipoComodos = props.viagem.tipos_comodos.map(tipoComodo => tipoComodo.id)

  if (tipoComodos.includes(1)){
    ComodoService.getPoltronas(params).then((response) => {
      rooms.value = response.data.data;
      matrizRooms.value = allRooms(props.viagem,rooms.value);
      loadingSets.value = false
    });
  }else if(tipoComodos.includes(4)){
    ComodoService.getCamarotes(params).then((response) => {
      rooms.value = response.data.data;
      loadingSets.value = false
    })
  }
  // loadingSets.value = false
}

function onClickRoom(room, type) {
  try {
    if(type){
      const selectedsByType = roomsSelected.value.selectedsByType
      const type_comodo = selectedsByType.find(it=>it.type_comodo_id === type)
      if(type_comodo){
        if( type_comodo.quantidade > 0){
          roomsSelected.value.selectedsByType.splice(roomsSelected.value.selectedsByType.indexOf(type_comodo), 1)
        }else{
          roomsSelected.value.selectedsByType.push({ quantidade: 1, type_comodo_id: type })
        }
      }else{
        roomsSelected.value.selectedsByType.push({ quantidade: 1, type_comodo_id: type })
      }
    }else{
      const comodo = roomsSelected.value.selectedsById.find(it=>it.id == room.id)
      if(comodo){
        deleteReserva(room)
      }else{
        roomsSelected.value.selectedsById.push(room)
        postReserva(room)
      }
    }
  }catch (error){
    console.log(error)
      window.$notify(error.message,'error');
  }
}

function incrementComodo(type) {
  try {
    const selectedsByType = roomsSelected.value.selectedsByType
    const type_comodo = selectedsByType.find(it=>it.type_comodo_id === type)
    if(type_comodo){
      type_comodo.quantidade++
    }
  }catch (error){
      window.$notify(error.message,'error');
    }
}

function decrementComodo(type) {
  const selectedsByType = roomsSelected.value.selectedsByType
  const type_comodo = selectedsByType.find(it=>it.type_comodo_id === type)
  if(type_comodo){
    type_comodo.quantidade--
  }

  if(type_comodo.quantidade === 0){
      roomsSelected.value.selectedsByType.splice(roomsSelected.value.selectedsByType.indexOf(type_comodo), 1)
  }
}

function onClickVoltar(){
  roomsSelected.value.selectedsById.forEach(item => {
    deleteReserva(item)
  })

  emit('voltar')
}

function postReserva(room){
  loadingReserva.value = true
  const params = {
    trecho_id: props.viagem.id,
    viagem_id: props.viagem.id_viagem,
    comodo_id: room.id
  }

  ComodoService.reservarComodo(params).then((response) => {
    loadingReserva.value = false
  }).catch(error => {
    console.log(error)
    loadingReserva.value = false
    window.$notify(error.response.data.data.error,'error');
    roomsSelected.value.selectedsById.splice(roomsSelected.value.selectedsById.indexOf(room), 1)

  })
}

function deleteReserva(room){
  const params = {
    trecho_id: props.viagem.id,
    viagem_id: props.viagem.id_viagem,
    comodo_ids: [room.id]
  }
  ComodoService.deletarReserva(params).then((response) => {
    roomsSelected.value.selectedsById.splice(roomsSelected.value.selectedsById.indexOf(room), 1)
  }).catch(error => {
      window.$notify(error.response.data.data.error, 'error');
  })

}

function qunatidadeTotalPassagens(){

  const totalByType = roomsSelected.value.selectedsByType.reduce((i,j)=>{
    return i + j.quantidade
  },0)
  const totalById = roomsSelected.value.selectedsById.reduce((i,j)=>{
    return i + j.quantidade
  },0)

  return totalByType + totalById
}

async  function initSale(){
  let dataSale = null

  const tiposComodoEscolhidosIda = roomsSelected.value.selectedsByType.reduce((acc, item) => {
    acc[item.type_comodo_id] = item.quantidade;
    return acc;
  }, {});

  const params = {
    'trecho_id': props.viagem.id,
    'viagem_id': props.viagem.id_viagem,
    'tiposComodoEscolhidos': tiposComodoEscolhidosIda,
    'comodosAssentosEscolhidos': roomsSelected.value.selectedsById.map(item => item.id)
  };

  loadingReserva.value = true;
  ComodoService.iniciarVenda(params).then((response) => {
    const data = response.data.data;
    console.log(response)
    if(response.data.success){
      dataSale = {
        trecho: data.data.trecho,
        rooms: data.data.comodos,
        formas_pagamento: data.formas_pagamento,
      }

      emit('continue', dataSale);
    }
  }).catch(error => {
    console.log(error)
  }).finally(() => {
    loadingReserva.value = false;
  });
}

function generateLayout() {
  const linhas = props.viagem.linhas
  const colunas = props.viagem.colunas
  if (isLargeScreen.value) {
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${colunas}, 1fr)`,
      gap: "8px",
    }
  }else {
    return {
      display: "grid",
      gap: "8px",
      gridTemplateColumns: `repeat(${linhas}, 1fr)`,
  }
  }
}

watch(()=>props.viagem.id,()=>{
  roomsSelected.value.selectedsById = []
  roomsSelected.value.selectedsByType = []
  getQuantityRoomsFree()
  getRoomsByTrecho()
})

function scrollToStartDiv(){
  const minhaDiv = document.getElementById("cardTicket-"  + props.viagem.id_viagem);
  minhaDiv.scrollIntoView({ behavior: "smooth", block: "start" });

}

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
  matrizRooms.value = allRooms(props.viagem, rooms.value);
};


window.addEventListener('resize', updateWidth);
getQuantityRoomsFree()
getRoomsByTrecho()

</script>

<style scoped>

.my-badge {
  width: 20px;
  height: 20px;
  background-color: #000;
  border-radius: 30%;
  display: inline-block;
}

.comodo-container {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 24px 20px;
  width: 100%;
  color: #222;
  margin: 24px auto;
}
.comodo-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 16px;
}
.seta-comodo {
  margin: 0 8px;
  color: #2196F3;
  font-size: 20px;
}
.infos {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 14px;
  color: #666;
}

@media (max-width: 1023px) {
  .grid-mobile-reverse {
    direction: rtl;
  }
  .grid-mobile-reverse > * {
    direction: ltr;
  }
}
</style>
