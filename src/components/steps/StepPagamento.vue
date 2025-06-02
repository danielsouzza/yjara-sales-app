<template>
  <div class=" tw-mx-4 tw-bg-white tw-shadow tw-rounded-xl tw-px-4 tw-py-4">
    <div class="tw-flex tw-justify-between tw-items-center tw-mb-6">
    
      <h2 class="tw-text-2xl tw-font-bold tw-text-primary">Pagamento do Pedido</h2>
    </div>
    <!-- Resumo mais clean -->
    <div class="resumo-pagamento-card">
      <div class="resumo-header">
        <span class="resumo-title">Resumo da viagem</span>
      </div>
      <div class="resumo-bloco" v-for="(agrup, idx) in order.passagens_agrupadas":key="idx">
  
        <div class="resumo-linha">
         
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="#6b7280" d="M2 19c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-8H2zM19 4h-2V3c0-.6-.4-1-1-1s-1 .4-1 1v1H9V3c0-.6-.4-1-1-1s-1 .4-1 1v1H5C3.3 4 2 5.3 2 7v2h20V7c0-1.7-1.3-3-3-3" />
          </svg>
          <span class="resumo-info">{{ agrup.trecho_viagem?.data_embarque }}</span>
        </div>
        <div class="resumo-linha">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="#6b7280" fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-4a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h5a1 1 0 1 0 0-2h-4z" clip-rule="evenodd" />
          </svg>
          <span class="resumo-info">{{ agrup.trecho?.tempo_viagem }}</span>
        </div>
        <div class="resumo-linha">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="#6b7280" fill-rule="evenodd" d="M11.906 1.994a8 8 0 0 1 8.09 8.421a8 8 0 0 1-1.297 3.957a1 1 0 0 1-.133.204l-.108.129q-.268.365-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18 18 0 0 1-.309-.38l-.133-.163a1 1 0 0 1-.13-.202a7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0a3 3 0 0 1 5.999 0" clip-rule="evenodd" />
          </svg>
          <span class="resumo-info">
            {{ agrup.trecho?.municipio_origem?.nome }}/{{ agrup.trecho?.municipio_origem?.uf }}
            <span class="resumo-seta">→</span>
            {{ agrup.trecho?.municipio_destino?.nome }}/{{ agrup.trecho?.municipio_destino?.uf }}
          </span>
        </div>
        <div class="resumo-linha">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="#6b7280" d="M17.179 21H6.82c-.745 0-1.21 0-1.571-.042v1.291a.75.75 0 0 1-1.5 0v-1.865a4 4 0 0 1-1.656-2.494C2 17.45 2 16.92 2 15.857v-4.611C2 10.006 2.943 9 4.105 9c1.163 0 2.106 1.005 2.106 2.246v3.087c0 .943 0 1.415.292 1.707c.293.293.765.293 1.708.293h7.579c.942 0 1.414 0 1.707-.293c.293-.292.293-.764.293-1.707v-3.087c0-1.24.942-2.246 2.105-2.246C21.057 9 22 10.005 22 11.246v4.611c0 1.063 0 1.594-.094 2.033a4 4 0 0 1-1.656 2.494v1.866a.75.75 0 0 1-1.5 0v-1.292c-.36.042-.826.042-1.571.042" />
            <path fill="#6b7280" d="M6 8.672v-.518c0-2.3 0-3.451.482-4.308A3.65 3.65 0 0 1 7.8 2.495C8.635 2 9.757 2 12 2s3.365 0 4.2.495c.547.324 1.002.79 1.318 1.351C18 4.703 18 5.853 18 8.154v.518a3.32 3.32 0 0 0-1.21 2.574v3.087c0 .472 0 .707-.147.854c-.146.146-.382.146-.854.146H8.212c-.472 0-.708 0-.854-.146c-.146-.147-.146-.382-.146-.854v-3.087A3.32 3.32 0 0 0 6 8.672" />
          </svg>
          <span class="resumo-info">{{gerarStringTiposComodos(agrup.passagem_pedidos.map(it=>it.comodo.tipo_comodidade))}}</span> 
        </div>
        <div class="resumo-linha">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <g fill="none" fill-rule="evenodd">
              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path fill="#6b7280" d="M14.211 17.776a4 4 0 0 1 3.364-.099l.214.1l2.658 1.328a1 1 0 0 1-.787 1.835l-.107-.046l-2.659-1.329a2 2 0 0 0-1.617-.076l-.172.076l-1.316.659a4 4 0 0 1-3.365.098l-.213-.098l-1.317-.659a2 2 0 0 0-1.617-.076l-.172.076l-2.658 1.33a1 1 0 0 1-.996-1.731l.102-.059l2.658-1.329a4 4 0 0 1 3.364-.099l.214.1l1.316.658a2 2 0 0 0 1.618.076l.171-.076zM13 2a1 1 0 0 1 1 1v1.32l3.329.554a2 2 0 0 1 1.67 1.973v3.432l2.06.686a1.25 1.25 0 0 1 .753 1.679l-2.169 5.06l-1.854-.928a4 4 0 0 0-3.578 0l-1.317.659a2 2 0 0 1-1.789 0l-1.316-.659a4 4 0 0 0-3.578 0l-1.27.636l-2.658-4.651a1.25 1.25 0 0 1 .69-1.806L5 10.279V6.847a2 2 0 0 1 1.67-1.973L10 4.32V3a1 1 0 0 1 1-1zm-1 4.014l-5 .833v2.766l4.367-1.456a2 2 0 0 1 1.265 0L17 9.613V6.847z" />
            </g>
          </svg>
          <span class="resumo-info">{{ agrup.viagem?.embarcacao?.nome }}</span>
        </div>
      </div>
      
      <div class="resumo-linha resumo-linha-total tw-w-full tw-flex tw-justify-between tw-items-center">
        <span class="resumo-label ">Total:</span>
        <span class="resumo-info resumo-total-valor">
          <template v-if="paymentMethod === 'pix'">
            {{ formatCurrency(order.total) }}
          </template>
          <template v-else>
            {{ formatCurrency(totalComJuros) }}
            <div class="resumo-pagamento-info">
              <span v-if="cardData.installment_quantity > 1">
                em {{ cardData.installment_quantity }}x de {{ formatCurrency(totalComJuros / cardData.installment_quantity) }}
              </span>
            </div>
          </template>
        </span>
      </div>
    </div>
    <div v-if="currentStep === 1">
      <!-- Escolha de pagamento moderna e compacta -->
      <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4 tw-mb-6">
        <div
          @click="paymentMethod = 'pix'"
          :class="[ 'tw-cursor-pointer tw-bg-white tw-rounded-xl tw-shadow-sm tw-p-4 tw-flex tw-flex-col tw-items-center tw-relative tw-border', paymentMethod === 'pix' ? 'tw-border-primary tw-shadow' : 'tw-border-gray-200 hover:tw-border-primary/40']"
        >
          <img src="@/assets/images/payment-pix.svg" alt="" class="tw-mb-2 tw-h-7 tw-object-contain" />
          <div class="tw-font-bold tw-text-base tw-mb-1">Pix</div>
          <div class="tw-text-xs tw-text-gray-500">Pague com Pix (QR Code ou Copia e Cola)</div>
          <span v-if="paymentMethod === 'pix'" class="tw-absolute tw-top-2 tw-right-2 tw-bg-primary tw-text-white tw-rounded-full tw-p-1 tw-shadow"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></span>
        </div>
        <div
          @click="paymentMethod = 'credit'"
          :class="[ 'tw-cursor-pointer tw-bg-white tw-rounded-xl tw-shadow-sm tw-p-4 tw-flex tw-flex-col tw-items-center tw-relative tw-border', paymentMethod === 'credit' ? 'tw-border-primary tw-shadow' : 'tw-border-gray-200 hover:tw-border-primary/40']"
        >
          <img src="@/assets/images/payment-credit-card.svg" alt="" class="tw-mb-2 tw-h-7 tw-object-contain" />
          <div class="tw-font-bold tw-text-base tw-mb-1">Cartão de Crédito</div>
          <div class="tw-text-xs tw-text-gray-500">Pague com cartão de crédito</div>
          <span v-if="paymentMethod === 'credit'" class="tw-absolute tw-top-2 tw-right-2 tw-bg-primary tw-text-white tw-rounded-full tw-p-1 tw-shadow"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg></span>
        </div>
      </div>
      <!-- Fim escolha moderna -->
      <div v-if="paymentMethod === 'pix'" class="tw-mb-4">
        <button @click="submitPix" :disabled="loading" class="tw-bg-primary tw-text-white tw-w-full tw-py-3 tw-rounded-xl tw-font-bold tw-shadow hover:tw-bg-primary/90 disabled:tw-opacity-50 tw-transition">
          <span v-if="!loading">Gerar Pix</span>
          <span v-else>Gerando...</span>
        </button>
      </div>
      <div v-if="paymentMethod === 'credit'" class="tw-mb-4">
        <form @submit.prevent="submitCredit" class="tw-space-y-4 tw-mt-2 tw-bg-white tw-rounded-xl tw-shadow-sm tw-p-4 tw-max-w-md tw-mx-auto">
          <div>
            <label class="custom-select-label">Nome no cartão</label>
            <div class="onboarding-search">
              <span class="onboarding-search-icon">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/></svg>
              </span>
              <input v-model="cardData.holder" required placeholder="Digite o nome impresso no cartão" class="onboarding-search-input" />
            </div>
          </div>
          <div>
            <label class="custom-select-label">Número do cartão</label>
            <div class="onboarding-search">
              <span class="onboarding-search-icon">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="3" stroke="#A0AEC0" stroke-width="2"/><rect x="2" y="9" width="20" height="2" fill="#A0AEC0"/></svg>
              </span>
              <input v-model="cardData.card_number" required maxlength="19" placeholder="Número do cartão" class="onboarding-search-input" />
            </div>
          </div>
          <div class="tw-grid tw-grid-cols-2 tw-gap-4">
            <div>
              <label class="custom-select-label">Validade</label>
              <div class="onboarding-search">
                <span class="onboarding-search-icon">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </span>
                <input v-model="cardData.expiration_date" v-mask-doc="'##/####'" placeholder="MM/AA" class="onboarding-search-input" />
              </div>
            </div>
            <div>
              <label class="custom-select-label">CVV</label>
              <div class="onboarding-search">
                <span class="onboarding-search-icon">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#A0AEC0" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="#A0AEC0"/></svg>
                </span>
                <input v-model="cardData.security_code" required maxlength="4" placeholder="CVV" class="onboarding-search-input" />
              </div>
            </div>
          </div>
          <div>
            <label class="custom-select-label">Parcelas</label>
            <CustomSelect
                v-model="cardData.installment_quantity"
                label=""
                :searchable="false"
                placeholder="Selecione as parcelas"
                :options="pacerls.map(p => ({ value: p.value, label: `${p.value}x (${(p.percent * 100).toFixed(0)}% de juros)` }))"
                :required="true"
                class="onboarding-search-input tw-bg-transparent tw-border-none"
              />
          </div>
          <div v-if="cardData.installment_quantity">
            Valor total com juros: <b>{{ formatCurrency(totalComJuros) }}</b>
          </div>
          <button type="submit" :disabled="loading" class="tw-bg-primary tw-text-white tw-w-full tw-py-3 tw-rounded-xl tw-font-bold tw-shadow hover:tw-bg-primary/90 disabled:tw-opacity-50 tw-transition">
            <span v-if="!loading">Pagar com Cartão</span>
            <span v-else>Processando...</span>
          </button>
        </form>
      </div>
    </div>

    <div v-if="currentStep === 2">
      <div class="tw-flex tw-justify-center tw-flex-col tw-items-center">
        <div class="tw-mb-4 tw-text-center tw-w-full">
          <div class="tw-text-lg tw-font-semibold tw-text-gray-700">Tempo restante para pagamento:</div>
          <div class="tw-text-2xl tw-font-bold tw-text-primary tw-mb-2">{{ formatTimeRemaining }}</div>
          <div class="tw-w-full tw-bg-gray-200 tw-rounded-full tw-h-2.5">
            <div class="tw-bg-primary tw-h-2.5 tw-rounded-full tw-transition-all tw-duration-1000" :style="{ width: `${(currentMinuteProgress / 60) * 100}%` }"></div>
          </div>
        </div>

        <div class="tw-w-full tw-max-w-md tw-mb-4">
          <div class="tw-break-all tw-bg-gray-100 tw-p-3 tw-rounded-lg tw-text-center tw-text-sm tw-flex tw-items-center tw-justify-between tw-gap-2">
            <span class="tw-text-gray-600">{{ truncatedPixCode }}</span>
            <button @click="copiarPix" class="tw-bg-primary tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm hover:tw-bg-primary/90 tw-transition tw-flex tw-items-center tw-gap-2">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
              </svg>
              Copiar Pix
            </button>
          </div>
        </div>

        <div class="tw-relative">
          <VueQrcode :value="paymentPending.pix_copia_cola" :size="200" />
          <div v-if="loading" class="tw-absolute tw-inset-0 tw-bg-white tw-bg-opacity-75 tw-flex tw-items-center tw-justify-center">
            <div class="tw-animate-spin tw-rounded-full tw-h-8 tw-w-8 tw-border-b-2 tw-border-primary"></div>
          </div>
        </div>
        <div class="tw-mt-4 tw-text-sm tw-text-gray-600">Escaneie o QR Code ou copie o código Pix acima</div>
        
        <button @click="voltar" class="tw-mt-6 tw-bg-white tw-text-primary tw-border tw-border-primary tw-w-full tw-py-3 tw-rounded-xl tw-font-bold tw-shadow hover:tw-bg-primary/5 disabled:tw-opacity-50 tw-transition tw-flex tw-items-center tw-justify-center tw-gap-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Voltar
        </button>
      </div>
    </div>

    <div v-if="currentStep === 3">
      <div class="tw-flex tw-justify-center tw-flex-col tw-items-center tw-text-center">
        <!-- <Icon icon="icon-park-outline:ticket" class="mr-2 tw-text-secondary !tw-text-[80px]" /> -->
        <p class="tw-text-xl tw-text-secondary tw-font-bold my-2">Compra realizada com sucesso!</p>
        <p>Olá, {{ order.contato?.nome }}! <br> Sua passagem está confirmada e foi enviada para seu email e WhatsApp</p>
        <p><strong>Pedido {{ order.id }}</strong></p>
      </div>
    </div>

    <!-- <div class="tw-flex tw-justify-center tw-mt-6 tw-gap-4">
      <button @click="voltarParaDados" class="tw-bg-white tw-text-primary tw-border tw-border-primary tw-w-full tw-py-3 tw-rounded-xl tw-font-bold tw-shadow hover:tw-bg-primary/5 disabled:tw-opacity-50 tw-transition tw-flex tw-items-center tw-justify-center tw-gap-2">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Voltar para Dados
      </button>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { formatCurrency, pacerls, gerarStringTiposComodos } from '@/js/utils'
