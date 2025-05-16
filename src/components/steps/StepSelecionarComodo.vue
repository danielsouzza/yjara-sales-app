<template>
  <f7-page>
    <div class="comodo-container">
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
      <f7-row>
        <f7-col>
          <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
            <div class="my-badge !tw-bg-[#02bc6b]"></div>
            Livre
          </div>
        </f7-col>
        <f7-col>
          <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
            <div class="my-badge !tw-bg-[#3dccfd]"></div>
            vendido
          </div>
        </f7-col>
        <f7-col>
          <div class="tw-flex tw-items-center tw-gap-1 tw-text-sm">
            <div class="my-badge !tw-bg-yellow-400"></div>
            selecionado
          </div>
        </f7-col>
      </f7-row>
      <f7-container class="lg:!tw-max-w-[800px] tw-max-w-[350px] tw-px-0 tw-flex">
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
          <div class="mt-2 lg:tw-hidden">
            <div class="tw-flex tw-w-full tw-font-bold">Mais passageiros?</div>
            <div class="tw-text-p tw-text-sm">selecione outro cômodo.</div>
          </div>
        </Boat>
        <f7-container v-if="hasCamarotesAndRede">
          <f7-row>
            <template v-for="item in viagem.tipos_comodos">
              <f7-col v-if="item.id !== 4 && item.id !== 1" :key="item.id" cols="12" md="6" lg="4">
                <f7-card
                  class="!tw-border-4 !tw-border-blue-400"
                  flat
                  @click="roomsFree.find(it=>it.tipo_comodidade_id === item.id).quantidade > 0 ? onClickRoom(null, item.id) : ''"
                  :class="roomsSelected.selectedsByType?.find(it=>item.id == it.type_comodo_id)?.quantidade > 0 ? '!tw-bg-yellow-400' : roomsFree.find(it=>it.tipo_comodidade_id === item.id).quantidade === 0 ? '!tw-bg-[#3dccfd] tw-cursor-not-allowed' : '!tw-bg-[#02bc6b]'"
                >
                  <f7-row class="tw-p-3 !tw-text-white">
                    <f7-col cols="8" class="tw-text-xs">
                      {{item.nome}}
                    </f7-col>
                    <f7-col cols="4" class="tw-text-sm tw-flex tw-items-center tw-justify-end">
                      <Icon icon="el:person" width="15" class="mr-1" />{{roomsFree.find(it=>it.tipo_comodidade_id === item.id)?.quantidade}}
                    </f7-col>
                    <f7-col cols="6" class="tw-text-xs !tw-pt-0">
                      Valor
                    </f7-col>
                    <f7-col cols="6" class="tw-text-right tw-text-sm tw-font-semibold !tw-pt-0">
                      {{formatCurrency(calcularValor(valor, viagem.desconto?.desconto))}}<br>
                      <span class="tw-text-[10px]"> no PIX</span>
                    </f7-col>
                  </f7-row>
                </f7-card>
              </f7-col>
            </template>
            <f7-col v-for="item in rooms[4]" cols="12" md="6" lg="4">
              <f7-card
                flat
                @click="!item.is_ocupado ? onClickRoom(item, null) : ''"
                  :class="(item.is_ocupado ? '!tw-bg-[#3dccfd] tw-cursor-not-allowed' : roomsSelected.selectedsById?.includes(item) ? '!tw-bg-yellow-400' : '!tw-bg-[#02bc6b]')"
              >
                <f7-row class="tw-p-3 !tw-text-white">
                  <f7-col cols="9" class="tw-text-xs">
                    {{item.nome}}
                  </f7-col>
                  <f7-col cols="3" class="tw-text-sm tw-flex tw-items-center tw-justify-end">
                    <Icon icon="el:person" width="15" class="mr-1" />{{item.quantidade}}
                  </f7-col>
                  <f7-col cols="6" class="tw-text-xs !tw-pt-0">
                    Valor
                  </f7-col>
                  <f7-col cols="6" class="tw-text-right tw-text-sm tw-font-semibold !tw-pt-0">
                    {{formatCurrency(calcularValor(item.comodo_trechos.valor + formatMoney(viagem.taxa_de_embarque), null))}}<br>
                    <span class="tw-text-[10px]"> no PIX</span>
                  </f7-col>
                </f7-row>
              </f7-card>
            </f7-col>
          </f7-row>
        </f7-container>
      </f7-container>
    </div>
    <f7-divider :thickness="1" class="tw-border-opacity-100 tw-my-2 tw-hidden lg:tw-block mt-5"></f7-divider>
    <f7-row>
      <f7-col cols="12" md="12">
        <div class="tw-flex tw-justify-center lg:tw-justify-start tw-w-full tw-font-bold">Cômodos selecionados</div>
        <div class="mt-3" v-if="roomsSelected.selectedsById?.length > 0">
          <f7-row v-for="room in roomsSelected.selectedsById" :key="room.id" class="tw-flex tw-justify-center tw-items-center tw-gap-1 tw-text-xs lg:tw-text-[16px] tw-text-p !tw-m-0">
            <f7-col cols="8" class="tw-flex tw-items-center tw-gap-1 !tw-p-0">
              <div v-if="room.tipo_comodidade_id == 1 || room.tipo_comodidade == 1" class="tw-flex tw-items-center tw-gap-1 !tw-p-0">
                <div class="!tw-bg-yellow-400 tw-text-center tw-rounded-[5px] !tw-text-white tw-px-1 tw-py-[2px] my-1">
                  {{room.numeracao < 10 ? '0' + room.numeracao : room.numeracao}}
                </div>
                <span>{{room.tipo_comodidade.nome}}</span>
              </div>
              <div v-else class="tw-flex tw-items-center tw-gap-1 !tw-p-0">
                <div class="!tw-bg-yellow-400 tw-text-center tw-rounded-[5px] !tw-text-white tw-px-1 tw-py-[4px] my-1">
                  {{room.nome}}
                </div>
              </div>
            </f7-col>
            <f7-col class="tw-flex tw-items-center tw-gap-1 !tw-p-0 tw-justify-end">{{room.comodo_trechos?.valor ? formatCurrency(calcularValor(room.comodo_trechos?.valor + formatMoney(viagem.taxa_de_embarque))) : formatCurrency(calcularValor(valor, viagem.desconto?.desconto))}} <Icon @click="onClickRoom(room, null)" icon="iconamoon:trash" width="25" class="tw-cursor-pointer ml-3 tw-text-red-500" /></f7-col>
          </f7-row>
        </div>
        <div class="mt-3" v-if="roomsSelected.selectedsByType?.length > 0">
          <f7-row v-for="(room, i) in roomsSelected.selectedsByType" :key="i" class="tw-flex tw-justify-between tw-items-center tw-gap-1 lg:tw-text-[16px] tw-text-xs tw-text-p !tw-m-0">
            <f7-col cols="3" class="tw-flex tw-items-center tw-gap-1 !tw-p-0">
              <div class="!tw-bg-yellow-400 tw-text-center tw-rounded-[5px] !tw-text-white tw-px-1 tw-py-[2px] my-1">
                {{viagem.tipos_comodos.find(it=>it.id == room.type_comodo_id).nome}}
              </div>
            </f7-col>
            <f7-col cols="4" class="tw-flex tw-items-center tw-gap-1 !tw-p-0 tw-justify-end">
              <Icon @click="decrementComodo(room.type_comodo_id)" icon="ph:minus-fill" width="20" class="mr-3 tw-cursor-pointer" /> {{ room.quantidade}} <Icon @click="incrementComodo(room.type_comodo_id)" icon="ph:plus-fill" width="20" class="ml-3 tw-cursor-pointer" />
            </f7-col>
            <f7-col cols="4" class="tw-flex tw-items-center tw-gap-1 !tw-p-0 tw-justify-end">
              {{formatCurrency(room.quantidade * calcularValor(valor, viagem.desconto?.desconto))}} <Icon @click="onClickRoom(null, room.type_comodo_id)" icon="iconamoon:trash" width="25" class="tw-cursor-pointer ml-3 tw-text-red-500" />
            </f7-col>
          </f7-row>
        </div>
        <div v-if="roomsSelected.selectedsByType?.length === 0 && roomsSelected.selectedsById?.length === 0" class="tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-p !tw-m-0">
          Nenhum cômodo selecionado
        </div>
      </f7-col>
      <f7-col cols="12" md="4" class="tw-hidden lg:tw-block">
        <div class="tw-flex tw-justify-center lg:tw-justify-start tw-w-full tw-font-bold">Mais passageiros?</div>
        <div class="tw-text-p tw-text-xs">selecione outro cômodo.</div>
      </f7-col>
    </f7-row>
  </div>


    
    <f7-preloader v-if="loadingSets" />
  </div>
  </f7-page>
  
