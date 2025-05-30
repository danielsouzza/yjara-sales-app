<template>
  <div class="tw-bg-white tw-rounded-xl tw-p-6 tw-mb-6 tw-border tw-border-gray-100 ">
    <div class="tw-flex tw-items-center tw-justify-between tw-mb-4">
      <h3 class="tw-font-bold tw-text-lg tw-text-gray-800">Passageiro {{ index + 1 }}</h3>
      <div class="tw-flex tw-items-center tw-gap-2">
        <button
          v-if="form.qtd_comodos_filhos < form.comodos_filhos"
          @click="$emit('addComodoRelated')"
          type="button"
          class="tw-bg-green-500 hover:tw-bg-green-600 tw-text-white tw-px-3 tw-py-2 tw-rounded-lg tw-text-sm tw-flex tw-items-center tw-gap-2"
          title="Adicionar acompanhante"
        >
          <svg class="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </button>
        <button
          v-if="form.comodo_relacionado != null"
          @click="$emit('remover', index)"
          type="button"
          class="tw-bg-red-500 hover:tw-bg-red-600 tw-text-white tw-px-3 tw-py-2 tw-rounded-lg tw-text-sm tw-flex tw-items-center tw-gap-2"
          title="Remover passageiro"
        >
          <svg class="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <div class="tw-space-y-6">
      <!-- Nome completo -->
      <div>
        <label class="tw-block tw-text-xs tw-font-normal tw-text-[#374151] tw-mb-1">Nome completo</label>
        <div :class="['tw-border tw-rounded tw-bg-white tw-px-4 tw-py-3', form.errors.nome ? 'tw-border-red-500' : 'tw-border-[#bdbdbd]']">
          <input
            type="text"
            v-model="form.nome"
            placeholder="Digite o nome completo"
            class="tw-w-full tw-bg-transparent tw-border-none tw-outline-none tw-h-[28px] tw-placeholder:text-[#9ca3af] tw-text-base focus:tw-border-none focus:tw-outline-none focus:tw-ring-0"
            :class="{'tw-text-red-600': form.errors.nome}"
          />
        </div>
        <p v-if="form.errors.nome" class="tw-mt-1 tw-text-xs tw-text-red-600">{{ form.errors.nome }}</p>
      </div>

      <!-- Telefone -->
      <div>
        <label class="tw-block tw-text-xs tw-font-normal tw-text-[#374151] tw-mb-1">Telefone</label>
        <div :class="['tw-border tw-rounded tw-bg-white tw-px-4 tw-py-3', form.errors.telefone ? 'tw-border-red-500' : 'tw-border-[#bdbdbd]']">
          <input
            v-mask-doc="'(##) #####-####'"
            v-model="form.telefone"
            placeholder="(00) 00000-0000"
            class="tw-w-full tw-bg-transparent tw-border-none tw-outline-none tw-h-[28px] tw-placeholder:text-[#9ca3af] tw-text-base focus:tw-border-none focus:tw-outline-none focus:tw-ring-0"
            :class="{'tw-text-red-600': form.errors.telefone}"
          />
        </div>
        <p v-if="form.errors.telefone" class="tw-mt-1 tw-text-xs tw-text-red-600">{{ form.errors.telefone }}</p>
      </div>

      <!-- Tipo de Documento -->
      <div>
        <F7CustomSelect
          v-model="form.tipo_doc"
          label="Tipo de Documento"
          placeholder="Selecione o tipo de documento"
          :options="tiposDoc.map(doc => ({ value: doc.id, label: doc.nome }))"
          :error="!!form.errors.tipo_doc"
          :error-message="form.errors.tipo_doc"
        />
      </div>

      <!-- Número do Documento -->
      <div v-if="form.tipo_doc">
        <label class="tw-block tw-text-xs tw-font-normal tw-text-[#374151] tw-mb-1">Nº do documento</label>
        <div :class="['tw-border tw-rounded tw-bg-white tw-px-4 tw-py-3', form.errors.document ? 'tw-border-red-500' : 'tw-border-[#bdbdbd]']">
          <input
            type="text"
            :key="form.tipo_doc"
            v-model="form.document"
            v-mask-doc="form.tipo_doc ? tiposDoc[form.tipo_doc-1]?.mask : '###########'"
            placeholder="Digite o número do documento"
            class="tw-w-full tw-bg-transparent tw-border-none tw-outline-none tw-h-[28px] tw-placeholder:text-[#9ca3af] tw-text-base focus:tw-border-none focus:tw-outline-none focus:tw-ring-0"
            :class="{'tw-text-red-600': form.errors.document}"
          />
        </div>
        <p v-if="form.errors.document" class="tw-mt-1 tw-text-xs tw-text-red-600">{{ form.errors.document }}</p>
      </div>

      <!-- Data de Nascimento -->
      <div>
        <label class="tw-block tw-text-xs tw-font-normal tw-text-[#374151] tw-mb-1">Data de Nascimento</label>
        <div :class="['tw-border tw-rounded tw-bg-white tw-px-4 tw-py-3', form.errors.nascimento ? 'tw-border-red-500' : 'tw-border-[#bdbdbd]']">
          <input
            type="date"
            v-model="form.nascimento"
            :max="new Date().toISOString().split('T')[0]"
            class="tw-w-full tw-bg-transparent tw-border-none tw-outline-none tw-h-[28px] tw-placeholder:text-[#9ca3af] tw-text-base focus:tw-border-none focus:tw-outline-none focus:tw-ring-0"
            :class="{'tw-text-red-600': form.errors.nascimento}"
          />
        </div>
        <p v-if="form.errors.nascimento" class="tw-mt-1 tw-text-xs tw-text-red-600">{{ form.errors.nascimento }}</p>
      </div>
    </div>

    <!-- Checkbox para adicionar como contato -->
    <div class="tw-mt-6 tw-flex tw-items-center tw-gap-3">
      <div class="tw-relative tw-flex tw-items-center">
        <input
          :id="'isContact-' + index"
          type="checkbox"
          v-model="form.isContact"
          @change="(event) => {
            if(event.target.checked) {
              emit('addToContact', index)
            } else {
              emit('removeFromContact', index)
            }
          }"
          class="tw-w-5 tw-h-5 tw-text-blue-600 tw-bg-gray-100 tw-border-[#bdbdbd] tw-rounded focus:tw-ring-blue-500 focus:outline-none focus:ring-2"
        />
      </div>
      <label :for="'isContact-' + index" class="tw-text-sm tw-text-gray-700 tw-cursor-pointer">
        Adicionar como contato
      </label>
    </div>
  </div>
</template>

<script setup>
import F7CustomSelect from '../ui/F7CustomSelect.vue'

const props = defineProps({
  form: Object,
  index: Number,
  type: String
});

const emit = defineEmits(['addToContact', 'removeFromContact', 'remover', 'addComodoRelated']);
const tiposDoc = [
  { id: 1, nome: 'RG', tamanho: 15, mask: '###############' },
  { id: 2, nome: 'Titulo de Eleitor', tamanho: 12, mask: '#### #### ####' },
  { id: 3, nome: 'Passaporte', tamanho: 20, mask: '#################' },
  { id: 4, nome: 'CNH', tamanho: 11, mask: '###########' },
  { id: 5, nome: 'CPF', tamanho: 0, mask: '###.###.###-##' }
];
</script>

<style scoped>
/* Cada input dentro de uma div com borda, igual ao select da imagem. Borda vermelha em erro. */
</style>