import CustomSelect from '../ui/CustomSelect.vue'
import VueQrcode from 'vue-qrcode'

import { PedidoService } from '@/js/services/PedidoService'


const props = defineProps({
  order: Object
})

const emit = defineEmits(['update:step', 'voltar'])

const currentStep = ref(1)
const paymentMethod = ref('pix')
const paymentPending = ref(null)
const loading = ref(false)
const error = ref('')
const success = ref('')
const cardData = ref({
  holder: '',
  card_number: '',
  expiration_date: '',
  security_code: '',
  installment_quantity: 1
})

const paymentOptions = [
  {
    value: 'credit',
    label: 'Cartão de Crédito',
    desc: 'Pague com cartão de crédito',
    img: '/assets/images/payment-credit-card.svg'
  },
  {
    value: 'pix',
    label: 'Pix',
    desc: 'Pague com Pix (QR Code ou Copia e Cola)',
    img: '/assets/images/payment-pix.svg'
  }
]

const timeRemaining = ref(30 * 60)
let timer = null
let checkTimeout = null

const currentMinuteProgress = ref(0)
const truncatedPixCode = computed(() => {
  if (!paymentPending.value?.pix_copia_cola) return ''
  const code = paymentPending.value.pix_copia_cola
  return code.slice(0, 20) + '...' + code.slice(-20)
})