</template>

<script setup>
import { formatarTempoViagem, formatDate, formatMoney, calcularValor, formatCurrency } from '@/js/utils';
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { ComodoService } from '../../js/services/ComodoService';

const props = defineProps({
  viagem: {
    type: Object,
    required: true
  }
});

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
      roomsSelected.value[typeTravel].selectedsByType.splice(roomsSelected.value[typeTravel].selectedsByType.indexOf(type_comodo), 1)
  }
}

function postReserva(room){
  loadingReserva.value = true
  const params = new URLSearchParams();
  params.append('trecho_id',  props.viagem.id);
  params.append('viagem_id',  props.viagem.id_viagem);

  params.append('comodo_id', room.id);
  routes['rooms.reservas'](params).then((response) => {
    loadingReserva.value = false
  }).catch(error => {
    loadingReserva.value = false
    showErrorNotification(error.response.data.data.error);
    roomsSelected.value.selectedsById.splice(roomsSelected.value.selectedsById.indexOf(room), 1)
  
  })
}

function deleteReserva(room){
  routes['rooms.reservas.delete']({
    data:{
      trecho_id: props.viagem.id,
      viagem_id: props.viagem.id_viagem,
      comodo_ids:[room.id]

    }
  }).then((response) => {
    if(response.data.success){
      roomsSelected.value.selectedsById.splice(roomsSelected.value.selectedsById.indexOf(room), 1)
    }
  }).catch(error => {
    roomsSelected.value.selectedsById.splice(roomsSelected.value.selectedsById.indexOf(room), 1)
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
  const dataSale = null
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
  loadingStore.startLoading();

 ComodoService.iniciarVenda(params).then((response) => {
    const data = response.data.data;
    if(response.data.success){
     dataSale = {
       trecho: data.data.trecho,
       rooms: data.data.comodos,
       formas_pagamento: data.formas_pagamento,
     }
      // showSuccessNotification(response.data.message);
      // onClickBtnSelect()
    }
  }).catch(error => {
    loadingStore.stopLoading();
    showErrorNotification(error.response.data.data.error);
  })

  loadingStore.stopLoading();
  emit('continue', dataSale);
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
getQuantityRoomsFree()
getRoomsByTrecho()
onMounted(() => {
  console.log('onMounted')
  window.addEventListener('resize', updateWidth);
  getQuantityRoomsFree()
  getRoomsByTrecho()
  
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth);
});




</script>

<style scoped>
.comodo-container {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 24px 20px;
  color: #222;
  max-width: 600px;
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
