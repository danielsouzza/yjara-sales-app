<template>
  <div class="tw-max-w-2xl tw-mx-auto tw-bg-white tw-shadow tw-rounded-xl tw-p-6">
    <h2 class="tw-text-2xl tw-font-bold tw-mb-6 tw-text-primary">Pagamento do Pedido</h2>
    <!-- Card de Resumo -->
    <div class="tw-bg-gray-50 tw-rounded-lg tw-shadow-sm tw-p-5 tw-mb-6">
      <div class="tw-font-bold tw-text-gray-800 tw-mb-2">Resumo da Compra</div>
      <div v-for="(agrup, idx) in order.passagens_agrupadas" :key="idx" class="tw-mb-4 tw-pb-4 tw-border-b tw-border-gray-200 last:tw-border-b-0">
        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2 tw-text-sm tw-text-gray-700">
          <div>
            <div><span class="tw-font-semibold">Origem:</span> {{ agrup.trecho?.municipio_origem?.nome }}/{{ agrup.trecho?.municipio_origem?.uf }}</div>
            <div><span class="tw-font-semibold">Destino:</span> {{ agrup.trecho?.municipio_destino?.nome }}/{{ agrup.trecho?.municipio_destino?.uf }}</div>
            <div><span class="tw-font-semibold">Data:</span> {{ agrup.trecho_viagem?.data_embarque }}</div>
          </div>
          <div>
            <div><span class="tw-font-semibold">Duração:</span> {{ agrup.trecho?.tempo_viagem }}h</div>
            <div><span class="tw-font-semibold">Embarcação:</span> {{ agrup.viagem?.embarcacao?.nome }}</div>
          </div>
        </div>
        <div class="tw-mt-2">
          <table class="tw-w-full tw-text-xs tw-mt-2">
            <thead>
              <tr class="tw-text-left tw-text-gray-600">
                <th class="tw-py-1">Passageiro</th>
                <th class="tw-py-1">Tipo</th>
                <th class="tw-py-1">Valor un.</th>
                <th class="tw-py-1">Taxa</th>
                <th class="tw-py-1">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pass in agrup.passagem_pedidos" :key="pass.id" class="tw-border-t tw-border-gray-100">
                <td class="tw-py-1">{{ (pass.passageiro?.nome || '').split(' ')[0] }}</td>
                <td class="tw-py-1">{{ pass.comodo?.tipo_comodidade?.nome }}</td>
                <td class="tw-py-1">{{ formatCurrency(pass.valor) }}</td>
                <td class="tw-py-1">{{ formatCurrency(pass.taxa_embarque) }}</td>
                <td class="tw-py-1">{{ formatCurrency((pass.valor || 0) + (pass.taxa_embarque || 0)) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="tw-mt-4 tw-flex tw-flex-col md:tw-flex-row tw-gap-4 tw-items-center tw-justify-between">
        <div class="tw-font-semibold">Total de passagens: <span class="tw-font-bold">{{ order.passagens_agrupadas.reduce((acc,agrup) => acc + agrup.passagem_pedidos.length, 0) }}</span></div>
        <div class="tw-font-semibold">Total: <span class="tw-font-bold tw-text-primary">{{ formatCurrency(order.total) }}</span></div>
      </div>
      <div v-if="order.contato" class="tw-mt-4 tw-text-xs tw-text-gray-500">
        <div><span class="tw-font-semibold">Contato:</span> {{ order.contato.nome }} | {{ order.contato.email }} | {{ order.contato.telefone }}</div>
      </div>
    </div>
    <!-- Fim Card de Resumo -->

    <div v-if="currentStep === 1">
      <div class="tw-mb-4">
        <div>
        <F7CustomSelect
          v-model="paymentMethod"
          label="Forma de pagamento"
          placeholder="Selecione a forma de pagamento"
          :options="[{value:'pix',label:'Pix'},{value:'credit',label:'Cartão de Crédito'}]"
        />
      </div>
      </div>
      <div v-if="paymentMethod === 'pix'" class="tw-mb-4">
        <button @click="submitPix" :disabled="loading" class="tw-bg-green-500 tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-green-600 tw-transition">
          <span v-if="!loading">Gerar Pix</span>
          <span v-else>Gerando...</span>
        </button>
      </div>
      <div v-if="paymentMethod === 'credit'" class="tw-mb-4">
        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
          <input v-model="cardData.holder" placeholder="Nome no cartão" class="tw-mb-2 tw-w-full tw-p-2 tw-border tw-rounded" />
          <input v-model="cardData.card_number" placeholder="Número do cartão" maxlength="19" class="tw-mb-2 tw-w-full tw-p-2 tw-border tw-rounded" />
          <input v-model="cardData.expiration_date" placeholder="Validade (MM/AA)" maxlength="5" class="tw-mb-2 tw-w-full tw-p-2 tw-border tw-rounded" />
          <input v-model="cardData.security_code" placeholder="CVV" maxlength="4" class="tw-mb-2 tw-w-full tw-p-2 tw-border tw-rounded" />
        </div>
        <input v-model.number="cardData.installment_quantity" type="number" min="1" max="12" placeholder="Parcelas" class="tw-mb-2 tw-w-full tw-p-2 tw-border tw-rounded" />
        <button @click="submitCredit" :disabled="loading" class="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-blue-600 tw-transition">
          <span v-if="!loading">Pagar com Cartão</span>
          <span v-else>Processando...</span>
        </button>
      </div>
    </div>

    <div v-if="currentStep === 2">
      <div class="tw-flex tw-justify-center tw-flex-col tw-items-center">
        <div class="tw-mb-4 tw-text-center">
          <div class="tw-text-lg tw-font-semibold tw-text-gray-700">Tempo restante para pagamento:</div>
          <div class="tw-text-2xl tw-font-bold tw-text-primary">{{ formatTimeRemaining }}</div>
        </div>
        <div class="tw-relative">
          <VueQrcode :value="paymentPending.pix_copia_cola" :size="200" />
          <div v-if="loading" class="tw-absolute tw-inset-0 tw-bg-white tw-bg-opacity-75 tw-flex tw-items-center tw-justify-center">
            <div class="tw-animate-spin tw-rounded-full tw-h-8 tw-w-8 tw-border-b-2 tw-border-primary"></div>
          </div>
        </div>
        <div class="tw-mt-2 tw-text-xs tw-text-gray-600">Copie e pague no app do seu banco</div>
        <div class="tw-mt-2 tw-break-all tw-bg-gray-100 tw-p-2 tw-rounded tw-text-center tw-text-sm">{{ paymentPending.pix_copia_cola }}</div>
      </div>
    </div>

    <div v-if="currentStep === 3">
      <div class="tw-flex tw-justify-center tw-flex-col tw-items-center tw-text-center">
        <Icon icon="icon-park-outline:ticket" class="mr-2 tw-text-secondary !tw-text-[80px]" />
        <p class="tw-text-xl tw-text-secondary tw-font-bold my-2">Compra realizada com sucesso!</p>
        <p>Olá, {{ order.contato?.nome }}! <br> Sua passagem está confirmada e foi enviada para seu email e WhatsApp</p>
        <p><strong>Pedido {{ order.id }}</strong></p>
      </div>
    </div>

    <div v-if="error" class="tw-text-red-500 tw-mt-2">{{ error }}</div>
    <div v-if="success" class="tw-text-green-600 tw-mt-2">{{ success }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { formatCurrency } from '@/js/utils'
import F7CustomSelect from '../ui/F7CustomSelect.vue'
import VueQrcode from 'vue-qrcode'
import { PedidoService } from '@/js/services/PedidoService'
import { Icon } from '@iconify/vue'

const props = defineProps({
  order: Object
})

const emit = defineEmits(['update:step'])

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

const timeRemaining = ref(30 * 60)
let timer = null
let checkTimeout = null

const formatTimeRemaining = computed(() => {
  const minutes = Math.floor(timeRemaining.value / 60)
  const seconds = timeRemaining.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

function startTimer() {
  timer = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
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
  PedidoService.checkPaymentStatus(props.order.id).then(res => {
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
  }).catch(() => {
    error.value = 'Erro ao gerar Pix.'
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
    success.value = 'Pagamento aprovado!'
    loading.value = false
    currentStep.value = 3
    emit('update:step', 3)
  }).catch(() => {
    error.value = 'Erro ao processar pagamento.'
    loading.value = false
  })
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