const formatTimeRemaining = computed(() => {
  const minutes = Math.floor(timeRemaining.value / 60)
  const seconds = timeRemaining.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

function copiarPix() {
  if (paymentPending.value?.pix_copia_cola) {
    navigator.clipboard.writeText(paymentPending.value.pix_copia_cola)
    window.$notify('Código Pix copiado!', 'success')
  }
}

function startTimer() {
  timer = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
      currentMinuteProgress.value = (currentMinuteProgress.value + 1) % 60
    } else {
      clearInterval(timer)
      paymentPending.value = null
      error.value = 'Tempo para pagamento expirado. Por favor, gere um novo PIX.'
    }
  }, 1000)
}

function clearCheckTimeout() {
  if (checkTimeout) {
    clearTimeout(checkTimeout)
    checkTimeout = null
  }
}

function checkStatusPayment() {
  PedidoService.paymentStatus(props.order.id).then(res => {
    if (res.data.success) {
      const orderStatus = res.data.data
      if (orderStatus.status === "Pago") {
        clearInterval(timer)
        clearCheckTimeout()
        currentStep.value = 3
        emit('update:step', 3)
      } else {
        if (timeRemaining.value === 0) {
          error.value = 'Tempo de pagamento expirado'
          paymentPending.value = null
          currentStep.value = 1
          emit('update:step', 1)
        } else {
          checkTimeout = setTimeout(() => checkStatusPayment(), 10000)
        }
      }
    }
  }).catch((error) => {
    paymentPending.value = null
    error.value = 'Erro ao verificar status do pagamento'
    window.$notify(error.response?.data?.data?.details ?? error.response?.data?.data?.error ?? error.response?.data?.message,'error');

    currentStep.value = 1
    emit('update:step', 1)
  })
}

