<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-w-full">
    <div class="comodo-container !tw-mx-4">
     
    <div class="comodo-header">
      <div>
        <strong>{{ viagem.municipio_origem.nome }}/{{ viagem.municipio_origem.uf }}</strong>
        <span class="seta-comodo">→</span>
        <strong>{{ viagem.municipio_destino.nome }}/{{ viagem.municipio_destino.uf }}</strong>
      </div>
      <div class="infos">
        <span>Saída: {{ formatDate(viagem.data_embarque) }}</span>
        <span>Duração: {{ formatarTempoViagem(viagem.tempo_viagem) }}</span>
        <span>Embarcação: {{ viagem.embarcacao }}</span>
      </div>
    </div>
    <div class="tw-flex tw-flex-col my-3 tw-w-full" >
    <div v-if="viagem?.desconto" class="lg:tw-flex tw-items-center tw-justify-end">
      <div class="tw-flex tw-justify-end tw-items-center lg:tw-gap-3">
        <div class="tw-text-[12px] lg:tw-text-sm">Restam <strong class="tw-font-extrabold">{{quantityRoomsFree}} LUGARES</strong></div>
      </div>
    </div>
    <div class="tw-flex tw-flex-col lg:tw-flex-col-reverse tw-justify-center tw-items-center">
      <div class="tw-grid tw-grid-cols-3 tw-gap-4 tw-mt-3">
        <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
          <div class="my-badge !tw-bg-[#02bc6b]"></div>
          Livre
        </div>
        <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
          <div class="my-badge !tw-bg-[#3dccfd]"></div>
          vendido
        </div>
        <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
          <div class="my-badge !tw-bg-yellow-400"></div>
          selecionado
        </div>
      </div>
      <div class=" lg:!tw-max-w-[800px] tw-max-w-[350px] tw-px-0  tw-flex ">
        <Boat v-if="matrizRooms?.length > 0" class="">
          <div :style="generateLayout()" class="tw-h-full">
            <div
              v-for="(comodo, index) in matrizRooms"
              :key="index"
              :class="comodo?.id ? (comodo.is_ocupado ? '!tw-bg-[#3dccfd] tw-cursor-not-allowed' : roomsSelected.selectedsById?.includes(comodo) ? '!tw-bg-yellow-400' : '!tw-bg-[#02bc6b]') : 'tw-bg-gray-200'"
              class="tw-text-center tw-rounded-[5px] !tw-text-white tw-font-black tw-px-1 tw-py-[2px] tw-text-xs tw-h-[24px] tw-min-w-[32px] tw-cursor-pointer"
              @click="comodo?.id && !comodo.is_ocupado ? onClickRoom(comodo, null) : ''"
            >
              {{ comodo?.id ? (comodo.numeracao < 10 ? '0' + comodo.numeracao : comodo.numeracao) : '' }}
            </div>
          </div>
          <div class="tw-mt-2 lg:tw-hidden">
            <div class="tw-flex tw-w-full tw-font-bold">Mais passageiros?</div>
            <div class="tw-text-p tw-text-sm">selecione outro cômodo.</div>
          </div>
        </Boat>
        <div v-if="hasCamarotesAndRede" class="tw-w-full">
          <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
            <template v-for="item in viagem.tipos_comodos">
              <div v-if="item.id !== 4 && item.id !== 1" :key="item.id" class="tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-4">
                <div
                  class="tw-bg-white tw-rounded-lg tw-shadow-md tw-border-4 tw-border-blue-400 tw-cursor-pointer"
                  :class="roomsFree.find(it=>it.tipo_comodidade_id === item.id).quantidade > 0 ? 'hover:tw-shadow-lg' : 'tw-opacity-50 tw-cursor-not-allowed'"
                  @click="roomsFree.find(it=>it.tipo_comodidade_id === item.id).quantidade > 0 ? onClickRoom(null, item.id) : ''"
                >
                  <div class="tw-p-3 tw-text-white" :class="roomsSelected.selectedsByType?.find(it=>item.id == it.type_comodo_id)?.quantidade > 0 ? '!tw-bg-yellow-400' : roomsFree.find(it=>it.tipo_comodidade_id === item.id).quantidade === 0 ? '!tw-bg-[#3dccfd]' : '!tw-bg-[#02bc6b]'">
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
                class="tw-bg-white tw-rounded-lg tw-shadow-md tw-cursor-pointer hover:tw-shadow-lg"
                :class="(item.is_ocupado ? '!tw-bg-[#3dccfd] tw-cursor-not-allowed' : roomsSelected.selectedsById?.includes(item) ? '!tw-bg-yellow-400' : '!tw-bg-[#02bc6b]')"
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
    </div>
   
    <div class="tw-grid tw-grid-cols-12 tw-gap-4">
      <div class="tw-col-span-12 md:tw-col-span-12">
        <div class="tw-flex tw-justify-center lg:tw-justify-start tw-w-full tw-font-bold">Cômodos selecionados</div>
        <div class="mt-3" v-if="roomsSelected.selectedsById?.length > 0">
          <div v-for="room in roomsSelected.selectedsById" :key="room.id" class="tw-flex tw-justify-center tw-items-center tw-gap-1 tw-text-xs lg:tw-text-[16px] tw-text-p !tw-m-0">
            <div class="tw-col-span-8 tw-flex tw-items-center tw-gap-1 !tw-p-0">
              <div v-if="room.tipo_comodidade_id == 1 || room.tipo_comodidade == 1" class="tw-flex tw-items-center tw-gap-1 !tw-p-0">
                <div class="!tw-bg-yellow-400 tw-text-center tw-rounded-[5px] !tw-text-white tw-px-1 tw-py-[2px] my-1">
                  {{room.numeracao < 10 ? '0' + room.numeracao : room.numeracao}}
                </div>
                <span>{{room.tipo_comodidade.nome}}</span>
              </div>
              <div v-else class="tw-flex tw-items-center tw-gap-1 !tw-p-0">
                <div class="!tw-bg-yellow-400 tw-text-center tw-rounded-[5px] !tw-text-white tw-px-1 tw-py-[2px] my-1">
                  {{room.nome}}
                </div>
              </div>
            </div>
            <div class="tw-flex tw-items-center tw-gap-1 !tw-p-0 tw-justify-end">
              {{room.comodo_trechos?.valor ? formatCurrency(calcularValor(room.comodo_trechos?.valor + formatMoney(viagem.taxa_de_embarque))) : formatCurrency(calcularValor(valor, viagem.desconto?.desconto))}}
              <f7-icon f7="trash" @click="onClickRoom(room, null)" class="tw-cursor-pointer ml-3 tw-text-red-500" size="20px" />
            </div>
          </div>
        </div>
        <div class="mt-3" v-if="roomsSelected.selectedsByType?.length > 0">
          <div v-for="(room, i) in roomsSelected.selectedsByType" :key="i" class="tw-flex tw-justify-between tw-items-center tw-gap-1 lg:tw-text-[16px] tw-text-xs tw-text-p !tw-m-0">
            <div class="tw-col-span-3 tw-flex tw-items-center tw-gap-1 !tw-p-0">
              <div class="!tw-bg-yellow-400 tw-text-center tw-rounded-[5px] !tw-text-white tw-px-1 tw-py-[2px] my-1">
                {{viagem.tipos_comodos.find(it=>it.id == room.type_comodo_id).nome}}
              </div>
            </div>
            <div class="tw-col-span-4 tw-flex tw-items-center tw-gap-1 !tw-p-0 tw-justify-end">
              <f7-icon f7="minus" @click="decrementComodo(room.type_comodo_id)" class="mr-3 tw-cursor-pointer" size="20px" />
              {{ room.quantidade}}
              <f7-icon f7="plus" @click="incrementComodo(room.type_comodo_id)" class="ml-3 tw-cursor-pointer" size="20px" />
            </div>
            <div class="tw-col-span-4 tw-flex tw-items-center tw-gap-1 !tw-p-0 tw-justify-end">
              {{formatCurrency(room.quantidade * calcularValor(valor, viagem.desconto?.desconto))}}
              <f7-icon f7="trash" @click="onClickRoom(null, room.type_comodo_id)" class="tw-cursor-pointer ml-3 tw-text-red-500" size="20px" />
            </div>
          </div>
        </div>
        <div v-if="roomsSelected.selectedsByType?.length === 0 && roomsSelected.selectedsById?.length === 0" class="tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-p !tw-m-0">
          Nenhum cômodo selecionado
        </div>
      </div>
      <div class="tw-col-span-12 md:tw-col-span-4 tw-hidden lg:tw-block">
        <div class="tw-flex tw-justify-center lg:tw-justify-start tw-w-full tw-font-bold">Mais passageiros?</div>
        <div class="tw-text-p tw-text-xs">selecione outro cômodo.</div>
      </div>
    </div>

    <div class="tw-flex tw-justify-center tw-mt-6 tw-gap-4">
      <button
          class="tw-bg-gray-200 tw-text-gray-700 tw-px-4 tw-py-2 tw-rounded-lg tw-font-medium hover:tw-bg-gray-300"
          @click="$emit('voltar')"
          type="button"
        >
          Voltar
        </button>
      <button 
        class="tw-bg-blue-500 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg tw-font-semibold hover:tw-bg-blue-600 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
        :disabled="loadingReserva || (roomsSelected.selectedsByType?.length === 0 && roomsSelected.selectedsById?.length === 0)"
        @click="initSale"
      >
        {{ loadingReserva ? 'Carregando...' : 'Avançar' }}
      </button>
    
    </div>
  </div>


    
    <f7-preloader v-if="loadingSets" />
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
        const index = isLargeScreen.value
            ? (comodo.linha - 1) * data.colunas + (comodo.coluna - 1)
            : (comodo.coluna - 1) * data.linhas + (comodo.linha - 1)
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
    showErrorNotification(error.message);
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
    showErrorNotification(error.message);
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
    loadingReserva.value = false
    showErrorNotification(error.response.data.data.error);
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
    showErrorNotification(error.response.data.data.error);
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
    if(response.data.success){
      dataSale = {
        trecho: data.data.trecho,
        rooms: data.data.comodos,
        formas_pagamento: data.formas_pagamento,
      }
      emit('continue', dataSale);
    }
  }).catch(error => {
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
</style>