function submitPix() {
  loading.value = true
  error.value = ''
  success.value = ''
  timeRemaining.value = 30 * 60
  PedidoService.paymentPix({ order_id: props.order.id }).then(res => {
    paymentPending.value = res.data.data
    success.value = 'Pix gerado com sucesso!'
    loading.value = false
    currentStep.value = 2
    emit('update:step', 2)
    startTimer()
    checkStatusPayment()
  }).catch((error) => {
    console.log(erro)
    window.$notify(error.response?.data?.data?.details ?? error.response?.data?.data?.error ?? error.response?.data?.message, 'error')
    loading.value = false
  })
}

function submitCredit() {
  loading.value = true
  error.value = ''
  success.value = ''
  PedidoService.paymentCredito({
    order_id: props.order.id,
    credit_card: {
      ...cardData.value,
      card_number: cardData.value.card_number.replaceAll(' ', '')
    }
  }).then(res => {
    window.$notify('Pagamento aprovado!', 'success')
    loading.value = false
    currentStep.value = 3
    emit('update:step', 3)
  }).catch((error) => {
    console.log(error)
    if(error.response) {
      window.$notify(error.response?.data?.data?.details ?? error.response?.data?.data?.error ?? error.response?.data?.message, 'error')
    } else {
      window.$notify('Erro ao processar pagamento', 'error')
    }
    loading.value = false
  })
}

const totalComJuros = computed(() => {
  const parcela = pacerls.find(p => p.value === cardData.value.installment_quantity);
  if (!parcela) return props.order.total;
  const acrescimo = props.order.total * parcela.percent;
  return props.order.total + Math.max(0, acrescimo);
});

function voltar() {
  if (currentStep.value === 1) {
    emit('update:step', 0) // Volta para a tela de dados
  } else {
    currentStep.value = 1
    emit('update:step', 1)
  }
  
  if (timer) {
    clearInterval(timer)
  }
  clearCheckTimeout()
  paymentPending.value = null
  timeRemaining.value = 30 * 60
  currentMinuteProgress.value = 0
}

function voltarParaDados() {
  emit('voltar')
}

onMounted(() => {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && paymentPending.value) {
      checkStatusPayment()
    } else {
      clearCheckTimeout()
    }
  })
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
  clearCheckTimeout()
})
</script> 

<style scoped>

.custom-select-label {
  font-size: 1rem;
  font-weight: 600;
  color: #00579d;
  margin-bottom: 0.25rem;
}

/* Cada input dentro de uma div com borda, igual ao select da imagem. Borda vermelha em erro. */
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

.resumo-pagamento-card {
  background: #fafafa;
  border-radius: 1.2rem;
  border: 1px solid #ececec;
  box-shadow: 0 2px 8px 0 rgba(80,80,160,0.04);
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;

  margin: 0 auto 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.resumo-label {
  font-size: 0.95rem;
  font-weight: 700;
  color: #00579d;
  margin-bottom: 0.2rem;
  letter-spacing: 0.01em;
}
.resumo-header {
  font-size: 1.15rem;
  font-weight: 700;
  color: #00579d;
  border-bottom: 1px solid #ececec;

}
.resumo-bloco {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.resumo-label-ida {
  font-size: 0.95rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.2rem;
  letter-spacing: 0.01em;
  border-bottom: 1px solid #ececec;
  padding-bottom: 0.3rem;
}
.resumo-linha {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1rem;
  color: #222;
}
.resumo-icone {
  width: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #A0AEC0;
}
.resumo-info {
  color: #535353;
  font-weight: 400;
  font-size: 0.9rem;
  word-break: break-word;
}
.resumo-seta {
  color: #b0b0b0;
  margin: 0 0.2rem;
  font-size: 1.2rem;
  font-weight: 900;
}
.resumo-linha-total {
  border-top: 1px solid #ececec;
  margin-top: 0.7rem;
  padding-top: 0.7rem;
}
.resumo-total-valor {
  color: #0070bb;
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.01em;
}
.resumo-pagamento-info {
  font-size: 0.95rem;
  color: #0070bb;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.resumo-pix {
  font-weight: 700;
}
.resumo-cartao {
  color: #888;
  font-size: 0.93rem;
}

</style>